import { Server } from 'ssh2';
import crypto from 'crypto';
import { getTerminalPortfolio } from './src/terminalTemplate.js';
import chalk from 'chalk';

// Generate a temporary host key for the server
// In a real production setup, you should load this from a persisted file
const hostKey = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
}).privateKey;

const PORT = process.env.SSH_PORT ? parseInt(process.env.SSH_PORT) : 2222;

const server = new Server({ hostKeys: [hostKey] }, (client) => {
  console.log('Client connected!');

  client.on('authentication', (ctx) => {
    // For a portfolio, we allow anyone to connect with any username (or even no password)
    // You can customize this to check for specific passwords if needed
    ctx.accept();
  }).on('ready', () => {
    console.log('Client authenticated!');

    client.on('session', (accept, reject) => {
      const session = accept();

      session.once('pty', (accept, reject, info) => {
        // We accept pty requests to allow interactive behavior
        accept && accept();
      });

      session.once('shell', (accept, reject) => {
        const stream = accept();
        const content = getTerminalPortfolio();
        
        // Send the beautiful ANSI portfolio
        stream.write(content.replace(/\n/g, '\r\n'));
        
        // Handle input to allow "exit"
        stream.on('data', (data: Buffer) => {
          const input = data.toString().trim().toLowerCase();
          if (input === 'exit' || input === 'q') {
            stream.write('\r\nGoodbye!\r\n');
            stream.exit(0);
            stream.end();
          }
        });
        
        stream.write('\r\n' + chalk.bold.green('harsh@portfolio:~$ '));
      });
    });
  }).on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SSH Portfolio Server running on port ${PORT}`);
  console.log(`To test locally: ssh localhost -p ${PORT}`);
});

export default server;

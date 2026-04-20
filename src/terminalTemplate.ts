import chalk from 'chalk';

export const getTerminalPortfolio = () => {
  const blue = chalk.hex('#38BDF8');
  const pink = chalk.hex('#FF3366');
  const yellow = chalk.hex('#FFD600');
  const cyan = chalk.hex('#00E5FF');

  return `
${blue('╔═════════════════════════════════════════════════════════════════════════╗')}
${blue('║')}                                                                         ${blue('║')}
${blue('║')}   ${pink('██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗')}                        ${blue('║')}
${blue('║')}   ${pink('██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║')}                        ${blue('║')}
${blue('║')}   ${pink('███████║███████║██████╔╝███████╗███████║')}                        ${blue('║')}
${blue('║')}   ${pink('██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║')}                        ${blue('║')}
${blue('║')}   ${pink('██║  ██║██║  ██║██║  ██║███████║██║  ██║')}                        ${blue('║')}
${blue('║')}   ${pink('╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝')}                        ${blue('║')}
${blue('║')}                                                                         ${blue('║')}
${blue('║')}   ${yellow('SRIVASTAVA')} | ${cyan('Software Engineer')}                                     ${blue('║')}
${blue('║')}                                                                         ${blue('║')}
${blue('╚═════════════════════════════════════════════════════════════════════════╝')}

${cyan('── ABOUT ───────────────────────────────────────────────────────────────────')}
Crafting digital experiences through elegant code and intentional design. 
Currently focused on exploring AI and scalable apps.

${cyan('── PROJECTS ────────────────────────────────────────────────────────────────')}
${yellow('• SAP Labs')}
  Detailed documentation of interview prep and experience.
  ${chalk.dim('Stack: SAP, System Design')}

${yellow('• Project Sanjeevani')}
  Real-time healthcare response system.
  ${chalk.dim('Stack: React, Firebase')}

${yellow('• Sentiment Engine')}
  AI-powered NLP pipeline for real-time social sentiment.
  ${chalk.dim('Stack: Python, ML, React')}

${cyan('── CONNECT ─────────────────────────────────────────────────────────────────')}
${blue('• GitHub:   ')} https://github.com/harshsri2208
${blue('• LinkedIn: ')} https://linkedin.com/in/harshsri2208
${blue('• Email:    ')} harshsri2208@gmail.com

${chalk.dim('Type "exit" or Press Ctrl+C to close.')}
`;
};

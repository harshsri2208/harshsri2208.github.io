const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace neo-brutalist classes with professional ones
code = code.replace(/cartoon-card/g, 'pro-card');
code = code.replace(/cartoon-button/g, 'pro-button');
code = code.replace(/cartoon-border/g, 'border border-gray-200');
code = code.replace(/cartoon-shadow/g, 'shadow-sm');
code = code.replace(/bg-accent-yellow/g, 'bg-gray-100');
code = code.replace(/bg-accent-blue/g, 'bg-blue-50');
code = code.replace(/bg-accent-green/g, 'bg-emerald-50');
code = code.replace(/text-black/g, 'text-gray-900');
code = code.replace(/text-ink-dim/g, 'text-gray-600');
code = code.replace(/text-ink/g, 'text-gray-900');
code = code.replace(/bg-bg/g, 'bg-gray-50');
code = code.replace(/bg-surface/g, 'bg-white');

// Remove rotation classes
code = code.replace(/transform (-)?rotate-\d+/g, '');

// Update MindBlowingBadge component to be a professional Avatar component
const avatarComponent = `
const Avatar = () => (
  <div className="relative group w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
    <img 
      src="https://api.dicebear.com/7.x/notionists/svg?seed=Harsh&backgroundColor=e2e8f0" 
      alt="Harsh Srivastava" 
      className="w-full h-full object-cover" 
    />
  </div>
);
`;

code = code.replace(/const MindBlowingBadge = \(\) => \{[\s\S]*?return \([\s\S]*?\}\);/m, avatarComponent);

// Replace the MindBlowingBadge references with Avatar
code = code.replace(/<MindBlowingBadge \/>/g, '<Avatar />');

fs.writeFileSync('src/App.tsx', code);

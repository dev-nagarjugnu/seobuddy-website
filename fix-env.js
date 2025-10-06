const fs = require('fs');

// Read the current .env file
const envContent = fs.readFileSync('.env', 'utf8');

// Replace the cluster setting
const fixedContent = envContent
  .replace(/NEXT_PUBLIC_PUSHER_APP_CLUSTER="ap2"/g, 'NEXT_PUBLIC_PUSHER_APP_CLUSTER="us1"')
  .replace(/NEXT_PUBLIC_PUSHER_APP_CLUSTER="us1".*NEXT_PUBLIC_PUSHER_APP_CLUSTER="us1"/g, 'NEXT_PUBLIC_PUSHER_APP_CLUSTER="us1"');

// Write the fixed content back
fs.writeFileSync('.env', fixedContent);

console.log('✅ .env file fixed with correct Pusher cluster (us1)'); 
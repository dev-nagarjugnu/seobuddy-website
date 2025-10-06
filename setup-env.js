const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('⚠️  No .env file found. Creating a template...');
  
  const envTemplate = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/seobuddy"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Pusher (Optional - for real-time notifications)
NEXT_PUBLIC_PUSHER_APP_KEY=""
NEXT_PUBLIC_PUSHER_APP_CLUSTER=""

# Tawk.to (Optional - for live chat)
NEXT_PUBLIC_TAWK_TO_WIDGET_ID=""
`;

  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env template created. Please update with your actual values.');
} else {
  console.log('✅ .env file already exists.');
}

// Check for required environment variables
const envContent = fs.readFileSync(envPath, 'utf8');
const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
];

const missingVars = requiredVars.filter(varName => {
  const regex = new RegExp(`^${varName}=`, 'm');
  return !regex.test(envContent);
});

if (missingVars.length > 0) {
  console.log('⚠️  Missing required environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\nPlease add these to your .env file.');
} else {
  console.log('✅ All required environment variables are present.');
}

console.log('\n📋 Next steps:');
console.log('1. Update your .env file with actual database credentials');
console.log('2. Run: npx prisma db push (to sync database schema)');
console.log('3. Run: npx prisma db seed (to create admin users)');
console.log('4. Start your development server: npm run dev');

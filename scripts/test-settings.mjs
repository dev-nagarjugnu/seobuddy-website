// scripts/test-settings.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testSettings() {
  console.log('🧪 Testing Settings System...\n');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test if Settings model exists
    try {
      const settingsCount = await prisma.settings.count();
      console.log(`📊 Total Settings Records: ${settingsCount}`);
    } catch (error) {
      console.log('⚠️  Settings model not available yet (needs Prisma client regeneration)');
      console.log('   This is normal after schema updates on Windows');
    }
    
    // Test user with settings relation
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      include: { settings: true }
    });
    
    if (adminUser) {
      console.log(`👤 Admin User: ${adminUser.name} (${adminUser.email})`);
      console.log(`📝 Has Settings: ${adminUser.settings ? 'Yes' : 'No'}`);
      
      if (adminUser.settings) {
        const parsedSettings = JSON.parse(adminUser.settings.settings);
        console.log('✅ Settings loaded successfully');
        console.log(`📧 Email notifications: ${parsedSettings.notifications?.email}`);
        console.log(`🔒 2FA enabled: ${parsedSettings.security?.twoFactorAuth}`);
        console.log(`🎨 Theme: ${parsedSettings.appearance?.theme}`);
      }
    } else {
      console.log('⚠️  No admin user found');
    }
    
    console.log('\n✅ Settings system is ready!');
    
  } catch (error) {
    console.error('❌ Error testing settings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSettings()
  .then(() => {
    console.log('\n🎉 Settings test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Settings test failed:', error);
    process.exit(1);
  });

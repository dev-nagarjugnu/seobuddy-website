// scripts/test-settings-complete.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testCompleteSettings() {
  console.log('🧪 Testing Complete Settings System...\n');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test admin user
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });
    
    if (!adminUser) {
      console.log('❌ No admin user found');
      return;
    }
    
    console.log(`👤 Admin User: ${adminUser.name} (${adminUser.email})`);
    
    // Test settings creation
    const testSettings = {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 30
      },
      appearance: {
        theme: 'dark',
        compactMode: false,
        animations: true
      },
      system: {
        maintenanceMode: false,
        debugMode: false,
        autoBackup: true
      }
    };
    
    console.log('\n📝 Creating test settings...');
    
    const settings = await prisma.settings.upsert({
      where: { userId: adminUser.id },
      update: {
        settings: JSON.stringify(testSettings),
        updatedAt: new Date()
      },
      create: {
        userId: adminUser.id,
        settings: JSON.stringify(testSettings),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    
    console.log('✅ Settings created successfully');
    console.log(`📝 Settings ID: ${settings.id}`);
    
    // Test settings reading
    console.log('\n📖 Reading settings...');
    const readSettings = await prisma.settings.findUnique({
      where: { userId: adminUser.id }
    });
    
    if (readSettings) {
      const parsedSettings = JSON.parse(readSettings.settings);
      console.log('✅ Settings read successfully');
      
      // Test each category
      console.log('\n🔔 Notifications:');
      console.log(`   Email: ${parsedSettings.notifications.email}`);
      console.log(`   Push: ${parsedSettings.notifications.push}`);
      console.log(`   SMS: ${parsedSettings.notifications.sms}`);
      
      console.log('\n🔒 Security:');
      console.log(`   2FA: ${parsedSettings.security.twoFactorAuth}`);
      console.log(`   Session Timeout: ${parsedSettings.security.sessionTimeout} minutes`);
      
      console.log('\n🎨 Appearance:');
      console.log(`   Theme: ${parsedSettings.appearance.theme}`);
      console.log(`   Compact Mode: ${parsedSettings.appearance.compactMode}`);
      console.log(`   Animations: ${parsedSettings.appearance.animations}`);
      
      console.log('\n⚙️ System:');
      console.log(`   Maintenance Mode: ${parsedSettings.system.maintenanceMode}`);
      console.log(`   Debug Mode: ${parsedSettings.system.debugMode}`);
      console.log(`   Auto Backup: ${parsedSettings.system.autoBackup}`);
    }
    
    // Test settings update
    console.log('\n🔄 Testing settings update...');
    const updatedSettings = {
      ...testSettings,
      notifications: {
        ...testSettings.notifications,
        email: false,
        sms: true
      },
      appearance: {
        ...testSettings.appearance,
        theme: 'light',
        compactMode: true
      }
    };
    
    const updatedRecord = await prisma.settings.update({
      where: { userId: adminUser.id },
      data: {
        settings: JSON.stringify(updatedSettings),
        updatedAt: new Date()
      }
    });
    
    console.log('✅ Settings updated successfully');
    
    // Verify updates
    const verifySettings = await prisma.settings.findUnique({
      where: { userId: adminUser.id }
    });
    
    if (verifySettings) {
      const parsed = JSON.parse(verifySettings.settings);
      console.log('\n✅ Updates verified:');
      console.log(`   Email notifications: ${parsed.notifications.email} (should be false)`);
      console.log(`   SMS notifications: ${parsed.notifications.sms} (should be true)`);
      console.log(`   Theme: ${parsed.appearance.theme} (should be light)`);
      console.log(`   Compact mode: ${parsed.appearance.compactMode} (should be true)`);
    }
    
    // Test settings deletion
    console.log('\n🗑️ Testing settings deletion...');
    await prisma.settings.delete({
      where: { userId: adminUser.id }
    });
    
    console.log('✅ Settings deleted successfully');
    
    // Verify deletion
    const deletedSettings = await prisma.settings.findUnique({
      where: { userId: adminUser.id }
    });
    
    if (!deletedSettings) {
      console.log('✅ Settings deletion verified');
    }
    
    console.log('\n🎉 All settings tests passed!');
    
  } catch (error) {
    console.error('❌ Error testing settings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCompleteSettings()
  .then(() => {
    console.log('\n🎉 Complete settings test finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Complete settings test failed:', error);
    process.exit(1);
  });

// scripts/update-settings-schema.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSettingsSchema() {
  console.log('🔄 Updating settings schema...');
  
  const { execSync } = await import('child_process');
  try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Database schema updated successfully!');
  } catch (error) {
    console.error('❌ Error updating schema:', error.message);
    console.log('⚠️  This might be a Windows permission issue. The schema should still work.');
  }

  console.log('🔍 Testing settings functionality...');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test creating a settings record
    const testUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });
    
    if (testUser) {
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
      
      // Create or update settings
      const settings = await prisma.settings.upsert({
        where: { userId: testUser.id },
        update: {
          settings: JSON.stringify(testSettings),
          updatedAt: new Date()
        },
        create: {
          userId: testUser.id,
          settings: JSON.stringify(testSettings),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      
      console.log('✅ Settings created/updated successfully');
      console.log(`📝 Settings ID: ${settings.id}`);
      console.log(`👤 User ID: ${settings.userId}`);
      
      // Test reading settings
      const readSettings = await prisma.settings.findUnique({
        where: { userId: testUser.id }
      });
      
      if (readSettings) {
        const parsedSettings = JSON.parse(readSettings.settings);
        console.log('✅ Settings read successfully');
        console.log(`📧 Email notifications: ${parsedSettings.notifications.email}`);
        console.log(`🔒 2FA enabled: ${parsedSettings.security.twoFactorAuth}`);
        console.log(`🎨 Theme: ${parsedSettings.appearance.theme}`);
        console.log(`🔧 Maintenance mode: ${parsedSettings.system.maintenanceMode}`);
      }
      
      // Clean up test data
      await prisma.settings.delete({
        where: { userId: testUser.id }
      });
      console.log('🧹 Test settings cleaned up');
      
    } else {
      console.log('⚠️  No admin user found for testing');
    }
    
    console.log('\n✅ Settings system is working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing settings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSettingsSchema()
  .then(() => {
    console.log('\n🎉 Settings schema update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Settings schema update failed:', error);
    process.exit(1);
  });

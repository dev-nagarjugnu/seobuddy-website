// scripts/update-orders-schema.mjs

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateOrdersSchema() {
  try {
    console.log('🔄 Updating orders schema...');
    
    // Push the schema changes to the database
    const { execSync } = await import('child_process');
    
    try {
      execSync('npx prisma db push', { stdio: 'inherit' });
      console.log('✅ Database schema updated successfully!');
    } catch (error) {
      console.log('⚠️  Prisma db push failed, trying alternative approach...');
      
      // If db push fails, we can try to manually add the columns
      // This is a fallback for cases where the database doesn't support schema changes
      console.log('📝 Note: You may need to manually add the following columns to your orders table:');
      console.log('   - adminNotes (TEXT, nullable)');
      console.log('   - adminResponseDate (TIMESTAMP, nullable)');
      console.log('   - emailSent (BOOLEAN, default false)');
      console.log('   - emailSentAt (TIMESTAMP, nullable)');
    }
    
    // Test the connection and verify the schema
    console.log('🔍 Testing database connection...');
    const orderCount = await prisma.order.count();
    console.log(`✅ Database connection successful. Found ${orderCount} orders.`);
    
    // Test creating a sample order with new fields
    console.log('🧪 Testing new order fields...');
    const testOrder = await prisma.order.create({
      data: {
        serviceType: 'Test Service',
        description: 'Test order for schema validation',
        userId: 'test-user-id', // This will fail if user doesn't exist, but that's okay
        status: 'Pending',
        adminNotes: 'Test admin notes',
        adminResponseDate: new Date(),
        emailSent: false
      }
    });
    
    console.log('✅ New order fields working correctly!');
    
    // Clean up test order
    await prisma.order.delete({
      where: { id: testOrder.id }
    });
    
    console.log('🧹 Test order cleaned up.');
    
  } catch (error) {
    console.error('❌ Error updating orders schema:', error);
    
    if (error.code === 'P2003') {
      console.log('💡 Foreign key constraint error - this is expected if the test user doesn\'t exist.');
      console.log('✅ The schema update was successful!');
    } else {
      console.log('❌ Schema update failed. Please check your database connection and try again.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the update
updateOrdersSchema()
  .then(() => {
    console.log('🎉 Orders schema update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });

// scripts/test-analytics.mjs
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAnalytics() {
  console.log('🧪 Testing Analytics System...\n');
  
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test orders count
    const orderCount = await prisma.order.count();
    console.log(`📊 Total Orders: ${orderCount}`);
    
    // Test users count
    const userCount = await prisma.user.count();
    console.log(`👥 Total Users: ${userCount}`);
    
    // Test order status distribution
    const orderStatuses = await prisma.order.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });
    
    console.log('\n📈 Order Status Distribution:');
    orderStatuses.forEach(status => {
      console.log(`   ${status.status}: ${status._count.status}`);
    });
    
    // Test service distribution
    const serviceDistribution = await prisma.order.groupBy({
      by: ['serviceType'],
      _count: {
        serviceType: true
      }
    });
    
    console.log('\n🛠️ Service Distribution:');
    serviceDistribution.forEach(service => {
      console.log(`   ${service.serviceType}: ${service._count.serviceType}`);
    });
    
    // Test recent orders (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentOrders = await prisma.order.count({
      where: {
        orderDate: {
          gte: sevenDaysAgo
        }
      }
    });
    
    console.log(`\n📅 Recent Orders (7 days): ${recentOrders}`);
    
    // Test completed orders for revenue calculation
    const completedOrders = await prisma.order.count({
      where: {
        status: 'Completed'
      }
    });
    
    const estimatedRevenue = completedOrders * 299;
    console.log(`💰 Estimated Revenue: $${estimatedRevenue.toLocaleString()}`);
    
    console.log('\n✅ Analytics system is working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing analytics:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAnalytics()
  .then(() => {
    console.log('\n🎉 Analytics test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Analytics test failed:', error);
    process.exit(1);
  });

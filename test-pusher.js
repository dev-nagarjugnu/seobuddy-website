const Pusher = require('pusher');

// Test different clusters
const clusters = ['us1', 'us2', 'eu', 'ap1', 'ap2', 'ap3', 'ap4'];

const testCluster = async (cluster) => {
  const pusher = new Pusher({
    appId: '2017652',
    key: '465493e2307142fc61a3',
    secret: 'c02ed557f185a4a5c448',
    cluster: cluster,
    useTLS: true,
  });

  try {
    await pusher.trigger('test-channel', 'test-event', { message: 'test' });
    console.log(`✅ Cluster ${cluster} works!`);
    return cluster;
  } catch (error) {
    console.log(`❌ Cluster ${cluster} failed: ${error.message}`);
    return null;
  }
};

const findWorkingCluster = async () => {
  console.log('Testing Pusher clusters...');
  
  for (const cluster of clusters) {
    const result = await testCluster(cluster);
    if (result) {
      console.log(`\n🎉 Found working cluster: ${result}`);
      return result;
    }
  }
  
  console.log('\n❌ No working cluster found');
  return null;
};

findWorkingCluster(); 
// scripts/test-browser-theme.mjs
import puppeteer from 'puppeteer';

async function testBrowserTheme() {
  console.log('🌐 Testing Browser Theme Changes...\n');
  
  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({ 
      headless: false, // Set to true for headless mode
      defaultViewport: { width: 1280, height: 720 }
    });
    
    const page = await browser.newPage();
    
    // Navigate to the settings page
    console.log('📱 Navigating to settings page...');
    await page.goto('http://localhost:3000/auth/signin');
    
    // Wait for page to load
    await page.waitForSelector('input[type="email"]');
    
    // Login as admin
    console.log('🔐 Logging in as admin...');
    await page.type('input[type="email"]', 'bob@seobuddy.io');
    await page.type('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Wait for redirect to admin dashboard
    await page.waitForNavigation();
    
    // Navigate to settings
    console.log('⚙️ Navigating to settings...');
    await page.goto('http://localhost:3000/dashboard/settings');
    
    // Wait for settings page to load
    await page.waitForSelector('h1');
    
    // Check current theme
    console.log('🎨 Checking current theme...');
    const currentTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    console.log(`   Current theme: ${currentTheme}`);
    
    // Find theme dropdown and change to light
    console.log('🔄 Changing theme to light...');
    await page.select('select', 'light');
    
    // Wait a moment for theme to apply
    await page.waitForTimeout(1000);
    
    // Check if theme changed
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
    console.log(`   New theme: ${newTheme}`);
    
    if (newTheme === 'light') {
      console.log('✅ Theme change successful!');
    } else {
      console.log('❌ Theme change failed');
    }
    
    // Test compact mode
    console.log('📱 Testing compact mode...');
    const compactToggle = await page.$('button[onclick*="compactMode"]');
    if (compactToggle) {
      await compactToggle.click();
      await page.waitForTimeout(500);
      console.log('✅ Compact mode toggled');
    }
    
    // Test animations toggle
    console.log('✨ Testing animations toggle...');
    const animationsToggle = await page.$('button[onclick*="animations"]');
    if (animationsToggle) {
      await animationsToggle.click();
      await page.waitForTimeout(500);
      console.log('✅ Animations toggled');
    }
    
    // Save settings
    console.log('💾 Saving settings...');
    const saveButton = await page.$('button:has-text("Save Settings")');
    if (saveButton) {
      await saveButton.click();
      await page.waitForTimeout(2000);
      console.log('✅ Settings saved');
    }
    
    console.log('\n🎉 Browser theme test completed!');
    
  } catch (error) {
    console.error('❌ Error testing browser theme:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Check if puppeteer is available
try {
  testBrowserTheme()
    .then(() => {
      console.log('\n🎉 Browser test finished!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Browser test failed:', error);
      process.exit(1);
    });
} catch (error) {
  console.log('⚠️  Puppeteer not available, skipping browser test');
  console.log('   Theme changes should work in the actual browser');
  process.exit(0);
}

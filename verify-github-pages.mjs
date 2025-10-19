#!/usr/bin/env node

console.log('🔍 Verifying GitHub Pages Setup\n');

// You'll need to replace this with your actual GitHub Pages URL
const githubPagesUrl = 'https://petemctee.github.io/startgg-oauth-callback';

console.log('🧪 Testing GitHub Pages URL...');
console.log(`   ${githubPagesUrl}`);
console.log('');

try {
    const response = await fetch(githubPagesUrl);
    
    if (response.ok) {
        console.log('✅ GitHub Pages site is working!');
        console.log('✅ OAuth callback handler is ready');
        console.log('');
        console.log('🎯 Next steps:');
        console.log('1. Update your start.gg OAuth app callback URL to:');
        console.log(`   ${githubPagesUrl}/auth/callback`);
        console.log('2. Run: node test-oauth-complete.mjs');
        console.log('3. Complete the OAuth flow');
    } else {
        console.log('❌ GitHub Pages site not ready yet');
        console.log(`   Status: ${response.status}`);
        console.log('');
        console.log('💡 Please wait a few minutes for GitHub Pages to deploy');
        console.log('   Or check that:');
        console.log('   - Repository is public');
        console.log('   - GitHub Pages is enabled');
        console.log('   - Files are uploaded to main branch');
    }
} catch (error) {
    console.log('❌ Error testing GitHub Pages:');
    console.log('   ', error.message);
    console.log('');
    console.log('💡 Make sure:');
    console.log('1. The repository exists and is public');
    console.log('2. GitHub Pages is enabled in repository settings');
    console.log('3. The files are uploaded to the main branch');
    console.log('4. You\'ve waited a few minutes for deployment');
}

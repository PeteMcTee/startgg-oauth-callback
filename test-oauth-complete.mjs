#!/usr/bin/env node

import { config } from 'dotenv';
config({ path: '.env' });

import { StartGGClient } from './src/clients/startgg.js';

console.log('🎮 Testing Complete OAuth Flow with GitHub Pages\n');

const client = new StartGGClient();

try {
    // Step 1: Generate OAuth URL
    console.log('1️⃣ Generating OAuth authorization URL...');
    const authUrl = await client.getAuthorizationUrl('test_github_pages');
    console.log('✅ OAuth URL generated successfully!');
    console.log('');
    console.log('🔗 Please open this URL in your browser:');
    console.log(`   ${authUrl}`);
    console.log('');
    console.log('📋 What will happen:');
    console.log('1. You\'ll be redirected to start.gg');
    console.log('2. You\'ll authorize the application');
    console.log('3. You\'ll be redirected to your GitHub Pages site');
    console.log('4. The authorization code will be displayed and auto-copied');
    console.log('5. Come back here and paste the code');
    console.log('');
    
    // Step 2: Get authorization code from user
    console.log('⏳ Waiting for you to complete the authorization...');
    console.log('   (Press Ctrl+C to cancel)');
    console.log('');
    
    // Simple prompt for the authorization code
    const readline = await import('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const code = await new Promise((resolve) => {
        rl.question('📝 Paste the authorization code here: ', (answer) => {
            resolve(answer.trim());
        });
    });
    
    rl.close();
    
    if (!code) {
        console.log('❌ No authorization code provided');
        process.exit(1);
    }
    
    console.log('');
    console.log('2️⃣ Exchanging authorization code for access token...');
    
    // Step 3: Exchange code for token
    const tokenData = await client.exchangeCodeForToken(code);
    console.log('✅ Token exchange successful!');
    console.log('');
    console.log('🎉 OAuth flow completed successfully!');
    console.log('');
    console.log('📊 Token Information:');
    console.log(`   Access Token: ${tokenData.access_token.substring(0, 20)}...`);
    console.log(`   Token Type: ${tokenData.token_type}`);
    console.log(`   Expires In: ${tokenData.expires_in} seconds`);
    console.log('');
    console.log('🚀 Your MCP server is now authenticated with start.gg!');
    
} catch (error) {
    console.log('❌ OAuth flow failed:');
    console.log('   ', error.message);
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('1. Make sure your GitHub Pages site is working');
    console.log('2. Check that the callback URL is correct in your start.gg app');
    console.log('3. Verify the authorization code is valid and not expired');
}
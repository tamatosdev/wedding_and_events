/**
 * Script to manually test the escalation system
 * Usage: node scripts/test-escalation.js
 */

async function testEscalationCheck() {
  try {
    const url = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const cronSecret = process.env.CRON_SECRET || ''
    
    const endpoint = `${url}/api/cron/escalation-check`
    
    console.log('🔄 Testing escalation check endpoint...')
    console.log(`Endpoint: ${endpoint}`)
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: cronSecret ? {
        'Authorization': `Bearer ${cronSecret}`
      } : {}
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Escalation check completed successfully!')
      console.log('Response:', JSON.stringify(data, null, 2))
    } else {
      const error = await response.text()
      console.error('❌ Error:', response.status, error)
    }
  } catch (error) {
    console.error('❌ Failed to test escalation:', error.message)
    console.log('\n💡 Make sure the dev server is running: npm run dev')
  }
}

// Test submitting a contact query
async function testContactQuery() {
  try {
    const url = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    
    console.log('\n📝 Testing contact query submission...')
    
    const response = await fetch(`${url}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+923001234567',
        subject: 'Test Query',
        message: 'This is a test query to verify the escalation system works correctly.'
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Contact query submitted successfully!')
      console.log('Query ID:', data.queryId)
      console.log('Message:', data.message)
    } else {
      const error = await response.json()
      console.error('❌ Error:', response.status, error)
    }
  } catch (error) {
    console.error('❌ Failed to submit contact query:', error.message)
    console.log('\n💡 Make sure the dev server is running: npm run dev')
  }
}

// Run tests
(async () => {
  console.log('🚀 Escalation System Test Script\n')
  console.log('='.repeat(50))
  
  await testContactQuery()
  await new Promise(resolve => setTimeout(resolve, 1000))
  await testEscalationCheck()
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ Test completed!')
  console.log('\n📋 Next steps:')
  console.log('1. Check /admin/queries to see the submitted query')
  console.log('2. Wait 30 minutes (or manually trigger escalation)')
  console.log('3. Verify emails and WhatsApp messages were sent')
  console.log('4. Mark query as "responded" in admin panel to stop escalation')
})()


/**
 * WhatsApp integration for sending notifications
 * Supports multiple WhatsApp API providers (Twilio, WhatsApp Business API, etc.)
 */

interface WhatsAppMessage {
  to: string
  message: string
}

export async function sendWhatsAppMessage({ to, message }: WhatsAppMessage): Promise<boolean> {
  try {
    // Check which WhatsApp provider is configured
    const provider = process.env.WHATSAPP_PROVIDER || 'twilio'

    switch (provider) {
      case 'twilio':
        return await sendViaTwilio(to, message)
      case 'whatsapp-business':
        return await sendViaWhatsAppBusiness(to, message)
      default:
        console.warn(`Unknown WhatsApp provider: ${provider}`)
        return false
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    return false
  }
}

async function sendViaTwilio(to: string, message: string): Promise<boolean> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER // Format: whatsapp:+14155238886

    if (!accountSid || !authToken || !fromNumber) {
      console.warn('Twilio credentials not configured')
      return false
    }

    // Format phone number (ensure it starts with country code)
    const formattedTo = to.startsWith('+') ? `whatsapp:${to}` : `whatsapp:+${to.replace(/\D/g, '')}`

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          From: fromNumber,
          To: formattedTo,
          Body: message,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Twilio API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending WhatsApp via Twilio:', error)
    return false
  }
}

async function sendViaWhatsAppBusiness(to: string, message: string): Promise<boolean> {
  try {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

    if (!accessToken || !phoneNumberId) {
      console.warn('WhatsApp Business API credentials not configured')
      return false
    }

    // Format phone number (remove all non-digits except +)
    const formattedTo = to.replace(/\D/g, '').replace(/^/, '+')

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedTo,
          type: 'text',
          text: { body: message },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('WhatsApp Business API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending WhatsApp via Business API:', error)
    return false
  }
}


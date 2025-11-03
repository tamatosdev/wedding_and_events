import { prisma } from './prisma'
import { sendEmail } from './email'
import { sendWhatsAppMessage } from './whatsapp'

const ESCALATION_TIMEOUT_MINUTES = 30

type EscalationLevel = 'CUSTOMER_SUPPORT' | 'MANAGER' | 'CEO'
type QueryStatus = 'PENDING' | 'RESPONDED' | 'ESCALATED_LEVEL2' | 'ESCALATED_LEVEL3' | 'RESOLVED'

interface EscalationRecipients {
  customerSupport: {
    email: string
    whatsapp: string
  }
  manager: {
    email: string
    whatsapp: string
  }
  ceo: {
    email: string
    whatsapp: string
  }
}

function getEscalationRecipients(): EscalationRecipients {
  return {
    customerSupport: {
      email: process.env.CUSTOMER_SUPPORT_EMAIL || process.env.ADMIN_EMAIL || 'support@shadiportal.com',
      whatsapp: process.env.CUSTOMER_SUPPORT_WHATSAPP || '+923001234567',
    },
    manager: {
      email: process.env.MANAGER_EMAIL || 'manager@shadiportal.com',
      whatsapp: process.env.MANAGER_WHATSAPP || '+923001234568',
    },
    ceo: {
      email: process.env.CEO_EMAIL || 'ceo@shadiportal.com',
      whatsapp: process.env.CEO_WHATSAPP || '+923001234569',
    },
  }
}

function getEmailTemplate(query: any, level: EscalationLevel) {
  const levelNames = {
    CUSTOMER_SUPPORT: 'Customer Support',
    MANAGER: 'Manager',
    CEO: 'CEO',
  }

  const subject = level === 'CUSTOMER_SUPPORT'
    ? `🚨 New Contact Query: ${query.subject || 'General Inquiry'}`
    : `🚨 ESCALATED Query (Level ${level === 'MANAGER' ? '2' : '3'}): ${query.subject || 'General Inquiry'}`

  const urgencyNote = level === 'CEO'
    ? '<div style="background-color: #ff0000; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;"><strong>⚠️ URGENT: This query has been escalated to CEO level!</strong></div>'
    : level === 'MANAGER'
    ? '<div style="background-color: #ff9800; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;"><strong>⚠️ This query has been escalated to Manager level.</strong></div>'
    : ''

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d13f43;">${subject}</h2>
      ${urgencyNote}
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Query ID:</strong> ${query.id}</p>
        <p><strong>Name:</strong> ${query.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${query.email}">${query.email}</a></p>
        ${query.phone ? `<p><strong>Phone:</strong> ${query.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${query.subject || 'General Inquiry'}</p>
        <p><strong>Received:</strong> ${new Date(query.createdAt).toLocaleString()}</p>
        <p><strong>Time Since Submission:</strong> ${getTimeSince(query.createdAt)}</p>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #333;">Message:</h3>
        <p style="white-space: pre-wrap; background-color: #fff; padding: 15px; border-radius: 4px;">${query.message}</p>
      </div>
      <div style="margin: 20px 0; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
        <p><strong>Action Required:</strong></p>
        <p>Please respond to this query within 30 minutes to prevent further escalation.</p>
        <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/queries/${query.id}" style="background-color: #d13f43; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">View & Respond</a></p>
      </div>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">This is an automated notification from Shadi Portal.</p>
    </div>
  `.trim()

  const text = `
${subject}

Query ID: ${query.id}
Name: ${query.name}
Email: ${query.email}
${query.phone ? `Phone: ${query.phone}` : ''}
Subject: ${query.subject || 'General Inquiry'}
Received: ${new Date(query.createdAt).toLocaleString()}
Time Since Submission: ${getTimeSince(query.createdAt)}

Message:
${query.message}

Action Required: Please respond to this query within 30 minutes to prevent further escalation.
View Query: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/queries/${query.id}

---
This is an automated notification from Shadi Portal.
  `.trim()

  return { subject, html, text }
}

function getWhatsAppMessage(query: any, level: EscalationLevel): string {
  const levelEmoji = {
    CUSTOMER_SUPPORT: '📧',
    MANAGER: '⚠️',
    CEO: '🚨',
  }

  const levelName = {
    CUSTOMER_SUPPORT: 'Customer Support',
    MANAGER: 'Manager (Level 2)',
    CEO: 'CEO (Level 3)',
  }

  return `
${levelEmoji[level]} *New ${level === 'CUSTOMER_SUPPORT' ? '' : 'Escalated '}Contact Query*

*${levelName[level]}*

ID: ${query.id}
Name: ${query.name}
Email: ${query.email}
${query.phone ? `Phone: ${query.phone}` : ''}
Subject: ${query.subject || 'General Inquiry'}

${query.message.substring(0, 200)}${query.message.length > 200 ? '...' : ''}

Time: ${getTimeSince(query.createdAt)} ago

Please respond within 30 minutes to prevent escalation.

View: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/queries/${query.id}
  `.trim()
}

function getTimeSince(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''}`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`
  return `${diffDays} day${diffDays !== 1 ? 's' : ''}`
}

export async function sendInitialNotification(query: any): Promise<void> {
  const recipients = getEscalationRecipients()
  const { subject, html, text } = getEmailTemplate(query, 'CUSTOMER_SUPPORT')
  const whatsappMsg = getWhatsAppMessage(query, 'CUSTOMER_SUPPORT')

  // Send to customer support
  try {
    await sendEmail({
      to: recipients.customerSupport.email,
      subject,
      html,
      text,
    })
    console.log(`✅ Email sent to customer support for query ${query.id}`)
  } catch (error) {
    console.error(`❌ Failed to send email to customer support for query ${query.id}:`, error)
  }

  try {
    await sendWhatsAppMessage({
      to: recipients.customerSupport.whatsapp,
      message: whatsappMsg,
    })
    console.log(`✅ WhatsApp sent to customer support for query ${query.id}`)
  } catch (error) {
    console.error(`❌ Failed to send WhatsApp to customer support for query ${query.id}:`, error)
  }
}

export async function escalateToManager(query: any): Promise<void> {
  const recipients = getEscalationRecipients()
  const { subject, html, text } = getEmailTemplate(query, 'MANAGER')
  const whatsappMsg = getWhatsAppMessage(query, 'MANAGER')

  // Send to manager
  try {
    await sendEmail({
      to: recipients.manager.email,
      subject,
      html,
      text,
    })
    console.log(`✅ Escalation email sent to manager for query ${query.id}`)
  } catch (error) {
    console.error(`❌ Failed to send escalation email to manager for query ${query.id}:`, error)
  }

  try {
    await sendWhatsAppMessage({
      to: recipients.manager.whatsapp,
      message: whatsappMsg,
    })
    console.log(`✅ Escalation WhatsApp sent to manager for query ${query.id}`)
  } catch (error) {
    console.error(`❌ Failed to send escalation WhatsApp to manager for query ${query.id}:`, error)
  }

  // Update query
  await prisma.contactQuery.update({
    where: { id: query.id },
    data: {
      escalationLevel: 'MANAGER',
      status: 'ESCALATED_LEVEL2',
      escalatedToManagerAt: new Date(),
      lastEscalationCheck: new Date(),
    },
  })
}

export async function escalateToCEO(query: any): Promise<void> {
  const recipients = getEscalationRecipients()
  const { subject, html, text } = getEmailTemplate(query, 'CEO')
  const whatsappMsg = getWhatsAppMessage(query, 'CEO')

  // Send to CEO
  try {
    await sendEmail({
      to: recipients.ceo.email,
      subject,
      html,
      text,
    })
    console.log(`✅ Escalation email sent to CEO for query ${query.id}`)
  } catch (error) {
    console.error(`❌ Failed to send escalation email to CEO for query ${query.id}:`, error)
  }

  try {
    await sendWhatsAppMessage({
      to: recipients.ceo.whatsapp,
      message: whatsappMsg,
    })
    console.log(`✅ Escalation WhatsApp sent to CEO for query ${query.id}`)
  } catch (error) {
    console.error(`❌ Failed to send escalation WhatsApp to CEO for query ${query.id}:`, error)
  }

  // Update query
  await prisma.contactQuery.update({
    where: { id: query.id },
    data: {
      escalationLevel: 'CEO',
      status: 'ESCALATED_LEVEL3',
      escalatedToCEOAt: new Date(),
      lastEscalationCheck: new Date(),
    },
  })
}

export async function checkAndEscalateQueries(): Promise<void> {
  const now = new Date()
  const timeoutMs = ESCALATION_TIMEOUT_MINUTES * 60 * 1000

  try {
    // Find queries that need escalation checking
    const pendingQueries = await prisma.contactQuery.findMany({
      where: {
        status: {
          in: ['PENDING', 'ESCALATED_LEVEL2'],
        },
        OR: [
          {
            status: 'PENDING',
            escalationLevel: 'CUSTOMER_SUPPORT',
            customerSupportResponded: false,
          },
          {
            status: 'ESCALATED_LEVEL2',
            escalationLevel: 'MANAGER',
            managerResponded: false,
          },
        ],
      },
    })

    for (const query of pendingQueries) {
      const timeSinceLastCheck = now.getTime() - new Date(query.lastEscalationCheck).getTime()

      // Check if 30 minutes have passed since creation or last escalation
      let referenceTime: Date
      if (query.escalationLevel === 'CUSTOMER_SUPPORT') {
        referenceTime = query.createdAt
      } else if (query.escalationLevel === 'MANAGER') {
        referenceTime = query.escalatedToManagerAt || query.createdAt
      } else {
        continue
      }

      const timeSinceReference = now.getTime() - new Date(referenceTime).getTime()

      if (timeSinceReference >= timeoutMs) {
        // Check if response was marked manually
        if (query.escalationLevel === 'CUSTOMER_SUPPORT') {
          if (!query.customerSupportResponded) {
            console.log(`⏰ Escalating query ${query.id} to Manager (30 min timeout)`)
            await escalateToManager(query)
          } else {
            // Update last check even if responded
            await prisma.contactQuery.update({
              where: { id: query.id },
              data: { lastEscalationCheck: now },
            })
          }
        } else if (query.escalationLevel === 'MANAGER') {
          if (!query.managerResponded) {
            console.log(`⏰ Escalating query ${query.id} to CEO (30 min timeout)`)
            await escalateToCEO(query)
          } else {
            // Update last check even if responded
            await prisma.contactQuery.update({
              where: { id: query.id },
              data: { lastEscalationCheck: now },
            })
          }
        }
      } else {
        // Update last check time
        await (prisma as any).contactQuery.update({
          where: { id: query.id },
          data: { lastEscalationCheck: now },
        })
      }
    }
  } catch (error) {
    console.error('Error checking and escalating queries:', error)
  }
}


import nodemailer from 'nodemailer'
import { generateInquiryEmailTemplate, generateWelcomeEmailTemplate, generateAdminInquiryEmailTemplate, generatePartnerOnboardingEmailTemplate, generatePopupQueryEmailTemplate } from './email-templates'

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string
  subject: string
  text: string
  html: string
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const info = await transporter.sendMail({
    from: `"Wedding & Events" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  })

  return info
}

export async function sendInquiryEmail(inquiry: {
  name: string
  email: string
  message: string
  vendorName: string
  vendorEmail: string
}) {
  const html = generateInquiryEmailTemplate(inquiry)
  
  return await sendEmail({
    to: inquiry.vendorEmail,
    subject: `New Inquiry for ${inquiry.vendorName} - ${inquiry.name}`,
    text: `New inquiry from ${inquiry.name} for ${inquiry.vendorName}`,
    html,
  })
}

export async function sendWelcomeEmail(user: {
  name: string
  email: string
  role: string
}) {
  const html = generateWelcomeEmailTemplate(user)
  
  return await sendEmail({
    to: user.email,
    subject: 'Welcome to Wedding & Events Portal!',
    text: `Welcome ${user.name} to Wedding & Events Portal!`,
    html,
  })
}

export async function sendAdminInquiryNotification(inquiry: {
  name: string
  email: string
  message: string
  vendorName: string
  vendorEmail: string
  vendorPhone?: string
}) {
  const html = generateAdminInquiryEmailTemplate(inquiry)
  
  return await sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@shadiportal.com',
    subject: `New Customer Inquiry for ${inquiry.vendorName} - ${inquiry.name}`,
    text: `New inquiry from ${inquiry.name} for ${inquiry.vendorName}. Customer email: ${inquiry.email}`,
    html,
  })
}

export async function sendPartnerOnboardingNotification(submission: {
  businessType: string
  ownerName: string
  ownerEmail: string
  ownerMobile1: string
  businessName?: string
  city?: string
  id: string
}) {
  const html = generatePartnerOnboardingEmailTemplate(submission)
  
  return await sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@shadiportal.com',
    subject: `New Partner Application - ${submission.ownerName} (${submission.businessType})`,
    text: `New partner onboarding application from ${submission.ownerName}`,
    html,
  })
}

export async function sendPopupQueryNotification(query: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const html = generatePopupQueryEmailTemplate(query)
  
  return await sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@shadiportal.com',
    subject: `New Popup Query - ${query.name}`,
    text: `New query from welcome popup: ${query.name} - ${query.email}`,
    html,
  })
}

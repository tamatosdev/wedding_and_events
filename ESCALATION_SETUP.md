# Query Escalation System Setup

## Overview

The automated escalation system ensures that contact queries are responded to within 30 minutes. If a response is not marked manually, the system escalates queries through three levels:

1. **Customer Support** (Level 1) - Initial recipient
2. **Manager** (Level 2) - Escalated after 30 minutes if Customer Support hasn't responded
3. **CEO** (Level 3) - Escalated after 30 minutes if Manager hasn't responded

## Features

- ✅ Automatic email + WhatsApp notifications at each level
- ✅ 30-minute escalation timer
- ✅ Manual response tracking (mark as responded in admin panel)
- ✅ Background cron job checks every 5 minutes
- ✅ Admin interface to view and manage queries

## Environment Variables

Add these to your `.env.local` file:

```bash
# Customer Support (Level 1)
CUSTOMER_SUPPORT_EMAIL="support@shadiportal.com"
CUSTOMER_SUPPORT_WHATSAPP="+923001234567"

# Manager (Level 2)
MANAGER_EMAIL="manager@shadiportal.com"
MANAGER_WHATSAPP="+923001234568"

# CEO (Level 3)
CEO_EMAIL="ceo@shadiportal.com"
CEO_WHATSAPP="+923001234569"

# WhatsApp Provider (Twilio or whatsapp-business)
WHATSAPP_PROVIDER="twilio"

# Twilio Configuration (if using Twilio)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"

# OR WhatsApp Business API (if using WhatsApp Business)
WHATSAPP_ACCESS_TOKEN="your-whatsapp-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"

# Cron Security (optional but recommended)
CRON_SECRET="your-random-secret-key-for-cron-endpoint-security"
```

## Database Setup

After updating the schema, run:

```bash
npx prisma db push
npx prisma generate
```

## Cron Job Setup

### For Vercel Deployment

The `vercel.json` file is already configured. Vercel will automatically run the cron job every 5 minutes.

### For Other Platforms

Set up a cron job or scheduled task to call:
```
GET https://your-domain.com/api/cron/escalation-check
Authorization: Bearer YOUR_CRON_SECRET
```

Schedule: Every 5 minutes (`*/5 * * * *`)

### For Local Development

You can manually trigger the escalation check:
```bash
curl http://localhost:3000/api/cron/escalation-check
```

Or set up a local cron service like `node-cron`.

## Admin Interface

1. Go to `/admin/queries` (admin login required)
2. View all queries with their status and escalation level
3. Click on a query to view details
4. Mark as "Responded" when you've handled the query
5. Add internal notes for tracking

## How It Works

1. **Query Submission**: When a user submits a contact form:
   - Query is saved to database
   - Email + WhatsApp sent to Customer Support
   - Timer starts (30 minutes)

2. **Response Tracking**: 
   - Admin manually marks query as "Customer Support Responded"
   - This prevents escalation

3. **Escalation (if no response)**:
   - After 30 minutes: Escalates to Manager (Level 2)
   - Email + WhatsApp sent to Manager
   - Another 30-minute timer starts

4. **Final Escalation (if Manager doesn't respond)**:
   - After 30 more minutes: Escalates to CEO (Level 3)
   - Email + WhatsApp sent to CEO

5. **Cron Job**:
   - Runs every 5 minutes
   - Checks all pending queries
   - Escalates queries that have exceeded 30-minute timeout

## WhatsApp Integration

### Option 1: Twilio

1. Sign up at [Twilio](https://www.twilio.com)
2. Get your Account SID and Auth Token
3. Set up a WhatsApp sender number
4. Configure environment variables

### Option 2: WhatsApp Business API

1. Set up Meta Business Account
2. Create WhatsApp Business App
3. Get Access Token and Phone Number ID
4. Configure environment variables

## Testing

1. Submit a contact form
2. Check that email + WhatsApp are sent to Customer Support
3. Wait 30+ minutes (or manually test by calling the cron endpoint)
4. Verify escalation to Manager
5. Wait another 30+ minutes
6. Verify escalation to CEO

## Manual Escalation Check

To manually trigger escalation check:
```bash
curl -X GET "http://localhost:3000/api/cron/escalation-check" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```


# ✅ Escalation System Setup Complete

## What Has Been Done

### 1. ✅ Database Schema Updated
- Added `ContactQuery` model to Prisma schema
- Added `QueryStatus` and `EscalationLevel` enums
- Database schema pushed successfully
- Prisma client regenerated with new model

### 2. ✅ Environment Variables Added
The following variables have been added to `.env.local`:

```
# Query Escalation System - Customer Support (Level 1)
CUSTOMER_SUPPORT_EMAIL="support@shadiportal.com"
CUSTOMER_SUPPORT_WHATSAPP="+923001234567"

# Query Escalation System - Manager (Level 2)
MANAGER_EMAIL="manager@shadiportal.com"
MANAGER_WHATSAPP="+923001234568"

# Query Escalation System - CEO (Level 3)
CEO_EMAIL="ceo@shadiportal.com"
CEO_WHATSAPP="+923001234569"

# WhatsApp Provider Configuration
WHATSAPP_PROVIDER="twilio"

# Twilio Configuration
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"

# Cron Job Security
CRON_SECRET="<generated-guid>"
```

### 3. ✅ Code Files Created/Updated
- ✅ `lib/escalation.ts` - Escalation logic
- ✅ `lib/whatsapp.ts` - WhatsApp integration
- ✅ `app/api/contact/route.ts` - Updated to create queries
- ✅ `app/api/queries/route.ts` - Query management API
- ✅ `app/api/queries/[id]/route.ts` - Single query API
- ✅ `app/api/cron/escalation-check/route.ts` - Cron endpoint
- ✅ `app/admin/queries/page.tsx` - Admin interface
- ✅ `vercel.json` - Cron job configuration
- ✅ `components/ui/badge.tsx` - Badge component

### 4. ✅ Prisma Client Regenerated
The Prisma client has been successfully regenerated. If TypeScript still shows errors in your IDE:
- Restart your TypeScript server (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
- Restart your IDE
- The code will work at runtime even if IDE shows errors temporarily

## Next Steps to Complete Setup

### Step 1: Configure WhatsApp (Required for WhatsApp notifications)
Choose one option:

#### Option A: Twilio WhatsApp
1. Sign up at https://www.twilio.com
2. Get WhatsApp Sandbox or Business number
3. Update `.env.local`:
   ```
   WHATSAPP_PROVIDER="twilio"
   TWILIO_ACCOUNT_SID="your-actual-sid"
   TWILIO_AUTH_TOKEN="your-actual-token"
   TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"
   ```

#### Option B: WhatsApp Business API
1. Set up Meta Business Account
2. Create WhatsApp Business App
3. Update `.env.local`:
   ```
   WHATSAPP_PROVIDER="whatsapp-business"
   WHATSAPP_ACCESS_TOKEN="your-access-token"
   WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"
   ```

**Note:** If WhatsApp is not configured, email notifications will still work. WhatsApp notifications will fail gracefully.

### Step 2: Update Contact Information
Update the phone numbers and emails in `.env.local` with actual values:
```
CUSTOMER_SUPPORT_EMAIL="actual-support-email@yourdomain.com"
CUSTOMER_SUPPORT_WHATSAPP="+923001234567"  # Actual WhatsApp number
MANAGER_EMAIL="actual-manager-email@yourdomain.com"
MANAGER_WHATSAPP="+923001234568"  # Actual WhatsApp number
CEO_EMAIL="actual-ceo-email@yourdomain.com"
CEO_WHATSAPP="+923001234569"  # Actual WhatsApp number
```

### Step 3: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 4: Test the System

1. **Submit a test query:**
   - Go to http://localhost:3000/contact
   - Fill out and submit the contact form
   - Check your email (Customer Support should receive notification)

2. **Check admin panel:**
   - Go to http://localhost:3000/admin/queries
   - You should see the submitted query
   - Verify it shows "Pending" status

3. **Test escalation manually:**
   ```bash
   # In another terminal
   curl http://localhost:3000/api/cron/escalation-check
   ```
   Or wait 30+ minutes for automatic escalation

4. **Mark as responded:**
   - In admin panel, click on a query
   - Click "Mark Responded" button
   - This prevents escalation

## How the System Works

1. **Initial Submission:**
   - User submits contact form
   - Query saved to database
   - Email + WhatsApp sent to Customer Support
   - 30-minute timer starts

2. **Escalation Level 1 → 2 (30 minutes):**
   - If Customer Support doesn't mark as "responded"
   - System escalates to Manager
   - Email + WhatsApp sent to Manager
   - Another 30-minute timer starts

3. **Escalation Level 2 → 3 (30 minutes):**
   - If Manager doesn't mark as "responded"
   - System escalates to CEO
   - Email + WhatsApp sent to CEO

4. **Manual Response Tracking:**
   - Admin can mark queries as "responded" at any level
   - This stops escalation for that level
   - Notes can be added for internal tracking

## Cron Job Setup

### For Vercel (Automatic)
The `vercel.json` file is configured. Cron runs automatically every 5 minutes when deployed.

### For Other Platforms
Set up a cron job or scheduled task:
- **Endpoint:** `GET /api/cron/escalation-check`
- **Schedule:** Every 5 minutes (`*/5 * * * *`)
- **Auth:** Include `Authorization: Bearer <CRON_SECRET>` header

### For Local Development
You can manually trigger:
```bash
curl http://localhost:3000/api/cron/escalation-check
```

Or use the test script:
```bash
node scripts/test-escalation.js
```

## Troubleshooting

### TypeScript Errors in IDE
If you see TypeScript errors about `contactQuery` not existing:
1. Restart TypeScript server (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
2. Restart your IDE
3. The code will work at runtime - this is just IDE cache

### WhatsApp Not Working
- Check that `WHATSAPP_PROVIDER` is set correctly
- Verify Twilio/WhatsApp Business credentials
- Check console logs for error messages
- Email notifications will still work if WhatsApp fails

### Escalation Not Happening
- Verify cron job is running (check `/api/cron/escalation-check` logs)
- Check that queries are not marked as "responded"
- Verify 30 minutes have passed since query creation/escalation
- Check database - query should have correct `lastEscalationCheck` timestamp

### Email Not Sending
- Verify SMTP credentials in `.env.local`
- Check that `SMTP_USER` and `SMTP_PASS` are correct
- For Gmail, use an App Password (not regular password)

## Admin Interface

Access the query management interface at:
**http://localhost:3000/admin/queries**

Features:
- View all queries with status
- Filter by status (Pending, Responded, Escalated)
- Mark queries as responded
- Add internal notes
- View escalation timeline
- Mark queries as resolved

## Support

If you encounter issues:
1. Check console logs for error messages
2. Verify all environment variables are set
3. Ensure database is running (`npm run docker:up`)
4. Check that Prisma client is generated (`npx prisma generate`)

---

✅ **Setup is complete!** The system is ready to use once you configure WhatsApp credentials and restart the dev server.


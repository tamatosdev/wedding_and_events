# 📋 Vercel Environment Variables - Quick Reference

## 🚀 Quick Setup Order

Add these in Vercel Dashboard → Settings → Environment Variables

---

## ✅ CRITICAL (Add First - App Won't Work Without These)

### 1. DATABASE_URL
```
postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway
```
✅ Production, ✅ Preview, ✅ Development

### 2. NEXTAUTH_SECRET
```
qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms=
```
✅ Production, ✅ Preview, ✅ Development

### 3. NEXTAUTH_URL
```
https://your-app-name.vercel.app
```
✅ Production, ✅ Preview

**For Development:**
```
http://localhost:3000
```
✅ Development

---

## 📸 Image Uploads (Cloudinary)

### 4. CLOUDINARY_CLOUD_NAME
```
[Your Cloudinary cloud name]
```
✅ Production, ✅ Preview, ✅ Development

### 5. CLOUDINARY_API_KEY
```
[Your Cloudinary API key]
```
✅ Production, ✅ Preview, ✅ Development

### 6. CLOUDINARY_API_SECRET
```
[Your Cloudinary API secret]
```
✅ Production, ✅ Preview, ✅ Development

---

## 📧 Email (SMTP)

### 7. SMTP_HOST
```
smtp.gmail.com
```
✅ Production, ✅ Preview, ✅ Development

### 8. SMTP_PORT
```
587
```
✅ Production, ✅ Preview, ✅ Development

### 9. SMTP_USER
```
[Your email address]
```
✅ Production, ✅ Preview, ✅ Development

### 10. SMTP_PASS
```
[Your Gmail app password]
```
✅ Production, ✅ Preview, ✅ Development

**Get App Password:** https://myaccount.google.com/apppasswords

---

## 👤 Admin Contact

### 11. ADMIN_EMAIL
```
admin@shadiportal.com
```
✅ Production, ✅ Preview, ✅ Development

### 12. ADMIN_PHONE
```
+92-XXX-XXXXXXX
```
✅ Production, ✅ Preview, ✅ Development

### 13. ADMIN_NAME
```
Admin Portal
```
✅ Production, ✅ Preview, ✅ Development

---

## 📞 Query Escalation System

### 14. CUSTOMER_SUPPORT_EMAIL
```
support@shadiportal.com
```
✅ Production, ✅ Preview, ✅ Development

### 15. CUSTOMER_SUPPORT_WHATSAPP
```
+923001234567
```
✅ Production, ✅ Preview, ✅ Development

### 16. MANAGER_EMAIL
```
manager@shadiportal.com
```
✅ Production, ✅ Preview, ✅ Development

### 17. MANAGER_WHATSAPP
```
+923001234568
```
✅ Production, ✅ Preview, ✅ Development

### 18. CEO_EMAIL
```
ceo@shadiportal.com
```
✅ Production, ✅ Preview, ✅ Development

### 19. CEO_WHATSAPP
```
+923001234569
```
✅ Production, ✅ Preview, ✅ Development

---

## 💬 WhatsApp Configuration

### 20. NEXT_PUBLIC_WHATSAPP_NUMBER
```
923001234567
```
✅ Production, ✅ Preview, ✅ Development

**Format:** Country code + number (no + or spaces)

### 21. WHATSAPP_PROVIDER
```
twilio
```
✅ Production, ✅ Preview, ✅ Development

### 22. TWILIO_ACCOUNT_SID
```
[Your Twilio Account SID]
```
✅ Production, ✅ Preview, ✅ Development

### 23. TWILIO_AUTH_TOKEN
```
[Your Twilio Auth Token]
```
✅ Production, ✅ Preview, ✅ Development

### 24. TWILIO_WHATSAPP_NUMBER
```
whatsapp:+14155238886
```
✅ Production, ✅ Preview, ✅ Development

---

## 🔒 Security

### 25. CRON_SECRET
```
[Generate random 32-character string]
```
✅ Production, ✅ Preview, ✅ Development

**Generate:**
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

---

## 📝 Notes

- **Update NEXTAUTH_URL** after first deployment with your actual Vercel URL
- **Use Gmail App Password** for SMTP_PASS (not regular password)
- **Replace placeholder values** with your actual credentials
- **Select environments** carefully (Production, Preview, Development)

---

## ✅ Minimum Required

For app to work, you need at minimum:
1. DATABASE_URL
2. NEXTAUTH_SECRET
3. NEXTAUTH_URL

All others are optional but recommended for full functionality.


# 🔍 Debug Image Upload Issue

## ✅ Enhanced Logging Added

I've added comprehensive logging to help debug the upload issue:

### Server-Side Logging (`app/api/upload/route.ts`)
- ✅ Logs when request is received
- ✅ Logs session check status
- ✅ Logs BLOB_READ_WRITE_TOKEN check
- ✅ Logs file details (name, type, size)
- ✅ Logs upload success/failure
- ✅ Detailed error logging

### Client-Side Logging (`components/ui/image-upload.tsx`)
- ✅ Logs file selection
- ✅ Logs upload start
- ✅ Logs response status
- ✅ Logs success/failure with details
- ✅ Better error messages

---

## 🔍 How to Debug

### Step 1: Check Browser Console

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Try uploading an image**
4. **Look for logs:**
   - `Starting upload for file: ...`
   - `Sending request to /api/upload`
   - `Upload response status: ...`
   - Any error messages

### Step 2: Check Network Tab

1. **Go to Network tab** in DevTools
2. **Try uploading an image**
3. **Find the `/api/upload` request**
4. **Check:**
   - **Status Code:** Should be 200 (success) or error code
   - **Request Payload:** Should show FormData with file
   - **Response:** Should show JSON with `url` or error message

### Step 3: Check Vercel Logs

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Deployments**
4. **Click on latest deployment**
5. **Go to Logs tab**
6. **Look for:**
   - `Upload request received`
   - `Session check: ...`
   - `Blob token exists: ...`
   - `Upload successful: ...` or error messages

---

## 🐛 Common Issues & Solutions

### Issue 1: "Unauthorized" (401)

**Symptoms:**
- Response status: 401
- Error: "Unauthorized"

**Solutions:**
1. **Make sure you're logged in**
   - Go to `/admin` or login page
   - Verify you have a session

2. **Check NextAuth configuration**
   - Verify `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` is correct

3. **Check session cookie**
   - Clear cookies and login again
   - Check if session expires too quickly

### Issue 2: "BLOB_READ_WRITE_TOKEN is not set" (500)

**Symptoms:**
- Response status: 500
- Error: "Blob storage not configured"

**Solutions:**
1. **Verify token in Vercel:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Check `BLOB_READ_WRITE_TOKEN` exists
   - Value should start with `vercel_blob_rw_`

2. **Redeploy:**
   - After adding token, redeploy your project
   - Go to Deployments → Latest → Redeploy

3. **Check environment:**
   - Make sure token is set for **Production** environment
   - Also set for Preview/Development if needed

### Issue 3: "No image file provided" (400)

**Symptoms:**
- Response status: 400
- Error: "No image file provided"

**Solutions:**
1. **Check field name:**
   - Make sure FormData uses field name `"image"` (not `"file"`)
   - Already correct in `image-upload.tsx`

2. **Check file selection:**
   - Verify file is actually selected
   - Check browser console for file details

### Issue 4: Vercel Blob API Error

**Symptoms:**
- Response status: 500
- Error: "Failed to upload to blob storage"
- Check server logs for details

**Solutions:**
1. **Verify Blob Storage exists:**
   - Go to Vercel Dashboard → Storage
   - Verify Blob storage is created
   - Check it's linked to your project

2. **Check token permissions:**
   - Token should be "Read/Write" token
   - Not just "Read" token

3. **Check token format:**
   - Should start with `vercel_blob_rw_`
   - Should be long string (not short)

4. **Verify region:**
   - If using custom region, make sure it's correct
   - Default should work fine

### Issue 5: Network/CORS Error

**Symptoms:**
- Network request fails
- CORS error in console

**Solutions:**
1. **Check API route:**
   - Verify `/api/upload` route exists
   - Check it's not blocked

2. **Check Vercel deployment:**
   - Verify latest code is deployed
   - Check for build errors

---

## 📋 Debugging Checklist

- [ ] Browser console shows upload attempt
- [ ] Network tab shows `/api/upload` request
- [ ] Request has correct status code
- [ ] Response contains URL or error message
- [ ] Vercel logs show upload attempt
- [ ] `BLOB_READ_WRITE_TOKEN` is set in Vercel
- [ ] User is logged in (session exists)
- [ ] Blob storage is created in Vercel
- [ ] Latest code is deployed to Vercel

---

## 🧪 Test Upload Manually

### Using Browser Console:

```javascript
// Test upload from browser console
const fileInput = document.createElement('input')
fileInput.type = 'file'
fileInput.accept = 'image/*'
fileInput.onchange = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('image', file)
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    console.log('Upload result:', data)
  } catch (error) {
    console.error('Upload error:', error)
  }
}
fileInput.click()
```

---

## 📝 Next Steps

1. **Try uploading an image**
2. **Check browser console** for logs
3. **Check network tab** for request/response
4. **Check Vercel logs** for server-side errors
5. **Share the error messages** you see

The enhanced logging will help identify exactly where the issue is occurring!


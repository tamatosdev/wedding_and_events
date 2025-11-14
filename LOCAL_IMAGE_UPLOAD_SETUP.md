# 📁 Local Image Upload Setup

## ✅ Changes Applied

The image upload system has been changed from Cloudinary (CDN) to local file storage in `public/uploads`.

### What Changed:

1. **`app/api/upload/route.ts`** - Now saves images to `public/uploads` instead of Cloudinary
2. **`public/uploads/`** - Directory created for storing uploaded images
3. **No Cloudinary required** - You can remove Cloudinary environment variables from Vercel

---

## 📋 How It Works

### Upload Process:

1. User selects/ drags image file
2. File is validated (type: image only, size: max 10MB)
3. Unique filename generated: `{timestamp}-{random}.{extension}`
4. File saved to `public/uploads/{filename}`
5. Returns public URL: `/uploads/{filename}`

### File Access:

- Images are accessible at: `https://your-domain.com/uploads/{filename}`
- Files are served directly from the `public/uploads` folder
- No CDN or external service needed

---

## ⚠️ Important Limitations

### Vercel (Serverless) Limitation:

**⚠️ CRITICAL:** Vercel uses serverless functions with **read-only filesystem**. Files uploaded to Vercel will be **lost** when the function restarts.

**Solutions for Vercel:**

1. **Use Vercel Blob Storage** (Recommended for Vercel)
   - Vercel's built-in file storage
   - Persistent across deployments
   - Free tier available

2. **Use Railway or other platform** with persistent storage
   - Railway supports persistent volumes
   - Files will be saved permanently

3. **Use Cloudinary or other CDN** (Original approach)
   - Works on all platforms
   - Files stored externally

### For Local Development:

✅ **Works perfectly** - Files are saved to `public/uploads` and persist

### For Production (Non-Vercel):

✅ **Works if platform supports persistent storage:**
- Railway (with volume)
- Traditional VPS/Server
- Docker with volume mounts

---

## 🔧 Setup Instructions

### Local Development:

1. **Directory is already created:** `public/uploads/`
2. **No configuration needed** - Just start uploading!
3. **Files will be saved** to `public/uploads/`

### For Vercel Deployment:

**Option 1: Use Vercel Blob Storage (Recommended)**

1. Install Vercel Blob:
   ```bash
   npm install @vercel/blob
   ```

2. Update `app/api/upload/route.ts` to use Vercel Blob:
   ```typescript
   import { put } from '@vercel/blob';
   
   const blob = await put(file.name, file, {
     access: 'public',
   });
   
   return NextResponse.json({ url: blob.url });
   ```

3. Add `BLOB_READ_WRITE_TOKEN` to Vercel environment variables

**Option 2: Switch Back to Cloudinary**

If you prefer Cloudinary, you can revert the changes and add Cloudinary credentials to Vercel.

**Option 3: Deploy to Railway**

Railway supports persistent storage, so the current implementation will work.

---

## 📁 File Structure

```
public/
  uploads/
    ├── .gitkeep
    ├── 1234567890-abc123.jpg
    ├── 1234567891-def456.png
    └── ...
```

**Note:** The `.gitkeep` file ensures the directory is tracked by git, but uploaded images should be added to `.gitignore` if they're large.

---

## 🗑️ Cleanup

### Remove Cloudinary (Optional):

If you're not using Cloudinary anymore:

1. **Remove from Vercel:**
   - Go to Settings → Environment Variables
   - Delete: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

2. **Remove from package.json** (optional):
   ```bash
   npm uninstall cloudinary
   ```

3. **Delete `lib/cloudinary.ts`** (optional)

---

## ✅ Testing

### Test Upload:

1. Go to: `/admin/vendors`
2. Click "Add New Vendor"
3. Try uploading an image
4. Check `public/uploads/` - file should be there
5. Image should display in the preview

### Verify File Access:

1. Upload an image
2. Copy the returned URL (e.g., `/uploads/1234567890-abc123.jpg`)
3. Visit: `http://localhost:3000/uploads/1234567890-abc123.jpg`
4. Image should load

---

## 🔒 Security Notes

1. **File Validation:**
   - ✅ Only image files allowed
   - ✅ Max file size: 10MB
   - ✅ Unique filenames prevent overwrites

2. **Access Control:**
   - ✅ Authentication required (session check)
   - ✅ Files are publicly accessible once uploaded

3. **Recommendations:**
   - Consider adding file type whitelist (jpg, png, webp only)
   - Consider adding virus scanning for production
   - Consider rate limiting uploads

---

## 📝 Summary

✅ **Changed:** Cloudinary → Local file storage (`public/uploads`)  
✅ **Works:** Local development, Railway, traditional servers  
⚠️ **Limitation:** Vercel serverless (files lost on restart)  
💡 **Solution for Vercel:** Use Vercel Blob Storage or Cloudinary

**Your image uploads now save to `public/uploads`!** 🎉


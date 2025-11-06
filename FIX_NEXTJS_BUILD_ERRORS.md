# FIX_NEXTJS_BUILD_ERRORS.md

## 🔧 Fixing Next.js Build Cache Errors

### Error Symptoms

```
GET http://localhost:3000/_next/static/css/app/layout.css?v=... 404 (Not Found)
GET http://localhost:3000/_next/static/chunks/main-app.js?v=... 404 (Not Found)
```

**Root Cause:** Next.js build cache (`.next` folder) is corrupted or missing.

---

## ✅ Solution Steps

### Step 1: Clear Next.js Cache

**Windows PowerShell:**
```powershell
# Stop the dev server first (Ctrl+C)

# Remove .next folder
Remove-Item -Recurse -Force .next

# Remove node_modules/.cache if exists
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
```

**Linux/Mac:**
```bash
# Stop the dev server first (Ctrl+C)

# Remove .next folder
rm -rf .next

# Remove node_modules/.cache if exists
rm -rf node_modules/.cache
```

### Step 2: Restart Development Server

```powershell
# Clean install (optional but recommended)
npm install

# Start dev server
npm run dev
```

### Step 3: Verify Build

The dev server will automatically rebuild. Wait for:
```
✓ Compiled successfully
```

---

## 🔍 Additional Troubleshooting

### If errors persist:

#### Option 1: Clean Node Modules Cache

```powershell
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

#### Option 2: Check for Port Conflicts

```powershell
# Check if port 3000 is in use
netstat -ano | findstr :3000

# If something is using port 3000, kill it or use different port
# Set PORT environment variable
$env:PORT=3001
npm run dev
```

#### Option 3: Verify Next.js Installation

```powershell
# Check Next.js version
npm list next

# Should show: next@14.0.4 (or similar)
# If not, reinstall:
npm install next@14.0.4 react@18 react-dom@18
```

#### Option 4: Check for TypeScript Errors

```powershell
# Run type check
npx tsc --noEmit

# Fix any TypeScript errors before running dev server
```

---

## 🚀 Quick Fix Command

**One-liner to fix everything:**

```powershell
# Stop server (Ctrl+C), then:
Remove-Item -Recurse -Force .next; Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue; npm run dev
```

---

## 📝 Prevention Tips

1. **Don't manually edit `.next` folder** - It's auto-generated
2. **Restart dev server** after major changes
3. **Clear cache** if you see strange build errors
4. **Keep Node.js updated** - Use Node.js 18+ for Next.js 14

---

## ✅ Verification

After clearing cache and restarting:

- ✅ No 404 errors for CSS/JS files
- ✅ Page loads correctly
- ✅ No console errors
- ✅ Styles applied correctly

---

## 🆘 Still Having Issues?

1. **Check Next.js version compatibility:**
   ```powershell
   node --version  # Should be 18+
   npm list next   # Should match package.json
   ```

2. **Try production build:**
   ```powershell
   npm run build
   npm run start
   ```

3. **Check for syntax errors:**
   ```powershell
   npm run lint
   ```

4. **Verify environment variables:**
   ```powershell
   # Make sure .env.local exists and has required variables
   Test-Path .env.local
   ```

---

**Note:** The logo 404 error is expected and already handled with fallback. Once you add `/public/assets/logo-new.png`, it will use the new logo automatically.


# Railway Deployment Configuration

## Automatic Database Migrations

The project is now configured to automatically run database migrations when deploying to Railway.

### Configuration Files

1. **`railway.json`** - Railway-specific configuration
   - Uses custom build command: `npm run railway-build`
   - This ensures Prisma generates and pushes schema changes before building

2. **`package.json`** - Build scripts
   - `railway-build`: Runs `prisma generate && prisma db push && next build`
   - `postinstall`: Automatically runs `prisma generate` after npm install
   - `build`: Standard build command (used by default)

### How It Works

When you push code to Railway:

1. **Install Dependencies** (`npm install`)
   - Automatically runs `postinstall` script
   - Generates Prisma Client (`prisma generate`)

2. **Build Process** (`npm run railway-build`)
   - Generates Prisma Client again (ensures latest)
   - Pushes schema changes to database (`prisma db push`)
   - Builds Next.js application (`next build`)

3. **Deploy**
   - Starts the application (`npm start`)

### Environment Variables Required

Make sure these are set in Railway:

```env
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-app.railway.app
```

### Manual Commands (if needed)

If you need to run migrations manually on Railway:

```bash
# SSH into Railway instance or use Railway CLI
railway run npm run db:generate
railway run npm run db:push
```

### Alternative: Using Migrations (Recommended for Production)

For production environments, consider using Prisma Migrations instead of `db:push`:

1. **Create a migration locally:**
   ```bash
   npm run db:migrate
   ```

2. **Update `railway-build` script:**
   ```json
   "railway-build": "prisma generate && prisma migrate deploy && next build"
   ```

3. **Benefits:**
   - Version-controlled schema changes
   - Rollback capability
   - Better for team collaboration

### Troubleshooting

**Issue:** Database connection fails during build
- **Solution:** Ensure `DATABASE_URL` is set correctly in Railway environment variables

**Issue:** Schema changes not applied
- **Solution:** Check Railway build logs to see if `prisma db push` ran successfully

**Issue:** Prisma Client not generated
- **Solution:** The `postinstall` script should handle this automatically, but you can verify in build logs

### Current Setup

✅ **Automatic Prisma Client generation** (postinstall)  
✅ **Automatic schema push** (railway-build)  
✅ **Automatic Next.js build** (railway-build)  
✅ **Railway configuration file** (railway.json)

### Next Steps

1. Push code to your Railway-connected repository
2. Railway will automatically:
   - Install dependencies
   - Generate Prisma Client
   - Push database schema changes
   - Build the application
   - Deploy

No manual intervention needed! 🚀


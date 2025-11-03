# 📦 Create GitHub Repository

Your local repository is ready! Now let's create it on GitHub.

## Option 1: Create via GitHub Website (Recommended)

### Step 1: Create New Repository
1. Go to [github.com](https://github.com)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name:** `wedding_and_events`
   - **Description:** `Wedding & Events Portal - Next.js Application`
   - **Visibility:** Public or Private (your choice)
   - **⚠️ IMPORTANT:** Do NOT check:
     - ❌ Add a README file
     - ❌ Add .gitignore (we already have one)
     - ❌ Choose a license
4. Click **"Create repository"**

### Step 2: Push Your Code
After creating the repository, GitHub will show you commands. Use these:

```bash
# If you haven't already set the remote (run this):
git remote add origin https://github.com/YOUR_USERNAME/wedding_and_events.git

# Or update the existing remote:
git remote set-url origin https://github.com/YOUR_USERNAME/wedding_and_events.git

# Then push:
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

---

## Option 2: Use GitHub CLI (If installed)

If you have GitHub CLI installed:

```bash
# Login to GitHub
gh auth login

# Create repository and push
gh repo create wedding_and_events --public --source=. --remote=origin --push
```

---

## Option 3: I'll Help You Push (After you create the repo)

1. Create the repository on GitHub (follow Option 1, Step 1)
2. Tell me your GitHub username
3. I'll help you run the commands to push

---

## After Creating the Repository

Once you've created the repo and pushed the code:

1. ✅ Verify all files are on GitHub
2. ✅ Check that `.env` files are NOT visible (they're in `.gitignore`)
3. ✅ Ready to deploy to Vercel!

---

## Quick Commands Reference

```bash
# Check current remote
git remote -v

# Update remote URL (if needed)
git remote set-url origin https://github.com/YOUR_USERNAME/wedding_and_events.git

# Push to GitHub
git push -u origin main

# Check repository status
git status
```

---

**Need help?** Let me know once you've created the repository and I'll help you push the code!


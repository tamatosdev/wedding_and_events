# 🔧 Clear Windows Cached Credentials

## The Problem
Windows has cached credentials for `sealiasad`, but you need to authenticate as `tamatosdev`.

## Solution: Clear Windows Credential Manager

### Method 1: Using Windows Credential Manager (Easiest)

1. **Open Credential Manager:**
   - Press `Windows Key`
   - Type: `Credential Manager`
   - Press Enter

2. **Clear Git Credentials:**
   - Click on **"Windows Credentials"** tab
   - Look for entries like:
     - `git:https://github.com`
     - `github.com`
   - Click on each one
   - Click **"Remove"** or **"Delete"**

3. **Try pushing again:**
   ```bash
   git push -u origin main
   ```

4. **When prompted:**
   - Username: `tamatosdev`
   - Password: Use Personal Access Token (for tamatosdev account)

### Method 2: Using Command Line

**Clear credential helper:**
```powershell
git config --global --unset credential.helper
git config --system --unset credential.helper
```

**Or set it to use Windows Credential Manager:**
```powershell
git config --global credential.helper manager-core
```

**Then delete the cached credential file:**
```powershell
Remove-Item "$env:USERPROFILE\.git-credentials" -ErrorAction SilentlyContinue
```

### Method 3: Use Different Credential Storage

**Temporarily use store (will ask for password each time):**
```bash
git config --global credential.helper store
```

**Or cache for 1 hour only:**
```bash
git config --global credential.helper "cache --timeout=3600"
```

## After Clearing Credentials

1. **Push again:**
   ```bash
   git push -u origin main
   ```

2. **Enter credentials:**
   - Username: `tamatosdev`
   - Password: Personal Access Token

### Create Personal Access Token for tamatosdev:

1. Login to GitHub as `tamatosdev`
2. Go to: https://github.com/settings/tokens
3. Click "Generate new token (classic)"
4. Name: `wedding-events-repo`
5. Expiration: Your choice
6. Select scope: **`repo`** (check the box)
7. Click "Generate token"
8. **Copy the token immediately**
9. Use this as your password when Git asks

---

**Quick Steps:**
1. Open Windows Credential Manager
2. Delete `git:https://github.com` entry
3. Run `git push -u origin main`
4. Enter username: `tamatosdev`
5. Enter password: Personal Access Token


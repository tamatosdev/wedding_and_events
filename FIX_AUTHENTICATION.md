# 🔐 Fix GitHub Authentication

## Problem
You're authenticated as `sealiasad` but trying to push to `tamatosdev/wedding_and_events.git`.

## Solutions

### Option 1: Authenticate as tamatosdev (Recommended)

When you run `git push`, you'll be prompted for credentials:

**Username:** `tamatosdev`

**Password:** Use a Personal Access Token for the `tamatosdev` account

#### Create Token for tamatosdev Account:
1. Login to GitHub as `tamatosdev`
2. Go to: https://github.com/settings/tokens
3. Click "Generate new token (classic)"
4. Name: `wedding-events-repo`
5. Select scope: `repo` (full control)
6. Generate and copy the token
7. Use this token as password when Git asks

### Option 2: Clear Cached Credentials

**Windows (PowerShell):**
```powershell
# Clear Git credential cache
git credential-manager-core erase
# When prompted, enter: https://github.com

# Or delete cached credentials
Remove-Item "$env:USERPROFILE\.git-credentials" -ErrorAction SilentlyContinue
```

**Then push again:**
```bash
git push -u origin main
```

### Option 3: Use Different Account Locally

You can configure Git to use different credentials for this repository:

```bash
# Set local user for this repo only
git config user.name "tamatosdev"
git config user.email "tamatosdev@example.com"  # Use tamatosdev's email
```

### Option 4: Use SSH Key for tamatosdev Account

1. **Generate SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "tamatosdev@example.com"
   ```

2. **Add SSH key to tamatosdev GitHub account:**
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Login as tamatosdev
   - Go to: https://github.com/settings/keys
   - Add new SSH key

3. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:tamatosdev/wedding_and_events.git
   ```

4. **Push:**
   ```bash
   git push -u origin main
   ```

## Quick Fix (Try This First)

1. **Clear Windows Credential Manager:**
   - Press `Windows Key` → Search "Credential Manager"
   - Open "Windows Credentials"
   - Find `git:https://github.com`
   - Delete it

2. **Push again:**
   ```bash
   git push -u origin main
   ```

3. **When prompted:**
   - Username: `tamatosdev`
   - Password: Personal Access Token (for tamatosdev account)

---

**Recommended:** Use Option 1 - Create a Personal Access Token for the `tamatosdev` account and use it when Git prompts for password.


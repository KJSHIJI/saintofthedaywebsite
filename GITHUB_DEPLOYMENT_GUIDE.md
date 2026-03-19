# 🚀 DEPLOY TO GITHUB PAGES - STEP BY STEP

**Your Website:** Saint of the Day  
**GitHub Repo:** KJSHIJI/saintofthedaywebsite  
**Live Website:** https://kjshiji.github.io/saintofthedaywebsite

---

## ⚠️ PREREQUISITE: Install Git

**If you don't have Git installed:**

1. Download: https://git-scm.com/download/win
2. Run installer
3. Accept all defaults
4. Restart your computer

---

## ✅ AUTOMATIC SETUP (RECOMMENDED)

### Option 1: Run the Batch Script

1. Open folder: `c:\Users\LE311XA\Documents\saintofthedaywebsite`
2. **Right-click** on `GITHUB_SETUP.bat`
3. Click **Run as administrator**
4. Wait for completion
5. Press any key when done

**That's it!** Everything uploads automatically. ✨

---

## ✅ MANUAL SETUP (If script doesn't work)

### Step 1: Open PowerShell

1. Press: **Windows Key + R**
2. Type: `powershell`
3. Press: **Enter**

### Step 2: Navigate to Project

```powershell
cd "c:\Users\LE311XA\Documents\saintofthedaywebsite"
```

### Step 3: Configure Git

```powershell
git config --global user.name "KJSHIJI"
git config --global user.email "your-email@example.com"
```

### Step 4: Initialize Repository

```powershell
git init
```

### Step 5: Add All Files

```powershell
git add .
```

### Step 6: Create First Commit

```powershell
git commit -m "Initial commit - Saint of the Day website"
```

### Step 7: Connect to GitHub

```powershell
git remote add origin https://github.com/KJSHIJI/saintofthedaywebsite.git
```

### Step 8: Rename Branch to Main

```powershell
git branch -M main
```

### Step 9: Push to GitHub

```powershell
git push -u origin main
```

**When it asks for credentials:**
- Username: `KJSHIJI`
- Password: Your GitHub password (or Personal Access Token)

---

## ✅ ENABLE GITHUB PAGES

### Once files are uploaded:

1. Go to: **https://github.com/KJSHIJI/saintofthedaywebsite**
2. Click **Settings** (top right)
3. Left sidebar → Click **Pages**
4. Under "Build and deployment":
   - Source: Select `Deploy from a branch`
   - Branch: Select `main`
   - Folder: Select `/ (root)`
5. Click **Save**

---

## 🎉 YOUR WEBSITE IS LIVE!

**Access at:** https://kjshiji.github.io/saintofthedaywebsite

Wait 1-2 minutes for it to become available.

---

## 📝 FUTURE UPDATES (After First Setup)

Any time you make changes locally:

```powershell
# 1. Navigate to project
cd "c:\Users\LE311XA\Documents\saintofthedaywebsite"

# 2. Add changes
git add .

# 3. Commit changes
git commit -m "Updated saints entries"

# 4. Push to GitHub
git push origin main
```

Website updates automatically! ✨

---

## ❓ TROUBLESHOOTING

### Error: "git is not recognized"
→ Git is not installed. Download from: https://git-scm.com/download/win

### Error: "fatal: destination path already exists"
→ Delete `.git` folder (hidden) and start over

### Authentication failed
→ Use Personal Access Token instead of password:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens
  2. Generate new token (expiration: 90+ days)
  3. Copy token
  4. Use as password when pushing

### Website not showing
→ Wait 2-3 minutes for GitHub Pages to build
→ Clear browser cache (Ctrl+Shift+Delete)
→ Check Settings → Pages to confirm deployment

---

## 📊 WHAT HAPPENS

1. ✅ All files uploaded to GitHub
2. ✅ GitHub Pages automatically builds your site
3. ✅ Website goes LIVE at public URL
4. ✅ Anyone can visit and see your devotional
5. ✅ You can add/edit entries through the website's editor

---

## 🎯 NEXT STEPS

After deployment:

1. ✅ Visit: https://kjshiji.github.io/saintofthedaywebsite
2. ✅ Click **✏️ Add/Edit Entry**
3. ✅ Add your first saint entry
4. ✅ Click **💾 Save Entry**
5. ✅ Entry appears on website!

---

**Your Saint of the Day website is ready to go live!** 🎉

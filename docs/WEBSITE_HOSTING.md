# Website Hosting & Free Distribution Guide

**Saint of the Day** — Free Read-Only Website Setup

---

## 🌐 HOSTING OPTIONS

### Option 1: Netlify (EASIEST — Free)
- Free tier: up to 1GB storage
- Automatic SSL/HTTPS
- CI/CD deployment from Git
- Perfect for static sites

**Setup:**
1. Create account: netlify.com
2. Connect GitHub repo (or upload ZIP)
3. Deploy with one click
4. Custom domain: ~$12/year

### Option 2: Vercel (Free)
- Optimized for web apps
- Git integration
- Automatic HTTPS
- Serverless functions available

**Setup:**
1. Create account: vercel.com
2. Import project from GitHub
3. Auto-deploy on every commit
4. Custom domain support

### Option 3: GitHub Pages (Free)
- Free hosting on GitHub
- GitHub domain: `yourname.github.io/saintoftheday`
- Great for version control
- No backend (static only)

**Setup:**
1. Create GitHub repo
2. Push all files to `gh-pages` branch
3. Enable Pages in repo settings
4. Live at: `yourname.github.io/saintoftheday`

### Option 4: Traditional Web Host
- GoDaddy, Bluehost, HostGator, etc.
- Usually $3–10/month
- Support for custom domain
- Full server control

**Setup:**
1. Purchase hosting plan
2. Upload files via FTP/SFTP
3. Configure domain
4. Install SSL certificate (free Let's Encrypt)

---

## 🔐 ACCESS CONTROL (READ-ONLY + PAID)

### Option A: Netlify + JWTAuth (Advanced)

**Setup two-tier system:**
1. Public pages (index, cover samples)
2. Protected pages (requires login)

**Implementation:**
- Use Netlify Functions for authentication
- Store user tokens (JWT)
- Verify before serving content

### Option B: WordPress + Paid Plugin (Easy)

1. Install WordPress
2. Use plugin: "Paid Memberships Pro" or "LearnDash"
3. Add users to paid tier
4. Restrict daily entries to members
5. Payment via Stripe

### Option C: Simple Node.js + Auth (Moderate)

```javascript
// server.js example
const express = require('express');
const auth = require('express-basic-auth');

const app = express();

// Require login for /daily/* routes
app.use('/daily', auth({
    users: { 'user': 'password' }, // or use database
    challenge: true
}));

app.use(express.static('public'));
app.listen(3000);
```

### Option D: Firebase Authentication (Recommended for Scalability)

1. Set up Firebase project (free tier available)
2. Add sign-up/login UI
3. Secure database with rules
4. Track paid users
5. Watermark exports

---

## 📝 SAMPLE SETUP (Firebase + Netlify)

### Step 1: Firebase Setup

1. Go to firebase.google.com
2. Create new project
3. Enable Authentication (Google, Email)
4. Create Realtime Database
5. Set security rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "paidUsers": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('admins').child(auth.uid).val() === true"
      }
    }
  }
}
```

### Step 2: Add Login to Website

Modify `index.html`:

```html
<!-- Add to header -->
<div id="auth-container" class="auth-section">
    <button id="login-btn">Sign In</button>
</div>

<div id="user-info" class="user-info" style="display:none;">
    <span id="user-email"></span>
    <button id="logout-btn">Sign Out</button>
</div>

<!-- Add before closing body -->
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
<script src="src/auth.js"></script>
```

Create `src/auth.js`:

```javascript
// Firebase config (get from Firebase console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "yourproject.firebaseapp.com",
    projectId: "yourproject",
    storageBucket: "yourproject.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login handler
document.getElementById('login-btn').addEventListener('click', () => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .catch(error => console.error(error));
});

// Logout handler
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut();
});

// Monitor auth state
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('daily-content').style.display = 'block';
    } else {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('daily-content').innerHTML = '<p>Please sign in to view content.</p>';
    }
});
```

### Step 3: Payment Processing

**Use Stripe for payments:**

1. Create Stripe account (stripe.com)
2. Add checkout button to website
3. On successful payment, mark user as "paid" in Firebase
4. Unhide daily content

```javascript
// Add to auth.js
async function checkPaidStatus(user) {
    const response = await fetch(`/api/check-paid?uid=${user.uid}`);
    const data = await response.json();
    
    if (data.isPaid) {
        document.getElementById('daily-content').classList.remove('locked');
    } else {
        document.getElementById('daily-content').classList.add('locked');
        document.getElementById('daily-content').innerHTML += 
            '<button onclick="showPaymentModal()">Unlock Full Access</button>';
    }
}
```

---

## 🚫 PREVENT COPYING & SHARING

### Method 1: CSS Disable Select

```css
/* Prevent text selection */
#daily-content {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
```

### Method 2: Watermark Exports

Modify `src/app.js`:

```javascript
exportToWord() {
    // Add watermark
    const html = `...
        <div style="position: fixed; opacity: 0.1; z-index: -1; font-size: 72pt;">
            Exported by: ${currentUser.email}
        </div>
    ...`;
}
```

### Method 3: Disable Right-Click (Not Recommended)

```javascript
// Disable context menu (annoying for users)
document.addEventListener('contextmenu', e => e.preventDefault());
```

### Method 4: Rate Limiting

Limit exports per user per day:

```javascript
async function checkExportLimit(userId) {
    const lastExport = await getLastExportTime(userId);
    const timeSinceExport = Date.now() - lastExport;
    
    if (timeSinceExport < 60000) { // 1 min between exports
        alert('Please wait before exporting again');
        return false;
    }
    return true;
}
```

---

## 📊 HOSTING COMPARISON

| Feature | Netlify | Vercel | GitHub Pages | WordPress |
|---------|---------|--------|--------------|-----------|
| Cost | Free | Free | Free | $3-10/mo |
| Setup Time | 5 min | 5 min | 10 min | 30 min |
| Custom Domain | Yes | Yes | Yes | Yes |
| Authentication | Functions | Serverless | No | Plugin |
| Database | External | External | No | Built-in |
| SSL/HTTPS | Free | Free | Free | Free |
| Scaling | Auto | Auto | Limited | Manual |

---

## 📱 DEPLOYMENT STEPS (Netlify)

### Step 1: Prepare Files

```
saintofthedaywebsite/
├── index.html
├── src/
│   ├── styles.css
│   ├── print.css
│   ├── app.js
│   └── daily-data.js
├── covers/
│   ├── front-cover.html
│   └── back-cover.html
└── README.md
```

### Step 2: Initialize Git (Optional but Recommended)

```bash
cd saintofthedaywebsite
git init
git add .
git commit -m "Initial commit - Saint of the Day website"
```

### Step 3: Deploy to Netlify

**Option A: Direct Upload**
1. Go to app.netlify.com
2. Drag & drop folder into "Deploy" area
3. Website live in seconds

**Option B: Git Integration**
1. Push repo to GitHub
2. Connect Netlify to GitHub repository
3. Auto-deploy on every push

### Step 4: Add Custom Domain

1. In Netlify dashboard → Domain settings
2. Add custom domain
3. Update DNS records (Netlify provides instructions)
4. Configure SSL (automatic)

### Step 5: Add Authentication (Firebase)

1. Complete Firebase setup (see above)
2. Add auth.js to src/
3. Update index.html to include Firebase SDK
4. Test login flow

---

## 🔍 SEO OPTIMIZATION

### Add Meta Tags

Update `index.html` head:

```html
<meta name="description" content="Saint of the Day - A Catholic children's devotional with daily prayers, Scripture, and saint stories.">
<meta name="keywords" content="Catholic devotional, saint stories, children prayers, Bible">
<meta name="author" content="SHIJI KJ">
<meta property="og:title" content="Saint of the Day">
<meta property="og:description" content="Daily Catholic devotional for children">
<meta property="og:image" content="/covers/front-cover.jpg">
<meta property="og:url" content="https://yoursite.com">
```

### Sitemap (For Search Engines)

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yoursite.com/</loc>
        <lastmod>2026-03-19</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://yoursite.com/covers/front-cover.html</loc>
        <lastmod>2026-03-19</lastmod>
        <priority>0.8</priority>
    </url>
</urlset>
```

### robots.txt

Create `robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://yoursite.com/sitemap.xml
```

---

## 📊 ANALYTICS

### Google Analytics

Add to `index.html` head:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Track events:

```javascript
// Track export
gtag('event', 'export', {
    'event_category': 'engagement',
    'event_label': 'export_word'
});
```

---

## 🛡️ SECURITY CHECKLIST

- [ ] HTTPS enabled (SSL certificate)
- [ ] Content-Security-Policy headers set
- [ ] Authentication required for exports
- [ ] User data encrypted at rest
- [ ] GDPR/Privacy policy displayed
- [ ] Regular backups automated
- [ ] No hardcoded API keys
- [ ] Firebase rules restrict access
- [ ] Rate limiting on APIs
- [ ] Watermarks on exports

---

## 🚀 LAUNCH PLAN

1. **Day 1:** Deploy to Netlify
2. **Day 2:** Set up Firebase authentication
3. **Day 3:** Configure payment processing
4. **Day 4:** Test full user flow
5. **Day 5:** Launch to public
6. **Week 2:** SEO optimization
7. **Week 3:** Marketing campaign
8. **Week 4:** Monitor analytics & adjust

---

## 📞 TROUBLESHOOTING

**Q: Website shows blank page**
- Check browser console for errors
- Verify all JS files are loading
- Check daily-data.js for syntax errors

**Q: Exports not working**
- Clear browser cache
- Test in different browser
- Check export functions in app.js

**Q: Firebase not connecting**
- Verify config is correct
- Check Firebase security rules
- Test with browser developer tools

---

**Ready to launch your free website!**  
Saint of the Day © 2026 SHIJI KJ

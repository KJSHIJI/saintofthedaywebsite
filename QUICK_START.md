# QUICK START GUIDE

**Saint of the Day** — Complete Project Ready

---

## 🚀 LAUNCH IN 5 MINUTES

### 1️⃣ Test Locally
```
1. Open: index.html in any web browser
2. Click "Today" button
3. View January 1 sample entry
4. Try navigation & export buttons
```

### 2️⃣ Edit Daily Content
```
1. Open: src/daily-data.js
2. Find date (example: "01-15")
3. Edit the text inside the object
4. Save & refresh browser
5. Your changes appear instantly
```

### 3️⃣ Export Your First Entry
```
1. Select a date
2. Click: 📄 Export to Word
3. Opens in Microsoft Word
4. Edit, print, or save as PDF
```

### 4️⃣ Deploy Website FREE
```
1. Go to: netlify.com
2. Drag & drop entire folder
3. Website LIVE in 30 seconds
4. Gets automatic custom domain
```

---

## 📁 FILE LOCATIONS

| What | Where | Edit? |
|------|-------|-------|
| Daily content | `src/daily-data.js` | ✅ Yes |
| Styling | `src/styles.css` | ✅ Yes |
| Daily entries | `src/daily-data.js` | ✅ Yes |
| Front cover (art) | `covers/front-cover.html` | ✅ Edit text |
| Back cover (text) | `covers/back-cover.html` | ✅ Edit text |
| Full website | `index.html` | ⚠️ Advanced |
| Documentation | `docs/*.md` | ✅ Yes |

---

## 📝 ADD NEW SAINT ENTRY

```javascript
// Open: src/daily-data.js

"01-15": {                      // DATE in MM-DD format
    date: "January 15",         // DISPLAY DATE
    saint: "Saint _____",       // SAINT NAME
    prayer: "Dear Jesus...",    // PRAYER (3-4 lines)
    scripture: "John 3:16",     // SCRIPTURE REFERENCE
    scriptureText: "For God so loved the world...",  // EXACT DOUAY-RHEIMS TEXT
    meaning: "One sentence meaning...",  // MEANING
    story: "Long story here...", // STORY (2-3 paragraphs)
    thought: "One thought here...", // TODAY'S THOUGHT
    action: "Do this small action..." // TODAY'S ACTION
}
```

**Requirements:**
- Use Douay-Rheims Bible ONLY
- Quote verses EXACTLY (no changes)
- True stories only
- ONE virtue per story
- Child-friendly language
- No copied content

---

## 🎯 THREE PATHS TO SUCCESS

### PATH 1: FREE WEBSITE (Today)
```
1. ✅ Already built (all code ready)
2. Upload to Netlify (5 minutes)
3. Share link for free reading
4. Add login/payment later
5. Website: FREE forever (static files)
```

### PATH 2: AMAZON KDP (1-2 weeks)
```
1. ✅ Already built (export ready)
2. Fill all 365 daily entries
3. Export full book to Word
4. Create covers (HTML → PDF)
5. Submit to Amazon KDP
6. Sales: Kindle + Paperback (30% royalty)
```

### PATH 3: COMPLETE ECOSYSTEM (3-4 weeks)
```
1. ✅ Already built (all components)
2. Fill all 365 daily entries
3. Deploy website (Netlify)
4. Add authentication (Firebase)
5. Add payment (Stripe)
6. Submit to Amazon KDP
7. Multiple revenue: Website + Amazon sales
```

---

## 💻 WORKING LOCALLY

### Windows
```
1. Right-click index.html
2. Open with → Chrome (or Edge/Firefox)
3. Browse freely
4. Edit .js files in text editor (VS Code)
5. Save & refresh browser to see changes
```

### Mac
```
1. Double-click index.html
2. Opens in Safari (or drag to Chrome)
3. Browse freely
4. Edit .js files in text editor
5. Save & refresh to see changes
```

### Linux
```
$ firefox index.html
$ nano src/daily-data.js   # Edit content
$ # Save & refresh browser
```

---

## 📤 EXPORT OPTIONS

### 1. Print to PDF (Current Day)
```
Click: 🖨️ Print / PDF
→ Opens print dialog
→ Save as PDF
→ One day per file
```

### 2. Export to Word (Current Day)
```
Click: 📄 Export to Word
→ Downloads .DOC file
→ Open in Word
→ Edit & print
→ One day per file
```

### 3. Export Month
```
Click: 📅 Export Month
→ All days in current month
→ One file, 28-31 entries
→ Ready for printing
```

### 4. Export Full Book
```
Click: 📖 Export Full Book
→ All 365 entries
→ Cover + copyright page
→ Ready for Amazon KDP
→ 1000+ page document
```

---

## 🎨 CUSTOMIZE APPEARANCE

### Change Colors
Edit: `src/styles.css`

Find:
```css
:root {
    --primary-color: #2c5282;      /* Dark blue */
    --accent-color: #c05a3c;       /* Warm brown */
    --secondary-color: #f0f4f8;    /* Light blue */
}
```

### Change Fonts
Edit: `index.html` - head section

Find:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
```

Replace with different Google Fonts

### Change Layout
Edit: `src/styles.css` - `.daily-page` class

---

## 🔐 MAKE WEBSITE PAID (Owner Only)

### Simple Option: Add Password
Edit: `index.html` top of page

```html
<script>
    const password = prompt("Enter access code:");
    if (password !== "your-secret-code") {
        document.body.innerHTML = '<p>Access denied</p>';
    }
</script>
```

### Better Option: Use Firebase
Follow: `docs/WEBSITE_HOSTING.md` (Firebase section)

---

## 📊 YOUR NUMBERS

### Time to Complete
- Setup: ✅ Done (all code ready)
- Writing 365 entries: 60-100 hours
- Design review: 2-3 hours
- Testing: 2-3 hours
- **Total: ~70-110 hours of writing**

### Potential Income (Estimates)

**Website (Free + Donations)**
- Free readers build audience
- Donations: ~5-10% donate
- 10,000 visitors/mo = $500-2000 donations
- Plus book sales links

**Amazon Kindle**
- Price: $4.99-9.99
- Royalty: 35-70%
- Sales potential: 100-500/mo = $200-3000/mo

**Amazon Paperback**
- Price: $14.99-24.99
- Royalty: $3-15 per copy
- Sales potential: 50-200/mo = $150-3000/mo

**Combined (Website + Amazon)**
- Realistic income: $500-3000/month
- Requires: 365 complete entries + marketing

---

## 🎯 NEXT STEPS (PRIORITY ORDER)

### Week 1: Foundation
- [ ] Open `src/daily-data.js`
- [ ] Write January entries (1-31)
- [ ] Verify Scripture (Douay-Rheims)
- [ ] Test each entry in browser
- [ ] Test export buttons

### Week 2: Build Momentum
- [ ] Write February-March
- [ ] Revise January for consistency
- [ ] Customize colors/fonts
- [ ] Test on mobile device

### Week 3: Web Ready
- [ ] Complete ~100 entries
- [ ] Create Netlify account
- [ ] Deploy website live
- [ ] Share with friends/family

### Week 4: Amazon Ready
- [ ] Complete December entries
- [ ] Edit covers with your ISBN
- [ ] Export full book to Word
- [ ] Create Amazon account
- [ ] Submit to KDP

---

## 🆘 HELP & SUPPORT

### Common Questions

**Q: How do I add a saint?**
A: Edit `src/daily-data.js` → Add new date entry → Save → Refresh browser

**Q: Can I change the layout?**
A: Yes → Edit `src/styles.css` or `index.html` (advanced)

**Q: What if I make a mistake?**
A: Easy fix → Edit the file → Save → Refresh

**Q: Can I sell on Amazon and website?**
A: Yes → Amazon KDP for sales, website for free sample + lead generation

**Q: How do I add login/payment?**
A: See `docs/WEBSITE_HOSTING.md` → Firebase + Stripe setup

**Q: Can users download/share content?**
A: Control via watermarks + login → See `docs/WEBSITE_HOSTING.md`

---

## 📞 CONTACT & RESOURCES

### Reading & Reference
- [Douay-Rheims Bible Online](https://www.catholic.com/daily-readings)
- [Catholic Encyclopedia (1913)](https://www.newadvent.org/cathen/)
- [EWTN Saints](https://www.ewtn.com/catholicism/saints)

### Hosting & Publishing
- [Netlify.com](https://netlify.com) — Free website hosting
- [Amazon KDP](https://kdp.amazon.com) — Kindle + Paperback
- [Firebase](https://firebase.google.com) — Free authentication

### Tools
- [VSCode](https://code.visualstudio.com) — Free code editor
- [Grammarly](https://grammarly.com) — Writing help
- [Canva](https://canva.com) — Cover art (if needed)

---

## ✅ QUICK CHECKLIST

**Before Publishing:**
- [ ] All 365 entries filled
- [ ] No placeholder text remains
- [ ] Scripture verified (Douay-Rheims)
- [ ] Stories checked for accuracy
- [ ] Language child-friendly
- [ ] ONE virtue per story
- [ ] Exported & tested
- [ ] Covers approved
- [ ] Copyright notice added

**Website Launch:**
- [ ] Website deployed (Netlify)
- [ ] Domain configured
- [ ] SSL enabled
- [ ] Tested on mobile
- [ ] SEO tags added
- [ ] Analytics enabled

**Amazon Launch:**
- [ ] KDP account created
- [ ] ISBN assigned
- [ ] Full book PDF generated
- [ ] Front + back covers uploaded
- [ ] Preview approved
- [ ] Pricing set
- [ ] Published!

---

**SHIJI KJ — Saint of the Day Owner**

**Project Status: LAUNCH READY** ✅

All systems built. Ready for you to add content.

*Good luck with your Catholic devotional!*

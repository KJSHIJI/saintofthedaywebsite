# Saint of the Day - Complete Project Documentation

**Owner:** SHIJI KJ  
**Copyright © 2026** — All rights reserved

---

## 📋 PROJECT OVERVIEW

**Saint of the Day** is a complete Catholic children's devotional project that supports three distribution channels:

1. **📖 Amazon KDP** — Kindle & Paperback formats
2. **🌐 Free Website** — Read-only online version  
3. **📄 Export to Formats** — PDF, Word, Monthly, Full Year

---

## 🔐 OWNER & ACCESS RIGHTS

### Owner: SHIJI KJ
- **Full edit access** to all content (anytime)
- **Complete ownership** of all Scripture, stories, and original work
- **DRM control** for website access

### Users (Website):
- **READ-ONLY ACCESS** only when paid
- **No copy, download, or edit** permissions
- **No printing** from browser (watermarked exports only)
- **Session-based** access (timed or subscription)

---

## 📁 PROJECT FILE STRUCTURE

```
saintofthedaywebsite/
├── index.html                      # Main website (ALL distribution)
├── src/
│   ├── styles.css                 # Website & screen styling
│   ├── print.css                  # Print & PDF styling
│   ├── daily-data.js              # All 365 daily entries
│   └── app.js                     # Interactive functionality
├── covers/
│   ├── front-cover.html           # Amazon & Print front cover
│   └── back-cover.html            # Amazon & Print back cover
├── content/
│   └── daily/                     # (Optional) Individual daily files
├── exports/                       # Generated exports (PDF, Word)
└── docs/
    ├── README.md                  # (This file)
    ├── AMAZON_KDP_SETUP.md        # Amazon submission guide
    ├── WEBSITE_HOSTING.md         # Website deployment
    └── CONTENT_GUIDELINES.md      # Scripture & saint fact standards
```

---

## ✍️ CONTENT REQUIREMENTS & STANDARDS

### Daily Page Format (EXACT — Do NOT change)

```
[DATE — SAINT NAME or FEAST]

Prayer
(3–4 short, child‑friendly lines)

Scripture
📖 [Book Chapter:Verse]
[Exact Douay‑Rheims verse text]

Meaning:
(1 simple sentence)

Story
(Long, warm, TRUE story; highlight ONE virtue only)

Today's Thought
(1 simple sentence)

Today's Action
(ONE small action under 1 minute)
```

### Scripture Rules (STRICT COMPLIANCE)

✅ **MUST:**
- Use ONLY Douay-Rheims Catholic Bible
- Quote verses WORD-FOR-WORD (Public Domain text)
- Use exact punctuation and capitalization

❌ **MUST NOT:**
- Paraphrase or modernize
- Use other Bible translations
- Alter punctuation or wording
- Copy modern Catholic books

### Saint Facts Guidelines

✅ **Verified sources:**
- Scripture references
- Public-domain Catholic historical records
- Original writing (your own knowledge)

❌ **DO NOT:**
- Guess or fabricate facts
- Copy modern websites
- Use modern books without permission

**If unsure:** Use placeholder:
```
(Content needed — add verified facts here)
```

---

## 🖊️ EDITING DAILY CONTENT

### Location
File: `src/daily-data.js`

### Current Entries (FULLY WRITTEN)
- **January 1** — The Circumcision of Jesus
- **December 25** — The Nativity of Our Lord Jesus Christ
- **January 2** — Saint Basil the Great & Gregory of Nazianzus

### All Other Days
Placeholder text ready for your content.

### How to Edit

1. Open `src/daily-data.js`
2. Find the date key (format: `"MM-DD"`)
3. Edit the object properties:

```javascript
"01-15": {
    date: "January 15",
    saint: "Saint Maur",
    prayer: "Your prayer text here...",
    scripture: "Matthew 5:3",
    scriptureText: "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
    meaning: "Your meaning here...",
    story: "Your story here...",
    thought: "Your thought here...",
    action: "Your action here..."
}
```

4. Save the file
5. Reload the website to see changes

---

## 🎨 STYLING & FORMATTING

### Typography
- **Headings:** Playfair Display (serif, 700 weight)
- **Body:** Libre Baskerville (serif, 400 weight)
- **Size:** 18px
- **Line height:** 1.6

### Alignment
- **Date line:** CENTER
- **Headings:** LEFT
- **Content:** FULLY JUSTIFIED (CSS: `text-align: justify;`)

### Colors
- **Primary:** #2c5282 (Catholic blue)
- **Secondary:** #f0f4f8 (light)
- **Accent:** #c05a3c (warm brown)
- **Text:** #1a202c (dark)

### Mobile Responsive
- Automatically adapts to phones/tablets
- Buttons and navigation scale properly
- Print/export works on all devices

---

## 🌐 WEBSITE FEATURES

### Navigation
1. **Date selector** — Choose any date
2. **Today button** — Jump to current date
3. **Random day** — Browse randomly
4. **Previous/Next** — Navigate day-by-day
5. **Page counter** — Shows "Day X of 365"

### Export Functions

#### 1. Print / PDF
- Prints current day
- Proper page breaks
- Kindle-compatible margins
- Click: **🖨️ Print / PDF**

#### 2. Export to Word (Single Day)
- Exports current day only
- .DOC format (Microsoft Word compatible)
- Ready to edit and share
- Click: **📄 Export to Word**

#### 3. Export Month
- All days in current month
- Page breaks between days
- .DOC format
- Click: **📅 Export Month**

#### 4. Export Full Book
- All 365 days + cover + copyright page
- Ready for print-on-demand
- .DOC format for further editing
- Click: **📖 Export Full Book**

---

## 🖼️ COVER DESIGNS

### Front Cover
**File:** `covers/front-cover.html`

**Original SVG Illustration:**
- Blue sky with soft clouds
- Jesus seated gently
- Bible in Jesus' hands
- Three children sitting beside Him
- Calm, loving, child-friendly art
- Gold halo & light rays

**Text:**
```
Saint of the Day
By SHIJI KJ
```

### Back Cover
**File:** `covers/back-cover.html`

**Content:**
- Book description
- Features list
- Quote from Scripture
- Copyright notice
- ISBN field (for print)

**Text:**
```
© 2026 SHIJI KJ
All rights reserved.

Scripture quotations are from the Douay-Rheims Bible (Public Domain).

ISBN: ________________
```

---

## 📚 AMAZON KDP SETUP

### Kindle Format
1. Export full book (Word .DOC)
2. Use covers (HTML → PDF)
3. Submit via Amazon KDP

See: `docs/AMAZON_KDP_SETUP.md`

### Paperback Format
1. Print CSS handles margins & page breaks
2. Covers formatted 6" x 9"
3. Submit PDF to Amazon Print

---

## 🌍 WEBSITE HOSTING

### Free Distribution (Read-Only)
1. Upload all files to web host
2. Add access control (paid login)
3. Watermark exports
4. No copy/print permissions

See: `docs/WEBSITE_HOSTING.md`

---

## ⚠️ COPYRIGHT & COMPLIANCE

### Scripture
- ✅ Douay-Rheims: Public Domain (1609)
- ✅ Free to quote
- ✅ No copyright issues

### Original Content
- © 2026 SHIJI KJ
- Your stories, prayers, meanings
- All create original work

### Usage Rights
- Owner: Edit anytime
- Users: Read-only (paid access)
- No AI/ML training on content

---

## 🚀 QUICK START

### To Run Locally
1. Open `index.html` in a browser
2. Select dates to view
3. Click export buttons to create Word docs
4. Print/save as PDF from browser

### To Deploy Website
1. Upload all files to web host
2. Add HTTPS/SSL
3. Add user authentication (paid access)
4. Configure export watermarking

### To Submit to Amazon KDP
1. Export full book to Word
2. Convert to PDF (Print CSS applied)
3. Create covers (Front + Back)
4. Follow: `docs/AMAZON_KDP_SETUP.md`

---

## 📞 SUPPORT & MAINTENANCE

### Common Tasks

**Add a new saint entry:**
- Edit `src/daily-data.js`
- Follow the template format
- Save and reload

**Change styling:**
- Edit `src/styles.css` (website)
- Edit `src/print.css` (print/PDF)
- Reload to see changes

**Update copyright:**
- Edit `index.html` footer
- Edit both cover files
- Update `docs/` files

**Watermark exports:**
- Modify `app.js` export functions
- Add image overlay to Word exports

---

## 📋 CHECKLIST FOR COMPLETION

### Content
- [ ] Fill all 365 daily entries
- [ ] Review all Scripture for accuracy
- [ ] Verify all saint facts
- [ ] Edit all prayers for age-appropriateness

### Design
- [ ] Front cover artwork approved
- [ ] Back cover text finalized
- [ ] Color scheme matches brand
- [ ] Fonts render correctly

### Functionality
- [ ] Date navigation works
- [ ] All exports generate correctly
- [ ] Print layout is clean
- [ ] Mobile display is readable

### Deployment
- [ ] Website hosted and live
- [ ] Access control configured
- [ ] Amazon KDP submitted
- [ ] Copyright notices displayed

---

## 🔗 FILE REFERENCE

| File | Purpose | Edit? |
|------|---------|-------|
| `index.html` | Main website | ⚠️ Advanced |
| `src/daily-data.js` | All daily content | ✅ Yes |
| `src/styles.css` | Website styling | ✅ Yes |
| `src/print.css` | Print/PDF styling | ⚠️ Advanced |
| `src/app.js` | Interactive features | ⚠️ Advanced |
| `covers/front-cover.html` | Front cover design | ✅ Edit text/colors |
| `covers/back-cover.html` | Back cover design | ✅ Edit text/colors |

---

## 📝 LAST UPDATED

**2026-03-19** — Complete project setup ready for content population.

---

**SHIJI KJ — Owner**  
*Saint of the Day: A Catholic Children's Devotional*  
© 2026. All rights reserved.

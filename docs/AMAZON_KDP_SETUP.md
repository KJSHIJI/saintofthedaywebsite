# Amazon KDP Setup Guide — Saint of the Day

**Owner:** SHIJI KJ  
**ISBN:** [To be assigned by Amazon or ISBN provider]

---

## 📖 KINDLE FORMAT (eBook)

### Step 1: Prepare Word Document

1. Open `index.html` in browser
2. Click **📖 Export Full Book**
3. File downloads as `SaintOfTheDay_FullYear_2026.doc`
4. Open in Microsoft Word

### Step 2: Format for Kindle

**Margins:**
- Top: 0.5"
- Bottom: 0.5"
- Left: 0.75"
- Right: 0.75"

**Styles:**
- Body: Libre Baskerville, 12pt
- Headings: Playfair Display, 14pt+
- Line spacing: 1.5

**Page Breaks:**
- Insert before each daily entry
- Already configured in exported doc

### Step 3: Add Front Matter

**Add pages BEFORE content:**

1. Title Page
```
Saint of the Day
A Catholic Children's Devotional
By SHIJI KJ
```

2. Copyright/Legal Page
```
© 2026 SHIJI KJ. All rights reserved.

Scripture quotations are from the Douay-Rheims Bible (Public Domain).

All rights reserved. No part of this book may be reproduced or transmitted in any form without permission from the author.

For more information, visit...
```

3. Table of Contents (optional)

### Step 4: Convert to Kindle Format

**Option A: Direct Upload (Recommended)**
- Amazon KDP accepts .DOC files
- Upload directly to KDP dashboard
- Automatic conversion to MOBI/AZW3

**Option B: Manual Conversion**
- Use Calibre (free software) to convert
- DOC → EPUB → MOBI
- More control over formatting

### Step 5: Upload to KDP

1. Go to **kdp.amazon.com**
2. Sign in / Create account
3. Click **Create Kindle eBook**
4. Fill in book details:
   - Title: "Saint of the Day"
   - Author: "SHIJI KJ"
   - Description: [See below]
   - Category: "Religion & Spirituality" → "Children"
   - Age Range: 6-12

5. Upload manuscript (converted file)
6. Preview in Kindle Previewer
7. Set price (Kindle Unlimited eligible: $2.99-$9.99)
8. Publish

### Book Description for Amazon

```
A daily devotional companion for Catholic children exploring faith through saints, Scripture, and simple actions. Each day features a saint's story, a Bible verse from the Douay-Rheims translation, and a meaningful prayer and action for spiritual growth.

Perfect for:
- Morning or bedtime prayers
- Catholic school settings
- Family devotions
- Children 6-12 years old

With 365 entries spanning the entire year, this devotional celebrates the Catholic saints throughout the liturgical year while teaching timeless virtues like courage, kindness, and faith.

All Scripture quotations are from the Public Domain Douay-Rheims Bible.
```

---

## 📘 PAPERBACK FORMAT (Print-on-Demand)

### Step 1: Create Print PDF

**From exported Word document:**
1. Open `SaintOfTheDay_FullYear_2026.doc` in Word
2. Print CSS is already applied
3. File → Print → "Print to PDF"
4. Settings:
   - Paper size: 6" × 9"
   - Margins: 0.75" (all sides)
   - Two-sided (duplex)
   - Binding: Left

### Step 2: Covers

**Front Cover:**
1. Open `covers/front-cover.html` in browser
2. Print → "Print to PDF"
3. Size: 6" wide × 9" tall
4. Save as `SaintOfTheDay_FrontCover.pdf`

**Back Cover:**
1. Open `covers/back-cover.html` in browser
2. Print → "Print to PDF"
3. Size: 6" wide × 9" tall
4. Save as `SaintOfTheDay_BackCover.pdf`

**Spine (Optional):**
- Calculated: 0.25" per 100 pages
- Saint of the Day ≈ 365 pages = ~0.91"
- Create in design software
- Include: Author name + Title

### Step 3: Combine PDF (Interior + Covers)

**Tools:**
- Adobe Acrobat (paid)
- PDFtk (free)
- Online tools: ilovepdf.com, smallpdf.com

**Order:**
1. Front Cover
2. Interior (365 pages)
3. Back Cover

**Output:** `SaintOfTheDay_PrintReady.pdf`

### Step 4: Upload to KDP Print

1. Go to **kdp.amazon.com**
2. Select **Create Paperback**
3. Fill book details:
   - Title: "Saint of the Day"
   - Author: "SHIJI KJ"
   - ISBN: [Select KDP ISBN offered free]
   - Description: [Same as Kindle]
   - Category: Children's Religion

4. Paperback specifications:
   - Dimensions: 6" × 9"
   - Page count: [Auto-calculated]
   - Binding: Perfect bound
   - Interior file: `SaintOfTheDay_PrintReady.pdf`
   - Cover file: (Combine or upload covers separately)

5. Review proof (order + review before publishing)
6. Set list price (minimum: ~$14.99 @ 0.06 sq in)
7. Publish

### Step 5: Enable Ebook + Paperback Bundle

**In KDP Dashboard:**
- Link Kindle edition to Paperback edition
- Enables "Reading Paperback" to "Buy Kindle" offers
- Increases discoverability

---

## 💰 PRICING STRATEGY

### Kindle eBook
- **KDP Select (Exclusive to Amazon):**
  - Price: $4.99–$9.99
  - Royalty: 70% (recommended pricing tier)
  - Promotion: Free days (5 per 90 days)

- **Non-Exclusive (wider distribution):**
  - Price: $2.99–$9.99
  - Royalty: 35% (lower royalty rate)

### Paperback
- **Calculation:**
  - Production cost ≈ $4–$6
  - Set list price: $14.99–$19.99
  - Your royalty: List price − production cost

**Example:**
- 365 pages at KDP standard = $4.50 production
- List price: $17.99
- Your royalty per sale: $13.49

---

## ✅ COMPLIANCE CHECKLIST

### Scripture Accuracy
- [ ] All verses from Douay-Rheims Bible
- [ ] Word-for-word quotes (no paraphrasing)
- [ ] Original punctuation/capitalization preserved
- [ ] Public Domain status confirmed

### Copyright
- [ ] Your original stories verified
- [ ] No copyrighted material copied
- [ ] Saint facts from verifiable sources
- [ ] Copyright notice on every page

### Content Standards
- [ ] Age-appropriate for children
- [ ] No graphic violence/harm
- [ ] Catholic doctrine accurate
- [ ] Prayers suitable for children

### Formatting
- [ ] Page breaks between daily entries
- [ ] Proper margins (all formats)
- [ ] Fonts render correctly
- [ ] Cover meets KDP specifications

### Metadata
- [ ] Accurate title & author
- [ ] Appropriate categories selected
- [ ] Description marketing-ready
- [ ] Keywords include: saint, devotional, Catholic, children

---

## 📊 MARKETING & PROMOTION

### Amazon Listing Optimization

**Keywords (up to 7):**
- Catholic children's devotional
- Saint stories for kids
- Religious daily prayers
- Bible verses for children
- Catholic faith book kids
- Children's spirituality
- Daily devotional book

**Category Selection:**
- Primary: Books → Religion & Spirituality → Children
- Alternative: Books → Christian Books & Bibles → Children

### KDP Select Promotion

**Free Days (5 per 90 days):**
- Announce on social media
- Catholic homeschool groups
- Parish newsletters
- Catholic parent forums

**Countdown Deals:**
- 5-7 days prior to launch
- Discount 10-25% off list price

### Build Readership

1. **Goodreads author page** — Link your Amazon title
2. **Social media** — Instagram, Facebook, TikTok
3. **Blog** — Share sample daily entries
4. **Email list** — Build subscriber base
5. **Partnerships** — Catholic publishers, teachers, parishes

---

## 🔍 PRE-PUBLICATION CHECKLIST

### Before Submitting

**Manuscript:**
- [ ] All 365 entries complete
- [ ] No placeholder text remains
- [ ] Proofread for typos
- [ ] Read aloud for flow
- [ ] Scripture verses verified (word-for-word)

**Front Matter:**
- [ ] Title page formatted
- [ ] Copyright page complete (with ISBN placeholder)
- [ ] Table of contents (if included)

**Formatting:**
- [ ] Consistent fonts throughout
- [ ] Page breaks working correctly
- [ ] No orphaned headings
- [ ] Margins meet KDP specs

**Covers:**
- [ ] High resolution (300 DPI minimum)
- [ ] Dimensions exact (6" × 9" + spine)
- [ ] Text clear and readable
- [ ] ISBN barcode (if using custom ISBN)

**Metadata:**
- [ ] Title exact and compelling
- [ ] Author name consistent
- [ ] Description proofread
- [ ] Categories appropriate
- [ ] Keywords optimized

---

## 📞 KDP SUPPORT

**Common Issues:**

**Q: PDF looks different in preview**
- Check fonts are embedded
- Verify page size (6" × 9")
- Test in Kindle Previewer

**Q: How long until book appears on Amazon?**
- Usually 24-48 hours
- Can take up to 7 days
- Check "Books" tab in KDP dashboard

**Q: Can I update content after publishing?**
- Yes, anytime
- Upload new file, republish
- Takes 24-48 hours to update

**Q: What's the best price point?**
- For KDP Select: $4.99–$9.99
- For Paperback: $14.99–$24.99
- Research comparable bestsellers

---

## 🎯 NEXT STEPS

1. ✅ Complete all 365 daily entries
2. ✅ Format exported Word document
3. ✅ Create PDF (interior + covers)
4. ✅ Test in Kindle Previewer
5. ✅ Create KDP account
6. ✅ Submit Kindle edition
7. ✅ Request ISBN (free via KDP)
8. ✅ Submit Paperback edition
9. ✅ Link both editions
10. ✅ Promote on social media

---

**Good luck with your Amazon KDP launch!**

Saint of the Day — © 2026 SHIJI KJ

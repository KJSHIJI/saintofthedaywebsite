/* Saint of the Day - Main Application */

const OWNER_PASSWORD = "CHANGE_ME"; // Simple password - change this!
const UPI_ID = "yourname@bank"; // Update this with your UPI ID
const FREE_DATES = ["01-01", "12-25"]; // Free preview dates: Jan 1 & Dec 25
const PAID_ACCESS_DURATION = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

// KDP trim sizes in inches
const KDP_TRIM_SIZES = {
    "6x9": { width: 6, height: 9, margins: "0.75in" },
    "5x8": { width: 5, height: 8, margins: "0.5in" },
    "5.5x8.5": { width: 5.5, height: 8.5, margins: "0.625in" },
    "8.5x11": { width: 8.5, height: 11, margins: "0.75in" }
};

// Pricing configuration
const PRICING = {
    day: { price: 5, duration: 1 * 24 * 60 * 60 * 1000, label: "1 Day" },
    month: { price: 200, duration: 30 * 24 * 60 * 60 * 1000, label: "1 Month" },
    year: { price: 999, duration: 365 * 24 * 60 * 60 * 1000, label: "1 Year" }
};

class SaintOfTheDay {
    constructor() {
        this.currentDate = new Date();
        this.isOwnerLoggedIn = false;
        this.userHasPaidAccess = false;
        this.kdpTrimSize = "6x9";
        this.kdpFormat = "paperback";

        this.loadSavedEntries(); // localStorage drafts
        this.init();
    }

    // ---------- Helpers ----------
    safeOn(id, eventName, handler) {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener(eventName, handler);
    }

    // Convert ANY entry to the current book format safely
    normalizeEntry(entry, keyForFallback = "") {
        if (!entry) return null;

        // If entry is already new format
        const hasNew = entry.title || entry.bibleVerse;

        let title = entry.title;
        let story = entry.story || "";
        let meaning = entry.meaning || "";
        let prayer = entry.prayer || "";
        let action = entry.action || "";

        // Backward compatibility (old format)
        if (!title) {
            // old: date + saint
            const fallbackDate = entry.date || this.getMonthDay(keyForFallback);
            const fallbackSaint = entry.saint || "";
            title = `${fallbackDate}  ${fallbackSaint}`.trim();
        }

        let bibleVerse = entry.bibleVerse;
        if (!bibleVerse) {
            // old: scripture + scriptureText
            if (entry.scripture || entry.scriptureText) {
                const ref = entry.scripture ? String(entry.scripture) : "";
                const text = entry.scriptureText ? String(entry.scriptureText) : "";
                bibleVerse = `Bible verse: ${ref}\n${text}`.trim();
            } else {
                bibleVerse = "(Bible verse needed)";
            }
        }

        // ensure required fields exist
        if (!story) story = "(Story content needed)";
        if (!meaning) meaning = "(Meaning needed)";
        if (!prayer) prayer = "(Prayer needed)";
        if (!action) action = "(Task needed)";

        return { title, story, bibleVerse, meaning, prayer, action, _raw: entry };
    }

    // ---------- Init ----------
    init() {
        this.loadTheme();
        this.checkOwnerLogin();
        this.checkUserAccessStatus();
        this.loadKDPPreferences();

        this.setupEventListeners();
        this.updateUIBasedOnAccess();

        // Set date input to today (if it exists)
        const dateInput = document.getElementById("date-input");
        if (dateInput) dateInput.valueAsDate = this.currentDate;

        this.updateDateDisplay();
        this.displayDay(this.currentDate);
    }

    loadSavedEntries() {
        // Load all entries from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("DAILY_CONTENT_")) {
                const dateKey = key.replace("DAILY_CONTENT_", "");
                try {
                    DAILY_CONTENT[dateKey] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    console.error("Error loading entry:", dateKey, e);
                }
            }
        }
    }

    setupEventListeners() {
       // ✅ Date input (LOCAL TIME SAFE – NO TIMEZONE SHIFT)
this.safeOn("date-input", "change", (e) => {
    if (!e.target.value) return;

    // e.target.value is YYYY-MM-DD
    const [year, month, day] = e.target.value.split("-").map(Number);

    // ✅ Create date in LOCAL time
    this.currentDate = new Date(year, month - 1, day);

    this.displayDay(this.currentDate);
    this.updateDateDisplay();
});

// ✅ Today button (SAFE)
this.safeOn("today-btn", "click", () => {
    const now = new Date();

    // ✅ Strip time, keep local date only
    this.currentDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    this.displayDay(this.currentDate);
    this.updateDateDisplay();
});

        // Prev/Next
        this.safeOn("prev-btn", "click", () => {
            this.currentDate.setDate(this.currentDate.getDate() - 1);
            this.displayDay(this.currentDate);
            this.updateDateDisplay();
        });

        this.safeOn("next-btn", "click", () => {
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            this.displayDay(this.currentDate);
            this.updateDateDisplay();
        });

        // Export buttons (owner)
        this.safeOn("print-btn", "click", () => this.printPage());
        this.safeOn("export-word-btn", "click", () => this.exportToWord());
        this.safeOn("export-monthly-btn", "click", () => this.exportMonth());
        this.safeOn("export-book-btn", "click", () => this.exportFullBook());

        // Owner login/logout
        this.safeOn("owner-login-btn", "click", () => this.openLoginModal());
        this.safeOn("owner-logout-btn", "click", () => this.logout());
        this.safeOn("login-btn", "click", () => this.login());
        this.safeOn("login-cancel-btn", "click", () => this.closeLoginModal());
        this.safeOn("login-close", "click", () => this.closeLoginModal());
        this.safeOn("payment-mgmt-btn", "click", () => this.openPaymentModal());
        this.safeOn("save-payment-btn", "click", () => this.savePaymentInfo());
        this.safeOn("payment-cancel-btn", "click", () => this.closePaymentModal());
        this.safeOn("payment-close", "click", () => this.closePaymentModal());

        // Pricing modal events
        this.safeOn("pricing-cancel-btn", "click", () => this.closePricingModal());
        this.safeOn("pricing-close", "click", () => this.closePricingModal());

        // Enter key on password
        const pwd = document.getElementById("owner-password");
        if (pwd) {
            pwd.addEventListener("keypress", (e) => {
                if (e.key === "Enter") this.login();
            });
        }

        // Close modals when clicking outside
        window.addEventListener("click", (event) => {
            const loginModal = document.getElementById("login-modal");
            const paymentModal = document.getElementById("payment-modal");
            const editorModal = document.getElementById("editor-modal");
            const pricingModal = document.getElementById("pricing-modal");

            if (event.target === loginModal) this.closeLoginModal();
            if (event.target === paymentModal) this.closePaymentModal();
            if (event.target === editorModal) this.closeEditor();
            if (event.target === pricingModal) this.closePricingModal();
        });

        // Editor functionality
        this.safeOn("edit-mode-btn", "click", () => this.openEditor());

        const closeBtn = document.querySelector("#editor-modal .close");
        if (closeBtn) closeBtn.addEventListener("click", () => this.closeEditor());

        this.safeOn("cancel-edit-btn", "click", () => this.closeEditor());
        this.safeOn("save-entry-btn", "click", () => this.saveEntry());
        this.safeOn("export-data-btn", "click", () => this.exportDataForGitHub());

        // KDP Download events
        const kdpTrimSelect = document.getElementById("kdp-trim-select");
        const kdpFormatSelect = document.getElementById("kdp-format-select");
        if (kdpTrimSelect) kdpTrimSelect.addEventListener("change", (e) => this.setKDPTrimSize(e.target.value));
        if (kdpFormatSelect) kdpFormatSelect.addEventListener("change", (e) => this.setKDPFormat(e.target.value));

        this.safeOn("kdp-interior-btn", "click", () => this.openKDPInterior());
        this.safeOn("kdp-cover-btn", "click", () => this.openKDPCover());

        // Dark mode toggle
        this.safeOn("theme-toggle-btn", "click", () => this.toggleTheme());
    }

    loadKDPPreferences() {
        const savedTrim = localStorage.getItem("kdpTrimSize");
        const savedFormat = localStorage.getItem("kdpFormat");
        if (savedTrim) this.kdpTrimSize = savedTrim;
        if (savedFormat) this.kdpFormat = savedFormat;

        const trimSelect = document.getElementById("kdp-trim-select");
        const formatSelect = document.getElementById("kdp-format-select");
        if (trimSelect) trimSelect.value = this.kdpTrimSize;
        if (formatSelect) formatSelect.value = this.kdpFormat;
    }

    setKDPTrimSize(trimSize) {
        this.kdpTrimSize = trimSize;
        localStorage.setItem("kdpTrimSize", trimSize);
    }

    setKDPFormat(format) {
        this.kdpFormat = format;
        localStorage.setItem("kdpFormat", format);
    }

    getDateKey(date) {
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${month}-${day}`;
    }

    // ---------- Display ----------
    displayDay(date) {
        const key = this.getDateKey(date);
        const raw = DAILY_CONTENT[key];
        const content = this.normalizeEntry(raw, key);
        const container = document.getElementById("daily-content");
        if (!container) return;

        if (!content) {
            container.innerHTML = `
                <div style="text-align:center; padding:2rem; background:var(--secondary-color); border-radius:8px; margin:2rem 0;">
                    <p style="font-size:1.1rem; color:var(--light-text);">😊 No content added yet for this day.</p>
                    <p style="color:var(--light-text); margin-top:0.5rem;">Check back soon!</p>
                </div>
            `;
            return;
        }

        // Paywall
        if (!this.canUserReadContent(key)) {
            container.innerHTML = this.getPaywallHTML(content, key);
            return;
        }

        // Full content (current book format)
        container.innerHTML = `
            <div class="daily-date">${this.escapeHtml(content.title)}</div>

            <h2>Story</h2>
            <p class="content" style="text-align:justify;">${this.escapeHtml(content.story)}</p>

            <h2>Bible Verse</h2>
            <pre class="scripture-text">${this.escapeHtml(content.bibleVerse)}</pre>

            <h2>Meaning</h2>
            <p class="content">${this.escapeHtml(content.meaning)}</p>

            <h2>Prayer</h2>
            <p class="content">${this.escapeHtml(content.prayer)}</p>

            <h2>Task of the Day</h2>
            <p class="content">${this.escapeHtml(content.action)}</p>
        `;

        // Page counter
        const counter = document.getElementById("page-counter");
        if (counter) {
            const start = new Date(date.getFullYear(), 0, 0);
            const dayOfYear = Math.floor((date - start) / 86400000);
            counter.textContent = `Day ${dayOfYear} of 365`;
        }
    }

    getPaywallHTML(content, dateKey) {
        return `
            <div class="daily-date">${this.escapeHtml(content.title)}</div>
            <div style="margin-top: 2rem; padding: 2rem; background: linear-gradient(135deg, var(--primary-color), #1a4d7a); color: white; border-radius: 12px; text-align: center;">
                <p style="font-size: 1.5rem; margin: 0 0 1rem 0;">🔒 Pay & Read</p>
                <p style="font-size: 1.05rem; margin: 0 0 1.5rem 0;">This day is locked. Send payment via UPI to read.</p>

                <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <p style="margin: 0; font-size: 0.95rem; color: #e0e0e0;">📱 UPI ID:</p>
                    <p style="margin: 0.5rem 0 0 0; font-size: 1.2rem; font-family: monospace; font-weight: bold;">${UPI_ID}</p>
                </div>

                <button class="export-btn" onclick="app.openPricingModal()" style="background-color: #ffd700; color: #000; font-weight: bold; font-size: 1rem; margin-bottom: 1rem; width: 100%;">💳 View Pricing & Unlock</button>

                <p style="margin: 0; font-size: 0.85rem; color: #b0b0b0;">After sending payment,<br>contact owner to verify your access.</p>
            </div>
        `;
    }

    updateDateDisplay() {
        const dateStr = this.currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

        const dd = document.getElementById("date-display");
        if (dd) dd.textContent = dateStr;

        const di = document.getElementById("date-input");
        if (di) di.valueAsDate = this.currentDate;
    }

    escapeHtml(text) {
        if (text === null || text === undefined) return "";
        const div = document.createElement("div");
        div.textContent = String(text);
        return div.innerHTML;
    }

    // ---------- Printing / Export ----------
    printPage() {
        if (!this.isOwnerLoggedIn) {
            alert("❌ Only the owner can print content. Please login first.");
            this.openLoginModal();
            return;
        }
        window.print();
    }

    exportToWord() {
        if (!this.isOwnerLoggedIn) {
            alert("❌ Only the owner can export content. Please login first.");
            this.openLoginModal();
            return;
        }

        const key = this.getDateKey(this.currentDate);
        const content = this.normalizeEntry(DAILY_CONTENT[key], key);
        if (!content) return;

        const html = `
<html>
<head>
<meta charset="UTF-8">
<title>${this.escapeHtml(content.title)}</title>
<style>
  body { font-family: Calibri, sans-serif; margin: 1in; line-height: 1.5; }
  .title { font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 12pt; }
  h2 { color: #2c5282; font-size: 14pt; margin-top: 12pt; }
  p { text-align: justify; font-size: 11pt; }
  pre { white-space: pre-wrap; border-left: 3px solid #2c5282; padding-left: 12pt; font-style: italic; }
</style>
</head>
<body>
  <div class="title">${this.escapeHtml(content.title)}</div>

  <h2>Story</h2>
  <p>${this.escapeHtml(content.story)}</p>

  <h2>Bible Verse</h2>
  <pre>${this.escapeHtml(content.bibleVerse)}</pre>

  <h2>Meaning</h2>
  <p>${this.escapeHtml(content.meaning)}</p>

  <h2>Prayer</h2>
  <p>${this.escapeHtml(content.prayer)}</p>

  <h2>Task of the Day</h2>
  <p>${this.escapeHtml(content.action)}</p>

  <p style="margin-top:24pt; font-size:9pt;">© 2026 SHIJI KJ. All rights reserved.<br>
  Scripture quotations are from the Douay-Rheims Bible (Public Domain).</p>
</body>
</html>
        `.trim();

        const blob = new Blob([html], { type: "application/msword" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `SaintOfTheDay_${key}.doc`;
        link.click();
        URL.revokeObjectURL(url);
    }

    exportMonth() {
        if (!this.isOwnerLoggedIn) {
            alert("❌ Only the owner can export content. Please login first.");
            this.openLoginModal();
            return;
        }

        const month = this.currentDate.getMonth();
        const year = this.currentDate.getFullYear();
        const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });

        let html = `
<html>
<head>
<meta charset="UTF-8">
<title>Saint of the Day - ${monthLabel}</title>
<style>
  body { font-family: Calibri, sans-serif; margin: 1in; line-height: 1.5; }
  h1 { text-align: center; color: #2c5282; }
  .day-section { page-break-after: always; margin-bottom: 36pt; }
  .title { font-size: 14pt; font-weight: bold; }
  h2 { color: #2c5282; font-size: 14pt; margin-top: 12pt; }
  p { text-align: justify; font-size: 11pt; }
  pre { white-space: pre-wrap; border-left: 3px solid #2c5282; padding-left: 12pt; font-style: italic; }
</style>
</head>
<body>
<h1>Saint of the Day - ${monthLabel}</h1>
        `.trim();

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, month, d);
            const key = this.getDateKey(dateObj);
            const content = this.normalizeEntry(DAILY_CONTENT[key], key);
            if (!content) continue;

            html += `
<div class="day-section">
  <div class="title">${this.escapeHtml(content.title)}</div>
  <h2>Story</h2><p>${this.escapeHtml(content.story)}</p>
  <h2>Bible Verse</h2><pre>${this.escapeHtml(content.bibleVerse)}</pre>
  <h2>Meaning</h2><p>${this.escapeHtml(content.meaning)}</p>
  <h2>Prayer</h2><p>${this.escapeHtml(content.prayer)}</p>
  <h2>Task of the Day</h2><p>${this.escapeHtml(content.action)}</p>
</div>
            `.trim();
        }

        html += `
<p style="font-size:9pt; margin-top:24pt;">© 2026 SHIJI KJ. All rights reserved.<br>
Scripture quotations are from the Douay-Rheims Bible (Public Domain).</p>
</body></html>
        `.trim();

        const blob = new Blob([html], { type: "application/msword" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `SaintOfTheDay_${String(month + 1).padStart(2, "0")}-${year}.doc`;
        link.click();
        URL.revokeObjectURL(url);
    }

    exportFullBook() {
        if (!this.isOwnerLoggedIn) {
            alert("❌ Only the owner can export content. Please login first.");
            this.openLoginModal();
            return;
        }

        let html = `
<html>
<head>
<meta charset="UTF-8">
<title>Saint of the Day - Full Year</title>
<style>
  body { font-family: Calibri, sans-serif; margin: 1in; line-height: 1.5; }
  .cover { page-break-after: always; text-align: center; padding: 3in 0; }
  .bookTitle { font-size: 28pt; font-weight: bold; color: #2c5282; margin-bottom: 20pt; }
  .author { font-size: 14pt; color: #4a5568; }
  .day-section { page-break-after: always; margin-bottom: 36pt; }
  .title { font-size: 14pt; font-weight: bold; }
  h2 { color: #2c5282; font-size: 14pt; margin-top: 12pt; }
  p { text-align: justify; font-size: 11pt; }
  pre { white-space: pre-wrap; border-left: 3px solid #2c5282; padding-left: 12pt; font-style: italic; }
</style>
</head>
<body>

<div class="cover">
  <div class="bookTitle">Saint of the Day</div>
  <div class="author">By SHIJI KJ</div>
</div>

<div style="page-break-after:always; padding:2in 0;">
  <h2>Copyright Notice</h2>
  <p>© 2026 SHIJI KJ. All rights reserved.</p>
  <p>Scripture quotations are from the Douay-Rheims Bible (Public Domain).</p>
</div>
        `.trim();

        for (let month = 0; month < 12; month++) {
            const dim = new Date(2026, month + 1, 0).getDate();
            for (let d = 1; d <= dim; d++) {
                const dateObj = new Date(2026, month, d);
                const key = this.getDateKey(dateObj);
                const content = this.normalizeEntry(DAILY_CONTENT[key], key);
                if (!content) continue;

                html += `
<div class="day-section">
  <div class="title">${this.escapeHtml(content.title)}</div>
  <h2>Story</h2><p>${this.escapeHtml(content.story)}</p>
  <h2>Bible Verse</h2><pre>${this.escapeHtml(content.bibleVerse)}</pre>
  <h2>Meaning</h2><p>${this.escapeHtml(content.meaning)}</p>
  <h2>Prayer</h2><p>${this.escapeHtml(content.prayer)}</p>
  <h2>Task of the Day</h2><p>${this.escapeHtml(content.action)}</p>
</div>
                `.trim();
            }
        }

        html += `</body></html>`;

        const blob = new Blob([html], { type: "application/msword" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "SaintOfTheDay_FullYear_2026.doc";
        link.click();
        URL.revokeObjectURL(url);
    }

    // ---------- Editor ----------
    openEditor() {
        if (!this.isOwnerLoggedIn) {
            alert("❌ Only the owner can edit content. Please login first.");
            this.openLoginModal();
            return;
        }

        const key = this.getDateKey(this.currentDate);
        const raw = DAILY_CONTENT[key];
        const content = this.normalizeEntry(raw, key);

        // Fill existing editor fields (keep your current HTML IDs)
        const saintField = document.getElementById("editor-saint");
        const prayerField = document.getElementById("editor-prayer");
        const scriptureRefField = document.getElementById("editor-scripture");
        const scriptureTextField = document.getElementById("editor-scripture-text");
        const meaningField = document.getElementById("editor-meaning");
        const storyField = document.getElementById("editor-story");
        const actionField = document.getElementById("editor-action");

        const dateField = document.getElementById("editor-date");
        if (dateField) dateField.value = key;

        // Extract saint from title if possible (e.g., "January 1  Mary, Mother of God")
        let saintName = "";
        if (content && content.title) {
            const parts = content.title.split("  ");
            saintName = parts.length >= 2 ? parts.slice(1).join("  ").trim() : "";
        }
        if (saintField) saintField.value = saintName || "";

        if (storyField) storyField.value = (content && content.story) || "";
        if (meaningField) meaningField.value = (content && content.meaning) || "";
        if (prayerField) prayerField.value = (content && content.prayer) || "";
        if (actionField) actionField.value = (content && content.action) || "";

        // Parse bibleVerse into ref + text if possible
        let ref = "";
        let verseText = "";
        if (content && content.bibleVerse) {
            const lines = String(content.bibleVerse).split("\n");
            if (lines[0]) ref = lines[0].replace(/^Bible verse:\s*/i, "").trim();
            verseText = lines.slice(1).join("\n").trim();
        }
        if (scriptureRefField) scriptureRefField.value = ref;
        if (scriptureTextField) scriptureTextField.value = verseText;

        const modal = document.getElementById("editor-modal");
        if (modal) modal.style.display = "block";
    }

    closeEditor() {
        const modal = document.getElementById("editor-modal");
        if (modal) modal.style.display = "none";
    }

    saveEntry() {
        const key = document.getElementById("editor-date")?.value || "";

        if (!/^\d{2}-\d{2}$/.test(key)) {
            alert("Please enter date in MM-DD format (e.g., 01-15)");
            return;
        }

        const saintName = document.getElementById("editor-saint")?.value || "(Saint/Feast needed)";
        const prayer = document.getElementById("editor-prayer")?.value || "(Prayer needed)";
        const scriptureRef = document.getElementById("editor-scripture")?.value || "(Reference needed)";
        const scriptureText = document.getElementById("editor-scripture-text")?.value || "(Verse text needed)";
        const meaning = document.getElementById("editor-meaning")?.value || "(Meaning needed)";
        const story = document.getElementById("editor-story")?.value || "(Story needed)";
        const action = document.getElementById("editor-action")?.value || "(Task needed)";

        const title = `${this.getMonthDayFull(key)}  ${saintName}`.trim();
        const bibleVerse = `Bible verse: ${scriptureRef}\n${scriptureText}`.trim();

        const entry = { title, story, bibleVerse, meaning, prayer, action };

        DAILY_CONTENT[key] = entry;
        localStorage.setItem("DAILY_CONTENT_" + key, JSON.stringify(entry));

        alert("✅ Entry saved successfully!");
        this.closeEditor();

        this.currentDate = this.parseDate(key);
        this.displayDay(this.currentDate);
        this.updateDateDisplay();
    }

    // ---------- Date formatting ----------
    getMonthDay(dateKey) {
        const [month, day] = dateKey.split("-");
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return monthNames[parseInt(month, 10) - 1] + " " + parseInt(day, 10);
    }

    getMonthDayFull(dateKey) {
        const [month, day] = dateKey.split("-");
        const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return monthNames[parseInt(month, 10) - 1] + " " + parseInt(day, 10);
    }

    parseDate(dateKey) {
        const [month, day] = dateKey.split("-");
        return new Date(2026, parseInt(month, 10) - 1, parseInt(day, 10));
    }

    // ---------- Theme ----------
    toggleTheme() {
        const html = document.documentElement;
        const isDarkMode = html.classList.contains("dark-mode");

        if (isDarkMode) {
            html.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
            const btn = document.getElementById("theme-toggle-btn");
            if (btn) btn.textContent = "🌙 Dark Mode";
        } else {
            html.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
            const btn = document.getElementById("theme-toggle-btn");
            if (btn) btn.textContent = "☀️ Light Mode";
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        const html = document.documentElement;

        const btn = document.getElementById("theme-toggle-btn");
        if (savedTheme === "dark") {
            html.classList.add("dark-mode");
            if (btn) btn.textContent = "☀️ Light Mode";
        } else {
            html.classList.remove("dark-mode");
            if (btn) btn.textContent = "🌙 Dark Mode";
        }
    }

    // ===== OWNER AUTHENTICATION & PAYWALL METHODS =====
    checkOwnerLogin() {
        const ownerLoggedIn = sessionStorage.getItem("ownerLoggedIn") === "true";
        if (ownerLoggedIn) this.isOwnerLoggedIn = true;
    }

    checkUserAccessStatus() {
        const paidAccessTime = localStorage.getItem("paidAccessTime");
        if (!paidAccessTime) return;

        const accessTimestamp = parseInt(paidAccessTime, 10);
        const now = Date.now();
        if (now - accessTimestamp < PAID_ACCESS_DURATION) {
            this.userHasPaidAccess = true;
        } else {
            localStorage.removeItem("paidAccessTime");
            this.userHasPaidAccess = false;
        }
    }

    canUserReadContent(dateKey) {
        if (this.isOwnerLoggedIn) return true;
        if (FREE_DATES.includes(dateKey)) return true;
        if (this.hasUserPurchasedAccess(dateKey)) return true;
        return false;
    }

    hasUserPurchasedAccess(dateKey) {
        const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
        const now = Date.now();

        for (let purchase of purchases) {
            const purchaseTime = parseInt(purchase.purchaseTime, 10);
            const duration = parseInt(purchase.duration, 10);
            const expiresAt = purchaseTime + duration;
            if (now >= purchaseTime && now <= expiresAt) return true;
        }
        return false;
    }

    updateUIBasedOnAccess() {
        const ownerActionsDiv = document.getElementById("owner-actions");
        const ownerLoginBtn = document.getElementById("owner-login-btn");
        const ownerLogoutBtn = document.getElementById("owner-logout-btn");

        if (this.isOwnerLoggedIn) {
            if (ownerActionsDiv) {
                ownerActionsDiv.style.display = "flex";
                ownerActionsDiv.style.flexDirection = "column";
            }
            if (ownerLoginBtn) ownerLoginBtn.style.display = "none";
            if (ownerLogoutBtn) ownerLogoutBtn.style.display = "inline-block";
        } else {
            if (ownerActionsDiv) ownerActionsDiv.style.display = "none";
            if (ownerLoginBtn) ownerLoginBtn.style.display = "inline-block";
            if (ownerLogoutBtn) ownerLogoutBtn.style.display = "none";
        }
    }

    openLoginModal() {
        const m = document.getElementById("login-modal");
        if (m) m.style.display = "block";
        const pwd = document.getElementById("owner-password");
        if (pwd) pwd.focus();
    }

    closeLoginModal() {
        const m = document.getElementById("login-modal");
        if (m) m.style.display = "none";
        const pwd = document.getElementById("owner-password");
        if (pwd) pwd.value = "";
    }

    login() {
        const pwd = document.getElementById("owner-password");
        const password = pwd ? pwd.value : "";

        if (password === OWNER_PASSWORD) {
            this.isOwnerLoggedIn = true;
            sessionStorage.setItem("ownerLoggedIn", "true");
            this.closeLoginModal();
            this.updateUIBasedOnAccess();
            alert("✅ Owner login successful!");
            this.displayDay(this.currentDate);
        } else {
            alert("❌ Incorrect password. Try again.");
            if (pwd) pwd.value = "";
        }
    }

    logout() {
        if (confirm("Are you sure you want to logout?")) {
            this.isOwnerLoggedIn = false;
            sessionStorage.setItem("ownerLoggedIn", "false");
            this.updateUIBasedOnAccess();
            alert("✅ Logged out successfully.");
            this.displayDay(this.currentDate);
        }
    }

    openPaymentModal() {
        const paymentInfo = localStorage.getItem("paymentInfo") || "";
        const t = document.getElementById("payment-info");
        if (t) t.value = paymentInfo;
        const m = document.getElementById("payment-modal");
        if (m) m.style.display = "block";
    }

    closePaymentModal() {
        const m = document.getElementById("payment-modal");
        if (m) m.style.display = "none";
    }

    savePaymentInfo() {
        const t = document.getElementById("payment-info");
        const paymentInfo = t ? t.value.trim() : "";

        if (paymentInfo) {
            localStorage.setItem("paymentInfo", paymentInfo);
            alert("✅ Payment information saved!");
        } else {
            localStorage.removeItem("paymentInfo");
            alert("✅ Payment information removed.");
        }
        this.closePaymentModal();
    }

    openPricingModal() {
        const m = document.getElementById("pricing-modal");
        if (m) m.style.display = "block";
    }

    closePricingModal() {
        const m = document.getElementById("pricing-modal");
        if (m) m.style.display = "none";
    }

    confirmPurchase(planType) {
        const pricing = PRICING[planType];
        if (!pricing) return;

        const now = Date.now();
        const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
        purchases.push({
            type: planType,
            price: pricing.price,
            purchaseTime: now.toString(),
            duration: pricing.duration.toString(),
            expiresAt: new Date(now + pricing.duration).toLocaleDateString()
        });
        localStorage.setItem("purchases", JSON.stringify(purchases));
        this.closePricingModal();
        alert(`✅ ${pricing.label} access granted!`);
        this.displayDay(this.currentDate);
    }

    exportDataForGitHub() {
        // Export ONLY current book format
        let jsCode = `const DAILY_CONTENT = {\n`;

        for (let dateKey in DAILY_CONTENT) {
            const content = this.normalizeEntry(DAILY_CONTENT[dateKey], dateKey);
            jsCode += `  "${dateKey}": {\n`;
            jsCode += `    title: "${String(content.title).replace(/"/g, '\\"')}",\n`;
            jsCode += `    story: "${String(content.story).replace(/"/g, '\\"')}",\n`;
            jsCode += `    bibleVerse: "${String(content.bibleVerse).replace(/"/g, '\\"').replace(/\n/g, '\\n')}",\n`;
            jsCode += `    meaning: "${String(content.meaning).replace(/"/g, '\\"')}",\n`;
            jsCode += `    prayer: "${String(content.prayer).replace(/"/g, '\\"')}",\n`;
            jsCode += `    action: "${String(content.action).replace(/"/g, '\\"')}"\n`;
            jsCode += `  },\n`;
        }

        jsCode += `};\n`;

        const textarea = document.createElement("textarea");
        textarea.value = jsCode;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("✅ All data copied to clipboard! Paste into src/daily-data.js and commit.");
        } catch (err) {
            document.body.removeChild(textarea);
            alert("❌ Failed to copy. Please try again.");
        }
    }

    // ===== KDP METHODS =====
    openKDPInterior() {
        if (!this.isOwnerLoggedIn) {
            alert("❌ Only the owner can download KDP files. Please login first.");
            this.openLoginModal();
            return;
        }

        const trimSize = KDP_TRIM_SIZES[this.kdpTrimSize];
        const width = trimSize.width;
        const height = trimSize.height;

        window.open(
            `kdp/interior.html?trim=${this.kdpTrimSize}&width=${width}&height=${height}&format=${this.kdpFormat}`,
            "KDP_Interior",
            "width=1000,height=800"
        );
    }

    openKDPCover() {
        if (!this.isOwnerLoggedIn) {
            alert("❌ Only the owner can download KDP files. Please login first.");
            this.openLoginModal();
            return;
        }

        const trimSize = KDP_TRIM_SIZES[this.kdpTrimSize];
        const width = trimSize.width;
        const height = trimSize.height;

        window.open(
            `kdp/cover-wrap.html?trim=${this.kdpTrimSize}&width=${width}&height=${height}&format=${this.kdpFormat}`,
            "KDP_Cover",
            "width=1000,height=800"
        );
    }
}

// Initialize the application when the page loads
let app;
document.addEventListener("DOMContentLoaded", () => {
    app = new SaintOfTheDay();
});

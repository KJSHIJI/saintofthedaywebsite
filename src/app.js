/* Saint of the Day - Main Application */

const OWNER_PASSWORD = 'CHANGE_ME'; // Simple password - change this!
const UPI_ID = 'yourname@bank'; // Update this with your UPI ID
const FREE_DATES = ['01-01', '12-25']; // Free preview dates: Jan 1 & Dec 25
const PAID_ACCESS_DURATION = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

// KDP trim sizes in inches
const KDP_TRIM_SIZES = {
    '6x9': { width: 6, height: 9, margins: '0.75in' },
    '5x8': { width: 5, height: 8, margins: '0.5in' },
    '5.5x8.5': { width: 5.5, height: 8.5, margins: '0.625in' },
    '8.5x11': { width: 8.5, height: 11, margins: '0.75in' }
};

// Pricing configuration
const PRICING = {
    day: { price: 5, duration: 1 * 24 * 60 * 60 * 1000, label: '1 Day' },
    month: { price: 200, duration: 30 * 24 * 60 * 60 * 1000, label: '1 Month' },
    year: { price: 999, duration: 365 * 24 * 60 * 60 * 1000, label: '1 Year' }
};

class SaintOfTheDay {
    constructor() {
        this.currentDate = new Date();
        this.isOwnerLoggedIn = false;
        this.userHasPaidAccess = false;
        this.kdpTrimSize = '6x9'; // Default KDP trim size
        this.kdpFormat = 'paperback'; // Default KDP format
        this.loadSavedEntries(); // Load any saved entries from localStorage
        this.init();
    }

    init() {
        this.loadTheme(); // Load saved theme preference
        this.checkOwnerLogin(); // Check if owner already logged in
        this.checkUserAccessStatus(); // Check if user has paid access
        this.loadKDPPreferences(); // Load saved KDP preferences
        this.setupEventListeners();
        this.updateUIBasedOnAccess();
        // Set date input to today
        const dateInput = document.getElementById('date-input');
        dateInput.valueAsDate = this.currentDate;
        this.updateDateDisplay();
        this.displayDay(this.currentDate);
    }

    loadSavedEntries() {
        // Load all entries from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('DAILY_CONTENT_')) {
                const dateKey = key.replace('DAILY_CONTENT_', '');
                try {
                    DAILY_CONTENT[dateKey] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    console.error('Error loading entry:', dateKey, e);
                }
            }
        }
    }

    setupEventListeners() {
        document.getElementById('date-input').addEventListener('change', (e) => {
            this.currentDate = new Date(e.target.value + 'T00:00:00');
            this.displayDay(this.currentDate);
        });

        document.getElementById('today-btn').addEventListener('click', () => {
            this.currentDate = new Date();
            this.displayDay(this.currentDate);
            this.updateDateDisplay();
        });

        document.getElementById('random-btn').addEventListener('click', () => {
            const availableKeys = Object.keys(DAILY_CONTENT).filter(k => 
                DAILY_CONTENT[k] && !DAILY_CONTENT[k].saint.includes('(Content needed')
            );
            
            if (availableKeys.length === 0) {
                alert('No content available yet. Check back soon!');
                return;
            }
            
            const randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
            this.currentDate = this.parseDate(randomKey);
            this.displayDay(this.currentDate);
            this.updateDateDisplay();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            this.currentDate.setDate(this.currentDate.getDate() - 1);
            this.displayDay(this.currentDate);
            this.updateDateDisplay();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            this.displayDay(this.currentDate);
            this.updateDateDisplay();
        });

        document.getElementById('print-btn').addEventListener('click', () => this.printPage());
        document.getElementById('export-word-btn').addEventListener('click', () => this.exportToWord());
        document.getElementById('export-monthly-btn').addEventListener('click', () => this.exportMonth());
        document.getElementById('export-book-btn').addEventListener('click', () => this.exportFullBook());

        // Owner login/logout
        document.getElementById('owner-login-btn').addEventListener('click', () => this.openLoginModal());
        document.getElementById('owner-logout-btn').addEventListener('click', () => this.logout());
        document.getElementById('login-btn').addEventListener('click', () => this.login());
        document.getElementById('login-cancel-btn').addEventListener('click', () => this.closeLoginModal());
        document.getElementById('login-close').addEventListener('click', () => this.closeLoginModal());
        document.getElementById('payment-mgmt-btn').addEventListener('click', () => this.openPaymentModal());
        document.getElementById('save-payment-btn').addEventListener('click', () => this.savePaymentInfo());
        document.getElementById('payment-cancel-btn').addEventListener('click', () => this.closePaymentModal());
        document.getElementById('payment-close').addEventListener('click', () => this.closePaymentModal());

        // User unlock button (after payment)
        document.addEventListener('click', (e) => {
            if (e.target.id === 'unlock-content-btn') {
                this.openPricingModal();
            }
        });

        // Pricing modal events
        document.getElementById('pricing-cancel-btn').addEventListener('click', () => this.closePricingModal());
        document.getElementById('pricing-close').addEventListener('click', () => this.closePricingModal());

        // Allow Enter key in password field
        document.getElementById('owner-password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.login();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (event) => {
            const loginModal = document.getElementById('login-modal');
            const paymentModal = document.getElementById('payment-modal');
            const editorModal = document.getElementById('editor-modal');
            const pricingModal = document.getElementById('pricing-modal');
            
            if (event.target === loginModal) this.closeLoginModal();
            if (event.target === paymentModal) this.closePaymentModal();
            if (event.target === editorModal) this.closeEditor();
            if (event.target === pricingModal) this.closePricingModal();
        });

        // Editor functionality
        document.getElementById('edit-mode-btn').addEventListener('click', () => this.openEditor());
        document.getElementsByClassName('close')[0].addEventListener('click', () => this.closeEditor());
        document.getElementById('cancel-edit-btn').addEventListener('click', () => this.closeEditor());
        document.getElementById('save-entry-btn').addEventListener('click', () => this.saveEntry());
        document.getElementById('export-data-btn').addEventListener('click', () => this.exportDataForGitHub());

        // KDP Download events
        const kdpTrimSelect = document.getElementById('kdp-trim-select');
        const kdpFormatSelect = document.getElementById('kdp-format-select');
        if (kdpTrimSelect) kdpTrimSelect.addEventListener('change', (e) => this.setKDPTrimSize(e.target.value));
        if (kdpFormatSelect) kdpFormatSelect.addEventListener('change', (e) => this.setKDPFormat(e.target.value));

        document.getElementById('kdp-interior-btn').addEventListener('click', () => this.openKDPInterior());
        document.getElementById('kdp-cover-btn').addEventListener('click', () => this.openKDPCover());

        // Dark mode toggle
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    loadKDPPreferences() {
        const savedTrim = localStorage.getItem('kdpTrimSize');
        const savedFormat = localStorage.getItem('kdpFormat');
        if (savedTrim) this.kdpTrimSize = savedTrim;
        if (savedFormat) this.kdpFormat = savedFormat;
        
        // Update UI
        const trimSelect = document.getElementById('kdp-trim-select');
        const formatSelect = document.getElementById('kdp-format-select');
        if (trimSelect) trimSelect.value = this.kdpTrimSize;
        if (formatSelect) formatSelect.value = this.kdpFormat;
    }

    setKDPTrimSize(trimSize) {
        this.kdpTrimSize = trimSize;
        localStorage.setItem('kdpTrimSize', trimSize);
    }

    setKDPFormat(format) {
        this.kdpFormat = format;
        localStorage.setItem('kdpFormat', format);
    }

    getDateKey(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    }

        displayDay(date) {
    const key = this.getDateKey(date);
    const content = DAILY_CONTENT[key];
    const container = document.getElementById("daily-content");

    // If content doesn't exist at all
    if (!content) {
        container.innerHTML = `
            <div style="text-align:center; padding:2rem; background:var(--secondary-color); border-radius:8px; margin:2rem 0;">
                <p style="font-size:1.1rem; color:var(--light-text);">😊 No content added yet for this day.</p>
                <p style="color:var(--light-text); margin-top:0.5rem;">Check back soon!</p>
            </div>
        `;
        return;
    }

    // ✅ PAYWALL CHECK (OWNER ALWAYS BYPASSES)
    if (!this.canUserReadContent(key)) {
        container.innerHTML = this.getPaywallHTML(content, key);
        return;
    }

    // ✅ FULL CONTENT (OWNER OR FREE DAY)
    const html = `
        <div class="daily-date">${this.escapeHtml(content.title)}</div>

        <h2>Story</h2>
        <p class="content" style="text-align:justify;">
            ${this.escapeHtml(content.story)}
        </p>

        <h2>Bible Verse</h2>
        <pre class="scripture-text">
${this.escapeHtml(content.bibleVerse)}
        </pre>

        <h2>Prayer</h2>
        <p class="content">
            ${this.escapeHtml(content.prayer)}
        </p>

        <h2>Task of the Day</h2>
        <p class="content">
            ${this.escapeHtml(content.action)}
        </p>
    `;

    container.innerHTML = html;

    // Page counter (Day X of 365)
    const dayOfYear = Math.floor(
        (date - new Date(date.getFullYear(), 0, 0)) / 86400000
    );
    document.getElementById("page-counter").textContent = `Day ${dayOfYear} of 365`;
}

    getPaywallHTML(content, dateKey) {
        return `
            <div class="daily-date">${content.date} — ${content.saint}</div>
            <div style="margin-top: 2rem; padding: 2rem; background: linear-gradient(135deg, var(--primary-color), #1a4d7a); color: white; border-radius: 12px; text-align: center;">
                <p style="font-size: 1.5rem; margin: 0; margin-bottom: 1rem;">🔒 Pay & Read</p>
                <p style="font-size: 1.05rem; margin: 0; margin-bottom: 1.5rem;">This day is locked. Send payment via UPI to read.</p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <p style="margin: 0; font-size: 0.95rem; color: #e0e0e0;">📱 UPI ID:</p>
                    <p style="margin: 0.5rem 0; font-size: 1.2rem; font-family: monospace; font-weight: bold;">${UPI_ID}</p>
                </div>

                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border-left: 3px solid #ffd700;">
                    <p style="margin: 0; font-size: 0.9rem; color: #ffd700;">💡 Tip: Most UPI apps (GooglePay, PhonePe, etc.) auto-fill the UPI ID when you scan or enter it.</p>
                </div>

                <button class="export-btn" onclick="app.openPricingModal()" style="background-color: #ffd700; color: #000; font-weight: bold; font-size: 1rem; margin-bottom: 1rem; width: 100%;">💳 View Pricing & Unlock</button>

                <p style="margin: 0; font-size: 0.85rem; color: #b0b0b0;">After sending payment,<br>contact owner to verify your access.</p>
            </div>
        `;
    }

    updateDateDisplay() {
        const dateStr = this.currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        document.getElementById('date-display').textContent = dateStr;
        document.getElementById('date-input').valueAsDate = this.currentDate;
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    printPage() {
        // Only owner can print
        if (!this.isOwnerLoggedIn) {
            alert('❌ Only the owner can print content. Please login first.');
            this.openLoginModal();
            return;
        }
        window.print();
    }

    exportToWord() {
        // Only owner can export
        if (!this.isOwnerLoggedIn) {
            alert('❌ Only the owner can export content. Please login first.');
            this.openLoginModal();
            return;
        }

        const key = this.getDateKey(this.currentDate);
        const content = DAILY_CONTENT[key];
        if (!content) return;

        // Create a simple HTML document suitable for Word
        const html = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>${content.date} - Saint of the Day</title>
                <style>
                    body { font-family: 'Calibri', sans-serif; margin: 1in; line-height: 1.5; }
                    h2 { color: #2c5282; font-size: 14pt; margin-top: 12pt; }
                    .date { font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 12pt; }
                    p { text-align: justify; font-size: 11pt; }
                    .scripture { border-left: 3px solid #2c5282; padding-left: 12pt; font-style: italic; }
                </style>
            </head>
            <body>
                <div class="date">${content.date} — ${content.saint}</div>
                <h2>Prayer</h2>
                <p>${content.prayer}</p>
                <h2>Scripture</h2>
                <p><strong>${content.scripture}</strong></p>
                <p class="scripture">${content.scriptureText}</p>
                <h2>Meaning</h2>
                <p>${content.meaning}</p>
                <h2>Story</h2>
                <p>${content.story}</p>
                <h2>Today's Thought</h2>
                <p>${content.thought}</p>
                <h2>Today's Action</h2>
                <p>${content.action}</p>
                <p style="margin-top: 24pt; font-size: 9pt;">© 2026 SHIJI KJ. All rights reserved.<br>Scripture quotations are from the Douay-Rheims Bible (Public Domain).</p>
            </body>
            </html>
        `;

        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SaintOfTheDay_${key}.doc`;
        link.click();
        URL.revokeObjectURL(url);
    }

    exportMonth() {
        // Only owner can export
        if (!this.isOwnerLoggedIn) {
            alert('❌ Only the owner can export content. Please login first.');
            this.openLoginModal();
            return;
        }

        const month = this.currentDate.getMonth();
        const year = this.currentDate.getFullYear();

        let html = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Saint of the Day - ${new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</title>
                <style>
                    body { font-family: 'Calibri', sans-serif; margin: 1in; line-height: 1.5; }
                    h1 { text-align: center; color: #2c5282; }
                    .day-section { page-break-after: always; margin-bottom: 36pt; }
                    h2 { color: #2c5282; font-size: 14pt; margin-top: 12pt; }
                    .date { font-size: 14pt; font-weight: bold; }
                    p { text-align: justify; font-size: 11pt; }
                    .scripture { border-left: 3px solid #2c5282; padding-left: 12pt; font-style: italic; }
                </style>
            </head>
            <body>
                <h1>Saint of the Day - ${new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h1>
        `;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const dateObj = new Date(year, month, day);
            const key = this.getDateKey(dateObj);
            const content = DAILY_CONTENT[key];

            if (content) {
                html += `
                    <div class="day-section">
                        <div class="date">${content.date} — ${content.saint}</div>
                        <h2>Prayer</h2>
                        <p>${this.escapeHtml(content.prayer)}</p>
                        <h2>Scripture</h2>
                        <p><strong>${this.escapeHtml(content.scripture)}</strong></p>
                        <p class="scripture">${this.escapeHtml(content.scriptureText)}</p>
                        <h2>Meaning</h2>
                        <p>${this.escapeHtml(content.meaning)}</p>
                        <h2>Story</h2>
                        <p>${this.escapeHtml(content.story)}</p>
                        <h2>Today's Thought</h2>
                        <p>${this.escapeHtml(content.thought)}</p>
                        <h2>Today's Action</h2>
                        <p>${this.escapeHtml(content.action)}</p>
                    </div>
                `;
            }
        }

        html += `
                <p style="font-size: 9pt; margin-top: 24pt;">© 2026 SHIJI KJ. All rights reserved.<br>Scripture quotations are from the Douay-Rheims Bible (Public Domain).</p>
            </body>
            </html>
        `;

        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SaintOfTheDay_${new Date(year, month, 1).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })}.doc`;
        link.click();
        URL.revokeObjectURL(url);
    }

    exportFullBook() {
        // Only owner can export
        if (!this.isOwnerLoggedIn) {
            alert('❌ Only the owner can export content. Please login first.');
            this.openLoginModal();
            return;
        }

        let html = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Saint of the Day - Full Year</title>
                <style>
                    body { font-family: 'Calibri', sans-serif; margin: 1in; line-height: 1.5; }
                    .cover { page-break-after: always; text-align: center; padding: 3in 0; }
                    .title { font-size: 28pt; font-weight: bold; color: #2c5282; margin-bottom: 20pt; }
                    .author { font-size: 14pt; color: #4a5568; }
                    .day-section { page-break-after: always; margin-bottom: 36pt; }
                    h2 { color: #2c5282; font-size: 14pt; margin-top: 12pt; }
                    .date { font-size: 14pt; font-weight: bold; }
                    p { text-align: justify; font-size: 11pt; }
                    .scripture { border-left: 3px solid #2c5282; padding-left: 12pt; font-style: italic; }
                </style>
            </head>
            <body>
                <div class="cover">
                    <div class="title">Saint of the Day</div>
                    <div class="author">By SHIJI KJ</div>
                </div>

                <div style="page-break-after: always; padding: 2in 0;">
                    <h2>Copyright Notice</h2>
                    <p>© 2026 SHIJI KJ. All rights reserved.</p>
                    <p>Scripture quotations are from the Douay-Rheims Bible (Public Domain).</p>
                </div>
        `;

        // Add all 365 entries
        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(2026, month + 1, 0).getDate();

            for (let day = 1; day <= daysInMonth; day++) {
                const dateObj = new Date(2026, month, day);
                const key = this.getDateKey(dateObj);
                const content = DAILY_CONTENT[key];

                if (content) {
                    html += `
                        <div class="day-section">
                            <div class="date">${content.date} — ${content.saint}</div>
                            <h2>Prayer</h2>
                            <p>${this.escapeHtml(content.prayer)}</p>
                            <h2>Scripture</h2>
                            <p><strong>${this.escapeHtml(content.scripture)}</strong></p>
                            <p class="scripture">${this.escapeHtml(content.scriptureText)}</p>
                            <h2>Meaning</h2>
                            <p>${this.escapeHtml(content.meaning)}</p>
                            <h2>Story</h2>
                            <p>${this.escapeHtml(content.story)}</p>
                            <h2>Today's Thought</h2>
                            <p>${this.escapeHtml(content.thought)}</p>
                            <h2>Today's Action</h2>
                            <p>${this.escapeHtml(content.action)}</p>
                        </div>
                    `;
                }
            }
        }

        html += `
            </body>
            </html>
        `;

        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SaintOfTheDay_FullYear_2026.doc';
        link.click();
        URL.revokeObjectURL(url);
    }

    // Editor methods
    openEditor() {
        // Only owner can edit
        if (!this.isOwnerLoggedIn) {
            alert('❌ Only the owner can edit content. Please login first.');
            this.openLoginModal();
            return;
        }

        const key = this.getDateKey(this.currentDate);
        const content = DAILY_CONTENT[key];

        // Populate form with current data (if exists)
        document.getElementById('editor-date').value = key;
        document.getElementById('editor-saint').value = content ? content.saint : '';
        document.getElementById('editor-prayer').value = content ? content.prayer : '';
        document.getElementById('editor-scripture').value = content ? content.scripture : '';
        document.getElementById('editor-scripture-text').value = content ? content.scriptureText : '';
        document.getElementById('editor-meaning').value = content ? content.meaning : '';
        document.getElementById('editor-story').value = content ? content.story : '';
        document.getElementById('editor-thought').value = content ? content.thought : '';
        document.getElementById('editor-action').value = content ? content.action : '';

        document.getElementById('editor-modal').style.display = 'block';
    }

    closeEditor() {
        document.getElementById('editor-modal').style.display = 'none';
    }

    saveEntry() {
        const key = document.getElementById('editor-date').value;

        // Validate date format
        if (!/^\d{2}-\d{2}$/.test(key)) {
            alert('Please enter date in MM-DD format (e.g., 01-15)');
            return;
        }

        // Create entry object
        const entry = {
            date: this.getMonthDay(key),
            saint: document.getElementById('editor-saint').value || '(No saint name)',
            prayer: document.getElementById('editor-prayer').value || '(Prayer needed)',
            scripture: document.getElementById('editor-scripture').value || '(Scripture needed)',
            scriptureText: document.getElementById('editor-scripture-text').value || '(Text needed)',
            meaning: document.getElementById('editor-meaning').value || '(Meaning needed)',
            story: document.getElementById('editor-story').value || '(Story needed)',
            thought: document.getElementById('editor-thought').value || '(Thought needed)',
            action: document.getElementById('editor-action').value || '(Action needed)'
        };

        // Save to DAILY_CONTENT
        DAILY_CONTENT[key] = entry;

        // Save to local storage (persists across browser sessions)
        localStorage.setItem('DAILY_CONTENT_' + key, JSON.stringify(entry));

        alert('✅ Entry saved successfully!');
        this.closeEditor();

        // Update display
        this.currentDate = this.parseDate(key);
        this.displayDay(this.currentDate);
        this.updateDateDisplay();
    }

    getMonthDay(dateKey) {
        const [month, day] = dateKey.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthNames[parseInt(month) - 1] + ' ' + parseInt(day);
    }

    parseDate(dateKey) {
        const [month, day] = dateKey.split('-');
        return new Date(2026, parseInt(month) - 1, parseInt(day));
    }

    toggleTheme() {
        const html = document.documentElement;
        const isDarkMode = html.classList.contains('dark-mode');

        if (isDarkMode) {
            html.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            document.getElementById('theme-toggle-btn').textContent = '🌙 Dark Mode';
        } else {
            html.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            document.getElementById('theme-toggle-btn').textContent = '☀️ Light Mode';
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const html = document.documentElement;

        if (savedTheme === 'dark') {
            html.classList.add('dark-mode');
            const btn = document.getElementById('theme-toggle-btn');
            if (btn) btn.textContent = '☀️ Light Mode';
        } else {
            html.classList.remove('dark-mode');
            const btn = document.getElementById('theme-toggle-btn');
            if (btn) btn.textContent = '🌙 Dark Mode';
        }
    }

    // ===== OWNER AUTHENTICATION & PAYWALL METHODS =====

    checkOwnerLogin() {
        const ownerLoggedIn = sessionStorage.getItem('ownerLoggedIn') === 'true';
        if (ownerLoggedIn) {
            this.isOwnerLoggedIn = true;
        }
    }

    checkUserAccessStatus() {
        const paidAccessTime = localStorage.getItem('paidAccessTime');
        if (paidAccessTime) {
            const accessTimestamp = parseInt(paidAccessTime);
            const now = Date.now();
            if (now - accessTimestamp < PAID_ACCESS_DURATION) {
                this.userHasPaidAccess = true;
            } else {
                // Access expired
                localStorage.removeItem('paidAccessTime');
                this.userHasPaidAccess = false;
            }
        }
    }

    canUserReadContent(dateKey) {
        // Owner can always read
        if (this.isOwnerLoggedIn) return true;
        
        // Free dates: Jan 1 (01-01) and Dec 25 (12-25)
        if (FREE_DATES.includes(dateKey)) return true;
        
        // Check if user has purchased access for this specific date
        if (this.hasUserPurchasedAccess(dateKey)) return true;
        
        // Otherwise, cannot read
        return false;
    }

    hasUserPurchasedAccess(dateKey) {
        const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
        const now = Date.now();
        const [month, day] = dateKey.split('-');
        const checkDate = new Date(2026, parseInt(month) - 1, parseInt(day)).getTime();

        for (let purchase of purchases) {
            const purchaseTime = parseInt(purchase.purchaseTime);
            const expiresAt = purchaseTime + parseInt(purchase.duration);

            // Check if current date is within the purchase period
            if (checkDate >= purchaseTime && checkDate <= expiresAt) {
                return true;
            }
        }
        return false;
    }

    getPaymentInfoDisplay() {
        const paymentInfo = localStorage.getItem('paymentInfo');
        if (!paymentInfo) {
            return 'Payment info coming soon. Check back later!';
        }
        
        // Check if it's a URL (image)
        if (paymentInfo.startsWith('http')) {
            return `<img src="${paymentInfo}" alt="Payment QR Code" style="max-width: 200px; margin: 1rem 0;">`;
        }
        
        // Otherwise, display as text (GPay number, UPI ID, etc.)
        return `<strong>Payment Details:</strong><br>${paymentInfo.replace(/\n/g, '<br>')}`;
    }

    updateUIBasedOnAccess() {
        const ownerActionsDiv = document.getElementById('owner-actions');
        const ownerLoginBtn = document.getElementById('owner-login-btn');
        const ownerLogoutBtn = document.getElementById('owner-logout-btn');

        if (this.isOwnerLoggedIn) {
            ownerActionsDiv.style.display = 'flex';
            ownerActionsDiv.style.flexDirection = 'column';
            ownerLoginBtn.style.display = 'none';
            ownerLogoutBtn.style.display = 'inline-block';
        } else {
            ownerActionsDiv.style.display = 'none';
            ownerLoginBtn.style.display = 'inline-block';
            ownerLogoutBtn.style.display = 'none';
        }
    }

    openLoginModal() {
        document.getElementById('login-modal').style.display = 'block';
        document.getElementById('owner-password').focus();
    }

    closeLoginModal() {
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('owner-password').value = '';
    }

    login() {
        const password = document.getElementById('owner-password').value;
        
        if (password === OWNER_PASSWORD) {
            this.isOwnerLoggedIn = true;
            sessionStorage.setItem('ownerLoggedIn', 'true');
            this.closeLoginModal();
            this.updateUIBasedOnAccess();
            alert('✅ Owner login successful!');
        } else {
            alert('❌ Incorrect password. Try again.');
            document.getElementById('owner-password').value = '';
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            this.isOwnerLoggedIn = false;
            sessionStorage.setItem('ownerLoggedIn', 'false');
            this.updateUIBasedOnAccess();
            alert('✅ Logged out successfully.');
            this.displayDay(this.currentDate);
        }
    }

    openPaymentModal() {
        const paymentInfo = localStorage.getItem('paymentInfo') || '';
        document.getElementById('payment-info').value = paymentInfo;
        document.getElementById('payment-modal').style.display = 'block';
    }

    closePaymentModal() {
        document.getElementById('payment-modal').style.display = 'none';
    }

    savePaymentInfo() {
        const paymentInfo = document.getElementById('payment-info').value.trim();
        
        if (paymentInfo) {
            localStorage.setItem('paymentInfo', paymentInfo);
            alert('✅ Payment information saved!');
        } else {
            localStorage.removeItem('paymentInfo');
            alert('✅ Payment information removed.');
        }
        
        this.closePaymentModal();
    }

    unlockPaidContent() {
        // User confirms they've sent payment - grant 1 year access
        const now = Date.now();
        localStorage.setItem('paidAccessTime', now.toString());
        this.userHasPaidAccess = true;
        
        alert('✅ Content unlocked! Your access will expire in 1 year. Thank you for your support!');
        
        // Refresh display to show full content
        this.displayDay(this.currentDate);
    }

    openPricingModal() {
        document.getElementById('pricing-modal').style.display = 'block';
    }

    closePricingModal() {
        document.getElementById('pricing-modal').style.display = 'none';
    }

    purchaseAccess(planType) {
        const pricing = PRICING[planType];
        if (!pricing) return;

        // Show payment instruction with price and plan
        const instruction = `
💳 **${pricing.label} - ₹${pricing.price}**

Send payment to the GPay/UPI address shown below and then click "Confirm Payment" to unlock.

Your access will be stored in your browser for the duration of your plan.
        `;

        const confirmed = confirm(`${instruction}\n\nHave you sent the payment? Click OK to confirm.`);
        
        if (confirmed) {
            this.confirmPurchase(planType);
        }
    }

    confirmPurchase(planType) {
        const pricing = PRICING[planType];
        const now = Date.now();

        // Store purchase in localStorage
        const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
        purchases.push({
            type: planType,
            price: pricing.price,
            purchaseTime: now.toString(),
            duration: pricing.duration.toString(),
            expiresAt: new Date(now + pricing.duration).toLocaleDateString()
        });

        localStorage.setItem('purchases', JSON.stringify(purchases));

        // Close modal
        this.closePricingModal();

        // Show success message
        alert(`✅ ${pricing.label} access granted!\n\nValid until: ${new Date(now + pricing.duration).toLocaleDateString()}\n\nThank you for your support!`);

        // Refresh display
        this.displayDay(this.currentDate);
    }

    exportDataForGitHub() {
        // Generate JavaScript code from all DAILY_CONTENT entries
        let jsCode = `const DAILY_CONTENT = {\n`;

        for (let dateKey in DAILY_CONTENT) {
            const entry = DAILY_CONTENT[dateKey];
            jsCode += `    "${dateKey}": {\n`;
            jsCode += `        date: "${entry.date}",\n`;
            jsCode += `        saint: "${entry.saint.replace(/"/g, '\\"')}",\n`;
            jsCode += `        prayer: "${entry.prayer.replace(/"/g, '\\"')}",\n`;
            jsCode += `        scripture: "${entry.scripture.replace(/"/g, '\\"')}",\n`;
            jsCode += `        scriptureText: "${entry.scriptureText.replace(/"/g, '\\"')}",\n`;
            jsCode += `        meaning: "${entry.meaning.replace(/"/g, '\\"')}",\n`;
            jsCode += `        story: "${entry.story.replace(/"/g, '\\"')}",\n`;
            jsCode += `        thought: "${entry.thought.replace(/"/g, '\\"')}",\n`;
            jsCode += `        action: "${entry.action.replace(/"/g, '\\"')}"\n`;
            jsCode += `    },\n`;
        }

        jsCode += `};\n`;

        // Create a text area and copy to clipboard
        const textarea = document.createElement('textarea');
        textarea.value = jsCode;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            alert(`✅ All data copied to clipboard!\n\nNext steps:\n1. Go to src/daily-data.js in your code editor\n2. Replace the entire content with what's copied\n3. Commit and push to GitHub\n4. Your website will update automatically!`);
        } catch (err) {
            document.body.removeChild(textarea);
            alert('❌ Failed to copy. Please try again.');
        }
    }

    // ===== KDP METHODS =====

    openKDPInterior() {
        if (!this.isOwnerLoggedIn) {
            alert('❌ Only the owner can download KDP files. Please login first.');
            this.openLoginModal();
            return;
        }
        
        // Open in new window for printing
        const trimSize = KDP_TRIM_SIZES[this.kdpTrimSize];
        const width = trimSize.width;
        const height = trimSize.height;
        
        window.open(`kdp/interior.html?trim=${this.kdpTrimSize}&width=${width}&height=${height}&format=${this.kdpFormat}`, 'KDP_Interior', 'width=1000,height=800');
    }

    openKDPCover() {
        if (!this.isOwnerLoggedIn) {
            alert('❌ Only the owner can download KDP files. Please login first.');
            this.openLoginModal();
            return;
        }
        
        // Open in new window for printing
        const trimSize = KDP_TRIM_SIZES[this.kdpTrimSize];
        const width = trimSize.width;
        const height = trimSize.height;
        
        window.open(`kdp/cover-wrap.html?trim=${this.kdpTrimSize}&width=${width}&height=${height}&format=${this.kdpFormat}`, 'KDP_Cover', 'width=1000,height=800');
    }
}

// Initialize the application when the page loads
let app; // Global app instance
document.addEventListener('DOMContentLoaded', () => {
    app = new SaintOfTheDay();
});

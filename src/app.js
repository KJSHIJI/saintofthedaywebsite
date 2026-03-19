/* Saint of the Day - Main Application */

class SaintOfTheDay {
    constructor() {
        this.currentDate = new Date();
        this.loadSavedEntries(); // Load any saved entries from localStorage
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayDay(this.currentDate);
        this.updateDateDisplay();
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
            const randomDay = Math.floor(Math.random() * 365);
            this.currentDate = new Date(2026, 0, 1);
            this.currentDate.setDate(this.currentDate.getDate() + randomDay);
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

        // Editor functionality
        document.getElementById('edit-mode-btn').addEventListener('click', () => this.openEditor());
        document.getElementsByClassName('close')[0].addEventListener('click', () => this.closeEditor());
        document.getElementById('cancel-edit-btn').addEventListener('click', () => this.closeEditor());
        document.getElementById('save-entry-btn').addEventListener('click', () => this.saveEntry());

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('editor-modal');
            if (event.target === modal) {
                this.closeEditor();
            }
        });
    }

    getDateKey(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    }

    displayDay(date) {
        const key = this.getDateKey(date);
        const content = DAILY_CONTENT[key];

        if (!content) {
            document.getElementById('daily-content').innerHTML = '<p class="error">Content not found for this date.</p>';
            return;
        }

        const html = `
            <div class="daily-date">${content.date} — ${content.saint}</div>

            <h2>Prayer</h2>
            <p class="content">${this.escapeHtml(content.prayer)}</p>

            <h2>Scripture</h2>
            <p class="scripture-ref">📖 ${this.escapeHtml(content.scripture)}</p>
            <div class="scripture-text">${this.escapeHtml(content.scriptureText)}</div>

            <h2>Meaning:</h2>
            <div class="meaning">${this.escapeHtml(content.meaning)}</div>

            <h2>Story</h2>
            <p class="story content">${this.escapeHtml(content.story)}</p>

            <h2>Today's Thought</h2>
            <p class="content">${this.escapeHtml(content.thought)}</p>

            <h2>Today's Action</h2>
            <p class="content">${this.escapeHtml(content.action)}</p>
        `;

        document.getElementById('daily-content').innerHTML = html;

        // Update page counter
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
        document.getElementById('page-counter').textContent = `Day ${dayOfYear} of 365`;
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
        window.print();
    }

    exportToWord() {
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
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SaintOfTheDay();
});

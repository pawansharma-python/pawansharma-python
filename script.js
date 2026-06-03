
// 1. Initialize AOS (Animations)
AOS.init({ offset: 120, delay: 0, duration: 800, easing: 'ease-in-out', once: false, mirror: true });

// --- 2. BULLETPROOF NATIVE GITHUB FRAGMENT SCRAPER ---
// GitHub ke internal API endpoint ko hit karke direct table nikalta hai (bina CAPTCHA ke)
const username = "pawansharma-python";
const graphBox = document.getElementById('github-graph-box');

// Create Custom Tooltip Element
const tooltip = document.createElement('div');
tooltip.className = 'git-custom-tooltip';
document.body.appendChild(tooltip);

// GitHub Calendar
GitHubCalendar(".calendar", "pawansharma-python", {
    responsive: true,
    tooltips: true
});

// --- 3. LIVE GITHUB REST API (LATEST COMMIT FETCHER) ---
async function fetchLatestCommit() {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/events/public`);
        const events = await res.json();
        const pushEvents = events.filter(e => e.type === 'PushEvent');

        if (pushEvents.length > 0) {
            const latest = pushEvents[0];
            const repoName = latest.repo.name.replace(`${username}/`, '');
            const commitMsg = latest.payload.commits[0]?.message || 'Code updated';
            const date = new Date(latest.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

            document.getElementById('commit-msg').innerHTML = `Pushed to <strong style="color: var(--primary);">${repoName}</strong>: "${commitMsg}"`;
            document.getElementById('commit-date').innerText = `Live sync: ${date}`;
        } else {
            document.getElementById('commit-msg').innerText = "No public commits in the last 90 days.";
            document.getElementById('commit-date').innerText = "Check graph above for history.";
        }
    } catch (e) {
        document.getElementById('commit-msg').innerHTML = "Live updates currently on standby.";
        document.getElementById('commit-date').innerText = "";
    }
}
fetchLatestCommit();

// --- 4. STANDARD UI LOGIC ---
const navbar = document.getElementById('navbar');
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const modal = document.getElementById('projectModal');

window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); });

const applyTheme = (isDark) => {
    if (isDark) { body.classList.add('dark-mode'); themeBtn.classList.replace('fa-moon', 'fa-sun'); }
    else { body.classList.remove('dark-mode'); themeBtn.classList.replace('fa-sun', 'fa-moon'); }
};

if (localStorage.getItem('theme') === 'dark') applyTheme(true);

themeBtn.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    applyTheme(isDarkMode);
});

const projects = {
    'restaurant': {
        title: "SaaS Restaurant Management System", date: "Nov 2025",
        overview: "A robust, scalable SaaS application designed to streamline restaurant operations.",
        extended: `<ul><li><strong>Order Management:</strong> Real-time KOT routing.</li><li><strong>Billing & Analytics:</strong> Automated invoice generation.</li><li><strong>Tech Stack:</strong> Built using Django, REST Framework, PostgreSQL.</li></ul>`
    },
    'ecommerce': {
        title: "BuyNexa E-Commerce", date: "Oct 2025",
        overview: "A scalable platform built to handle real-world traffic. Mimics Amazon's core features.",
        extended: `<ul><li><strong>Secure Auth:</strong> OTP verification.</li><li><strong>Cart System:</strong> Dynamic cart logic with tracking.</li><li><strong>Admin Dashboard:</strong> Efficient product management.</li></ul>`
    },
    'social': {
        title: "Social Connect Platform", date: "Aug 2025",
        overview: "An interactive social media platform that allows users to connect and message.",
        extended: `<ul><li><strong>Profiles & Stories:</strong> Dynamic user profiles.</li><li><strong>Messaging:</strong> Seamless chat modules between users.</li><li><strong>Responsive UI:</strong> Built with Jinja templates.</li></ul>`
    },
    'portfolio': {
        title: "Master Portfolio",
        date: "July 2025",
        overview: "A showcase of technical prowess, designed with modern web standards and clean architecture.",
        extended: `<ul><li><strong>Performance:</strong> Optimized for speed, utilizing native CSS variables.</li><li><strong>Interactivity:</strong> Vanilla JavaScript for modals, themes, and dynamic data generation.</li></ul>`
    },
    'weather': {
        title: "Live Weather Dashboard",
        date: "June 2025",
        overview: "Fetches real-time weather data (temperature, humidity, wind) for any location worldwide.",
        extended: `<ul><li><strong>Live Data:</strong> Integration with OpenWeatherMap REST API.</li><li><strong>Dynamic UI:</strong> Background and icons adapt based on current weather conditions.</li><li><strong>Error Handling:</strong> Graceful degradation for invalid inputs.</li></ul>`
    }
};

const openModal = (id) => {
    const p = projects[id]; if (!p) return;
    document.getElementById('m-title').innerText = p.title;
    document.getElementById('m-date').innerText = p.date;
    document.getElementById('m-overview').innerText = p.overview;
    document.getElementById('m-extended').innerHTML = p.extended;
    modal.style.display = "block"; requestAnimationFrame(() => modal.classList.add('show'));
};

const closeModal = () => { modal.classList.remove('show'); setTimeout(() => modal.style.display = "none", 300); };
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

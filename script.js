// =========================
// AOS Animation
// =========================
AOS.init({
    offset: 120,
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: true
});

// =========================
// GitHub Config
// =========================
const username = "pawansharma-python";

// =========================
// GitHub Contribution Calendar
// =========================
window.addEventListener("load", () => {

    const calendar = document.querySelector(".calendar");

    if (calendar) {

        GitHubCalendar(".calendar", username, {
            responsive: true,
            tooltips: true
        });

    }

});

// =========================
// Latest GitHub Activity
// =========================
async function fetchLatestCommit() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}/events/public`
        );

        if (!response.ok) {
            throw new Error("GitHub API Error");
        }

        const events = await response.json();

        const pushEvents = events.filter(
            event => event.type === "PushEvent"
        );

        const commitMsg = document.getElementById("commit-msg");
        const commitDate = document.getElementById("commit-date");

        if (pushEvents.length === 0) {

            commitMsg.textContent =
                "No recent public activity found.";

            commitDate.textContent = "";

            return;
        }

        const latest = pushEvents[0];

        const repoName = latest.repo.name.replace(
            `${username}/`,
            ""
        );

        const message =
            latest.payload.commits?.[0]?.message ||
            "Repository updated";

        const formattedDate = new Date(
            latest.created_at
        ).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

        commitMsg.innerHTML =
            `Pushed to <strong style="color:var(--primary);">${repoName}</strong>: "${message}"`;

        commitDate.textContent =
            `Updated: ${formattedDate}`;

    } catch (error) {

        document.getElementById("commit-msg").textContent =
            "Unable to load GitHub activity.";

        document.getElementById("commit-date").textContent = "";

        console.error(error);
    }
}

fetchLatestCommit();

// =========================
// Navbar Scroll Effect
// =========================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    navbar?.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );

});

// =========================
// Dark / Light Theme
// =========================
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

function applyTheme(isDark) {

    if (isDark) {

        body.classList.add("dark-mode");

        themeBtn?.classList.replace(
            "fa-moon",
            "fa-sun"
        );

    } else {

        body.classList.remove("dark-mode");

        themeBtn?.classList.replace(
            "fa-sun",
            "fa-moon"
        );
    }
}

if (localStorage.getItem("theme") === "dark") {
    applyTheme(true);
}

themeBtn?.addEventListener("click", () => {

    const isDark =
        body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    applyTheme(isDark);

});

// =========================
// Project Modal
// =========================
const modal = document.getElementById("projectModal");

const projects = {
    restaurant: {
        title: "SaaS Restaurant Management System",
        date: "Nov 2025",
        overview:
            "A robust SaaS application for restaurant operations.",
        extended: `
            <ul>
                <li><strong>Order Management:</strong> Real-time KOT routing</li>
                <li><strong>Billing & Analytics:</strong> Automated invoices</li>
                <li><strong>Tech Stack:</strong> Django, DRF, PostgreSQL</li>
            </ul>`
    },

    ecommerce: {
        title: "BuyNexa E-Commerce",
        date: "Oct 2025",
        overview:
            "Amazon-like eCommerce platform.",
        extended: `
            <ul>
                <li><strong>OTP Authentication</strong></li>
                <li><strong>Dynamic Cart</strong></li>
                <li><strong>Admin Dashboard</strong></li>
            </ul>`
    },


    blog: {
        title: "Blog Management System",
        date: "May 2025",
        overview:
            "A complete blog management platform built with Django that allows users to publish, edit, and manage articles efficiently.",
        extended: `
        <ul>
            <li><strong>User Authentication:</strong> Secure Login & Registration</li>
            <li><strong>CRUD Operations:</strong> Create, Read, Update, Delete Posts</li>
            <li><strong>Admin Panel:</strong> Manage Users and Blog Content</li>
            <li><strong>Responsive Design:</strong> Mobile-Friendly Interface</li>
            <li><strong>Tech Stack:</strong> Python, Django, SQLite, HTML, CSS, JavaScript</li>
        </ul>`
    },



    portfolio: {
        title: "Developer Portfolio",
        date: "July 2025",
        overview:
            "Modern responsive developer portfolio.",
        extended: `
            <ul>
                <li>SEO Optimized</li>
                <li>Dark Mode</li>
                <li>GitHub Integration</li>
            </ul>`
    },

    weather: {
        title: "Weather Dashboard",
        date: "June 2025",
        overview:
            "Real-time weather application.",
        extended: `
            <ul>
                <li>OpenWeather API</li>
                <li>Live Forecast</li>
                <li>Error Handling</li>
            </ul>`
    }
};

function openModal(id) {

    const project = projects[id];

    if (!project) return;

    document.getElementById("m-title").textContent =
        project.title;

    document.getElementById("m-date").textContent =
        project.date;

    document.getElementById("m-overview").textContent =
        project.overview;

    document.getElementById("m-extended").innerHTML =
        project.extended;

    modal.style.display = "block";

    requestAnimationFrame(() => {
        modal.classList.add("show");
    });
}

function closeModal() {

    modal.classList.remove("show");

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

window.addEventListener("click", e => {

    if (e.target === modal) {
        closeModal();
    }

});
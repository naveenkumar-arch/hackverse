# 🚀 Kernel Overriders — Production Student Tech Community & Hackathon Platform

**Kernel Overriders** is a production-ready, full-stack student tech community platform for hackathons, coding competitions, cybersecurity events, workshops, and technical contests, styled in a bright warm cream theme.

---

## 🌟 Key Features

- **Customer Portal**: 100% user-facing, read-only UI displaying Active Events, LIVE badges, real-time countdown timers, Google Form Registration buttons, Project Submission Google Form buttons, and Completed Events Showcase.
- **Dedicated 2-Section Admin Portal**: Isolated Admin Control Center accessible via `/admin-portal` featuring:
  - **Section 1 — Event Creation**: Add Event form with Google Form URLs.
  - **Section 2 — Event Management (Live Hackathon Control)**: Start Event (Go LIVE & countdown timer), Project Submission Toggle, Winner Declaration Modal (1st, 2nd, and 3rd place teams).
- **Up to 6 Team Members Registration**: Supports dynamic team rosters for up to 6 team members per team.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install root & client dependencies
npm run setup

# 2. Start Vite Dev Server
cd client
npm run dev
```

Visit local portal: `http://localhost:5173/`
Visit admin portal: `http://localhost:5173/admin-portal`

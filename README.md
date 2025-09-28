# Daily Tracker

Personal daily updates and reminders app that runs entirely in your browser (no server, no database). Data is saved in localStorage with Export/Import backup.

## Quick start (Windows cmd)

1) Install Node.js LTS from https://nodejs.org
2) Install dependencies and start the dev server:

```
npm install
npm run dev
```

Open http://localhost:3000

## Features
- Dashboard (today’s updates, upcoming reminders)
- CRUD for Updates (title, notes)
- CRUD for Reminders (title, description, optional date/time, mark done)
- Due highlighting (reminders past due are highlighted)
- Mobile-first UI with bottom nav
- Backup/Restore: export JSON and import (merge or replace)
- No backend, no auth, no environment variables

## Project structure

```
pages/
	_app.js          # App wrapper, imports Tailwind globals
	index.js         # Dashboard
	updates/         # Updates list/new/edit
	reminders/       # Reminders list/new/edit
	backup.js        # Export/Import and Clear data
src/
	components/Layout.js  # Sidebar + mobile bottom nav
	lib/dataStore.js      # localStorage CRUD + backup helpers
styles/globals.css      # Tailwind CSS
tailwind.config.js      # Tailwind settings
postcss.config.js       # PostCSS plugins
```

## Usage
1) Add an Update: Updates → New
2) Add a Reminder: Reminders → New (optional date/time)
3) Mark reminders done by ticking the checkbox on the list
4) See today’s updates and due reminders on the Dashboard

## Backup / Restore
- Export: Backup → Download JSON
- Import (Merge): Keeps existing items, updates or adds by id
- Import (Replace): Replaces all local data with the file’s content
- Clear All: Wipes local data (cannot be undone)

Tip: localStorage is per browser + per domain. To move data between machines or a deployed site, export on one and import on the other.


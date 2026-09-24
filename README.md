# FitLog

FitLog is a dark, simple, and responsive workout library application. Users can browse workouts, view workout details, add exercises to today's plan, save workouts for later, and track their daily workout progress.

## Technologies Used

* Next.js
* React
* JavaScript
* Tailwind CSS
* REST API
* LocalStorage
* Git & GitHub

## Features

* Browse 12 different workouts from the workout library
* View detailed information for each workout
* Add workouts to Today's Plan
* Save workouts for later
* Mark planned workouts as Done
* Remove workouts from Today's Plan or Saved
* Track total exercises, minutes, and calories
* Sort workouts by Duration, Calories, or Rating
* Responsive design for mobile, tablet, and desktop
* Loading animation while workouts are being fetched
* Toast notifications for user actions
* Custom 404 page for invalid workout or page URLs
* Five-workout limit for Today's Plan
* Data persistence using LocalStorage
* Responsive mobile navigation menu
* Live Plan and Saved counters

## Project Structure

```text
FitLog

├── app
│   ├── my-plan
│   │   └── page.js
│   ├── workout
│   │   └── [id]
│   │       └── page.js
│   ├── globals.css
│   ├── layout.js
│   ├── not-found.js
│   └── page.js
│
├── components
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── PlanButtons.jsx
│
└── public
    └── banner.png
```

## Main Pages

* `/` — Workout Library
* `/my-plan` — Today's Plan and Saved Workouts
* `/workout/[id]` — Workout Details
* Invalid routes — Custom 404 Page

## API

FitLog uses the following REST API:

```text
https://api.abcz.workers.dev/api/fitlog
```

Workout details are loaded using:

```text
https://api.abcz.workers.dev/api/fitlog/{id}
```

## Getting Started

First, install the project dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Open the application in your browser at:

```text
http://localhost:3000
```

## Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Data Persistence

FitLog uses browser LocalStorage to keep:

* Today's Plan
* Saved Workouts

This allows workout selections to remain available after refreshing the page.

## Deployment

The project can be deployed using platforms such as Vercel, Netlify, or Cloudflare Pages.

## Author

Developed as a FitLog workout library project using Next.js, React, and Tailwind CSS.

# FitLog

FitLog is a dark, simple, and responsive workout library application. Users can browse workouts, view workout details, add exercises to today's plan, save workouts for later, and track their daily workout progress.

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- REST API
- LocalStorage
- Git & GitHub

## Features

- Browse 12 different workouts from the workout library
- View detailed information for each workout
- Add workouts to Today's Plan
- Save workouts for later
- Mark planned workouts as Done
- Remove workouts from Today's Plan or Saved
- Track total exercises, minutes, and calories
- Sort workouts by Duration, Calories, or Rating
- Responsive design for mobile, tablet, and desktop
- Loading animation while workouts are being fetched
- Toast notifications for user actions
- Custom 404 page for invalid workout or page URLs
- Five-workout limit for Today's Plan
- Data persistence using LocalStorage

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
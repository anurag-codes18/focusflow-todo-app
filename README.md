# FocusFlow — Modern React Task Management App

FocusFlow is a modern, responsive task management application built with **React**. It is designed to help users organize their daily tasks, track productivity, manage priorities, and stay focused.

The project is being developed as a **learning + portfolio project**, with the goal of understanding how a real-world React application is structured and developed.

The current version uses **localStorage** for authentication and task persistence. A backend/API can be added in a future version.

---

## 🚀 Project Overview

FocusFlow is more than a simple Todo application.

The goal is to develop a complete task-management dashboard with:

- User registration and login
- Personal task management
- Categories
- Priorities
- Due dates
- Reminders
- Search
- Filters
- Calendar
- Task statistics
- Drag-and-drop
- Dark mode
- Browser notifications
- Responsive design
- User profile
- Logout
- Persistent data

The application is being developed step-by-step while learning React concepts and real-world frontend development.

---

# ✨ Features

## 🔐 Authentication

FocusFlow currently provides demo authentication using browser `localStorage`.

### Registration

Users can create an account using:

- Full Name
- Email
- Password

Registered users are stored locally.

Example:

```text
focusflow-users
```

Each registered user contains information such as:

```js
{
  id,
  name,
  email,
  password,
  createdAt
}
```

### Login

Users must provide:

- Name
- Email
- Password

The application checks the registered users stored in localStorage.

If the credentials are correct, the user is logged in.

### Logout

Users can log out from the profile dropdown.

The current login session is removed from localStorage.

> ⚠️ This authentication system is only for learning/demo purposes. Passwords are currently stored in localStorage and should never be handled this way in a production application.

---

# 👤 User Profile

The top navigation contains a user avatar.

Clicking the avatar opens a profile dropdown containing:

- User name
- User email
- User avatar
- Logout button

The profile is responsive and works on desktop and mobile screens.

---

# 📝 Task Management

Users can manage their tasks from the dashboard.

### Add Task

Users can create a task with:

- Title
- Description
- Category
- Priority
- Due date
- Reminder

Example:

```text
Title: Complete React Project
Description: Finish the FocusFlow dashboard
Category: Study
Priority: High
Due Date: 2026-09-30
Reminder: 2026-09-30 09:00
```

### Edit Task

Existing tasks can be edited.

### Delete Task

Users can delete tasks they no longer need.

### Complete Task

Users can mark tasks as completed.

The application records:

```text
Created At
Completed At
```

This allows the application to display when a task was created and completed.

---

# 🔎 Search

FocusFlow provides task searching.

Users can search using:

- Task title
- Task description

Search results can be displayed across different task dates.

Example:

```text
Search: React
```

The application can find:

```text
Learn React
React Project
React Interview Questions
React Hooks
```

regardless of which calendar date they belong to.

---

# 🎯 Filters

Tasks can be filtered using different properties.

### Status

```text
All
Completed
Pending
```

### Category

```text
All
Personal
Work
Study
Health
```

### Priority

```text
All
Low
Medium
High
```

The filters can be combined with search.

---

# 📅 Calendar

FocusFlow includes a horizontal calendar/date selector.

The calendar displays multiple dates around the current date.

Users can select a date and view tasks assigned to that date.

Example:

```text
← Previous dates

Mon 22
Tue 23
Wed 24
Thu 25
Fri 26
Sat 27
Sun 28

→ Future dates
```

The calendar is horizontally scrollable so users can move toward future dates.

---

# ⏰ Due Dates

Tasks can have a due date.

Example:

```text
Complete React Project
Due: September 30, 2026
```

The dashboard can use due dates to organize tasks by day.

---

# 🔔 Reminders & Notifications

FocusFlow is designed to support task reminders.

Users can assign a reminder time to a task.

Example:

```text
Task:
Study React

Reminder:
8:00 PM
```

The application can request browser notification permission and notify the user when a reminder is due.

Browser notification support depends on the browser and user permission.

---

# ⭐ Priorities

Every task can have a priority.

Available priorities:

```text
Low
Medium
High
```

Priorities help users identify important tasks quickly.

---

# 🗂️ Categories

Tasks can be organized into categories.

Current categories:

```text
Personal
Work
Study
Health
```

Additional categories can be added in future versions.

---

# 📊 Task Statistics

The dashboard provides productivity statistics.

Possible statistics include:

```text
Total Tasks
Completed
Pending
High Priority
```

Example:

```text
Total Tasks       20
Completed         12
Pending            8
High Priority      5
```

These statistics update automatically when task data changes.

---

# 🖱️ Drag and Drop

FocusFlow supports drag-and-drop task organization.

Users can drag task cards to reorder their tasks.

This feature is designed to make task management more interactive.

Future versions can store the custom task order permanently.

---

# 🌙 Dark Mode

FocusFlow supports light and dark themes.

Users can switch between:

```text
☀ Light
🌙 Dark
```

The selected theme is stored in localStorage so the preference can remain after refreshing the page.

Example storage key:

```js
focusflow-theme
```

---

# 📱 Responsive Design

FocusFlow is designed to work across different screen sizes.

Supported layouts include:

- Desktop
- Laptop
- Tablet
- Mobile

The UI adapts depending on the screen width.

Mobile improvements include:

- Responsive dashboard
- Mobile topbar
- Profile dropdown
- Responsive task cards
- Horizontal calendar
- Hidden desktop sidebar
- Mobile-friendly controls

---

# 💾 Data Storage

The current application uses browser `localStorage`.

### User Storage

```text
focusflow-users
```

Stores registered users.

### Current Session

```text
focusflow-user
```

Stores the currently logged-in user.

### Theme

```text
focusflow-theme
```

Stores the selected theme.

### Tasks

Tasks are stored separately for each user.

Conceptually:

```text
User
  ↓
Email
  ↓
User's Tasks
```

This allows different users using the same browser to have separate task data.

---

# 🏗️ Project Architecture

The application is divided into reusable React components.

Example structure:

```text
FocusFlow/
│
├── public/
│
├── src/
│   │
│   ├── common/
│   │   └── Icons.jsx
│   │
│   ├── components/
│   │   │
│   │   ├── Calendar/
│   │   │   └── Calendar.jsx
│   │   │
│   │   ├── Deshboard/
│   │   │   ├── WelcomeSection.jsx
│   │   │   └── StatsGrid.jsx
│   │   │
│   │   ├── Layouts/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   └── Tasks/
│   │       ├── TaskCard.jsx
│   │       ├── TaskFilter.jsx
│   │       ├── TaskModel.jsx
│   │       └── EmptyState.jsx
│   │
│   ├── data/
│   │   └── constants.js
│   │
│   ├── Pages/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── utalis/
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚛️ React Concepts Used

This project is also being used to practice important React concepts.

### Components

The UI is divided into reusable components.

Examples:

```jsx
<TaskCard />
<Calendar />
<TaskFilter />
<Topbar />
<Sidebar />
```

### Props

Components receive data and functions through props.

Example:

```jsx
<TaskCard
  task={task}
  onToggle={toggleTask}
  onDelete={deleteTask}
/>
```

### State

React state is used for dynamic application data.

Examples:

```js
useState()
```

State is used for:

- Tasks
- User
- Theme
- Search
- Filters
- Selected date
- Modal
- Notifications

### Effects

`useEffect()` is used for operations that need to happen when state changes.

Examples:

- Saving tasks
- Loading preferences
- Notifications
- Theme handling

### Memoization

`useMemo()` can be used for derived data such as filtered tasks and statistics.

Example:

```js
const visibleTasks = useMemo(() => {
  // filtering logic
}, [
  tasks,
  search,
  status,
  category,
  priority,
  selectedDate
]);
```

### Event Handling

The application handles events such as:

- Click
- Submit
- Input change
- Drag
- Drop

### Conditional Rendering

React conditional rendering is used for:

- Login/Register
- Empty states
- Modals
- Profile dropdown
- Completed tasks
- Notification states

---

# 🧩 Task Data Model

Each task follows a structure similar to:

```js
{
  id: "unique-id",
  title: "Complete React Project",
  description: "Finish FocusFlow dashboard",
  category: "Study",
  priority: "High",
  dueDate: "2026-09-30",
  reminderAt: "2026-09-30T09:00",
  completed: false,
  createdAt: 1727683200000,
  completedAt: null,
  notified: false
}
```

---

# 🔄 Application Flow

The basic application flow is:

```text
User opens FocusFlow
        ↓
Check localStorage
        ↓
Is user logged in?
      /   \
    Yes    No
     ↓      ↓
Dashboard  Login
            ↓
        Register/Login
            ↓
        Validate user
            ↓
       Save session
            ↓
        Dashboard
```

Task flow:

```text
Dashboard
    ↓
Create Task
    ↓
Task Modal
    ↓
Save Task
    ↓
React State
    ↓
localStorage
    ↓
Task List
```

---

# 🎨 UI Design

FocusFlow uses a modern dashboard-style interface.

Main UI areas:

```text
┌───────────────────────────────────────────────┐
│ FocusFlow       🔔  🌙  👤                   │
├──────────────┬────────────────────────────────┤
│              │ Welcome Back                  │
│   Sidebar    │                               │
│              │ Statistics                    │
│ Dashboard    │                               │
│ Tasks        │ Calendar                      │
│ Settings     │                               │
│              │ Task Filters                  │
│              │                               │
│              │ Task Cards                    │
└──────────────┴────────────────────────────────┘
```

The interface is designed to remain clean and easy to use while providing many features.

---

# 🛠️ Technologies Used

## Frontend

- React
- JavaScript
- HTML
- CSS

## Development

- Vite
- Bun / npm
- Git
- GitHub

## Browser APIs

- localStorage
- Notifications API

---

# 📦 Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd FocusFlow
```

Install dependencies:

```bash
npm install
```

or, if using Bun:

```bash
bun install
```

Start the development server:

```bash
npm run dev
```

or:

```bash
bun run dev
```

Open the application in your browser.

Usually:

```text
http://localhost:5173
```

---

# 🌐 Share the App on a Local Network

The application can also be shared temporarily with another device on the same Wi-Fi network.

Run:

```bash
npm run dev -- --host
```

Vite will provide a network URL similar to:

```text
http://192.168.x.x:5173
```

Another device connected to the same Wi-Fi can open that URL.

> This is only for local testing. It does not make the application publicly available on the internet.

---

# 🧪 Development Roadmap

The project is being developed in multiple stages.

## Phase 1 — Project Setup

- [x] Create React project
- [x] Configure Vite
- [x] Setup project structure
- [x] Setup Git
- [x] Create GitHub repository
- [x] Create README

---

## Phase 2 — Authentication

- [x] Registration page
- [x] Login page
- [x] Name validation
- [x] Email validation
- [x] Password validation
- [x] localStorage users
- [x] Login session
- [x] Logout
- [x] Profile dropdown

---

## Phase 3 — Task Management

- [x] Add task
- [x] Edit task
- [x] Delete task
- [x] Complete task
- [x] Task description
- [x] Task categories
- [x] Task priorities
- [x] Due dates
- [x] Created timestamp
- [x] Completed timestamp

---

## Phase 4 — Task Discovery

- [x] Search
- [x] Status filter
- [x] Category filter
- [x] Priority filter
- [x] Calendar filtering
- [x] Search across dates

---

## Phase 5 — Productivity

- [x] Task statistics
- [x] Calendar
- [x] Drag and drop
- [x] Dark mode
- [x] Browser notifications
- [ ] Reminder improvements
- [ ] Better productivity analytics

---

## Phase 6 — Responsive Design

- [x] Desktop layout
- [x] Tablet layout
- [x] Mobile layout
- [x] Responsive task cards
- [x] Responsive calendar
- [x] Mobile profile menu
- [x] Mobile navigation improvements

---

# 🚧 Future Development

The current version is intentionally frontend-focused.

The next major stage will be adding a real backend.

## Backend

Future versions can use:

```text
React
   ↓
REST API
   ↓
Backend
   ↓
Database
```

Possible backend technologies:

- Node.js
- Express.js
- MongoDB
- PostgreSQL

---

# 🔐 Future Authentication

The current localStorage authentication will eventually be replaced with proper backend authentication.

Future system:

```text
React
  ↓
Login API
  ↓
Backend
  ↓
Database
  ↓
Authentication
```

Possible improvements:

- Password hashing
- JWT authentication
- Refresh tokens
- Protected routes
- Session management
- Password reset
- Email verification

---

# ☁️ Future Database

Instead of storing tasks in localStorage:

```text
localStorage
```

the application can eventually use:

```text
React
  ↓
API
  ↓
Database
```

This would allow users to access their tasks from multiple devices.

For example:

```text
Laptop
   ↓
   ├──────┐
          ↓
      Backend
          ↓
       Database
          ↑
          │
   ┌──────┘
   ↓
Mobile Phone
```

---

# 👥 Multi-Device Support

With a backend and database, users will eventually be able to:

1. Register on their laptop
2. Log in from their phone
3. View the same tasks
4. Add tasks from either device
5. Update tasks
6. Synchronize changes

This is not possible with the current localStorage-only architecture because localStorage belongs to the individual browser/device.

---

# 🔔 Advanced Notifications

Future versions can implement:

- Scheduled reminders
- Browser notifications
- Notification history
- Daily reminders
- Overdue task notifications
- Recurring reminders

A backend can later be used for server-side scheduled notifications.

---

# 🔁 Recurring Tasks

Future task types:

```text
Every day
Every week
Every month
Custom
```

Example:

```text
Workout
Every Monday, Wednesday and Friday
```

---

# 📈 Advanced Analytics

Future analytics can include:

- Daily completed tasks
- Weekly productivity
- Monthly productivity
- Completion percentage
- Category distribution
- Priority distribution
- Task completion trends
- Productivity charts

---

# 🔎 Advanced Search

Future search functionality can support:

```text
Title
Description
Category
Priority
Status
Due date
```

Example:

```text
high priority study tasks
```

---

# 🧑‍💼 Admin Panel

A future version can include an admin dashboard.

Possible admin features:

- View registered users
- View user activity
- Manage users
- Disable users
- View task statistics
- Application analytics
- Manage categories
- Manage system settings

The admin system should use proper backend authorization rather than frontend-only checks.

---

# 🧪 Testing

Future versions can include automated testing.

Possible tools:

- Vitest
- React Testing Library
- Playwright

Tests can cover:

```text
Authentication
Task creation
Task editing
Task deletion
Task completion
Search
Filters
Calendar
Notifications
```

---

# 🚀 Deployment

The application can eventually be deployed using platforms such as:

- Vercel
- Netlify
- GitHub Pages

A future full-stack architecture could use:

```text
Frontend
    ↓
Vercel / Netlify

Backend
    ↓
Node.js / Express

Database
    ↓
MongoDB / PostgreSQL
```

---

# 🔒 Security Considerations

The current application is a learning project.

The localStorage authentication system is **not suitable for production**.

Production improvements should include:

- Password hashing
- HTTPS
- Secure authentication
- Server-side validation
- Authorization
- Rate limiting
- Secure cookies/tokens
- Database security
- Input sanitization
- API security

Never store real production passwords directly in localStorage.

---

# 📚 Learning Goals

This project is being developed to understand how a real React application works.

Main learning goals:

- React components
- JSX
- Props
- State
- Hooks
- Forms
- Event handling
- Conditional rendering
- Lists and keys
- State management
- Lifting state
- Local storage
- Component architecture
- Reusable components
- Responsive CSS
- Authentication concepts
- API integration
- Backend integration
- Database integration
- Git and GitHub
- Deployment

---

# 📌 Current Status

**Project:** FocusFlow

**Type:** React Task Management Application

**Status:** 🚧 In Development

**Frontend:** React

**Storage:** localStorage

**Authentication:** Demo localStorage authentication

**Backend:** Not implemented yet

**Database:** Not implemented yet

**Deployment:** Local development

---

# 🗺️ Long-Term Architecture

The final goal is to evolve FocusFlow from a frontend-only application into a full-stack application.

### Current

```text
React
  ↓
localStorage
```

### Future

```text
                    ┌──────────────┐
                    │    React     │
                    │   Frontend   │
                    └──────┬───────┘
                           │
                           ↓
                    ┌──────────────┐
                    │     API      │
                    │   Backend    │
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              ↓                         ↓
       ┌──────────────┐         ┌──────────────┐
       │ Authentication│         │   Database   │
       │     System    │         │              │
       └──────────────┘         └──────────────┘
```

---

# 🤝 Contributing

This project is currently being developed as a personal learning and portfolio project.

Suggestions, improvements and feedback are welcome.

---

# 📄 License

License information can be added later when the project requirements are finalized.

---

# 👨‍💻 Author

**Anurag Mishra**

BCA Graduate  
Aspiring Full Stack Developer

---

# ⭐ Project Goal

The ultimate goal of FocusFlow is to build a **production-style full-stack task management application** while learning how modern web applications are designed, developed, tested, deployed and maintained.

The project will gradually evolve from:

```text
Simple Todo
     ↓
React Todo
     ↓
Advanced Task Manager
     ↓
Full-Stack Application
     ↓
Production-Style Application

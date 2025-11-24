# AI-Ticket-Assistant 

 # Overview

=> AI Ticket Assistant is a fully-featured, AI-driven ticket management system built using the MERN stack.
   Designed with a modern, scalable architecture, it enhances traditional support workflows through automated ticket classification, AI-generated helpful notes, skill-based moderator assignment, and role-specific dashboards.

=> This project integrates Google Gemini, Inngest, and Mailtrap, offering a seamless and intelligent support experience—ideal for teams looking to reduce response time and increase operational clarity.


## Key Features

-  **Role-based Authentication**

   - Secure JWT auth
   - Role-based access: User, Moderator, Admin
   - Protected routes (Frontend + Backend)

-  **Smart Ticket Lifecycle**

   - Users create tickets → Status defaults to TODO
   - Gemini AI analyzes text → Generates:
      - helpfulNotes
      - relatedSkills
      - priority
   - Inngest assigns ticket to matching moderator
   - Moderator updates → Ticket reassigns to Admin on IN_PROGRESS
   - Admin closes with DONE

-  **AI Integration (Gemini)**

   - Gemini LLM performs:
      - Deep analysis of ticket description
      - Automatic skill extraction
      - Priority inference
      - Helpful notes generation
      - Issue classification
   - This elevates ticket clarity and reduces back-and-forth for support teams.

-  **Event-Driven Automation (Inngest)**

   - Handled automatically:
      - ticket/created → Analyze + Assign
      - ticket/updated → Reassign to Admin
      - Email notification pipelines
      - Background processing & retries

-  **Email Notifications**

   - Triggered automatically:
      - Moderator receives assigned ticket notification
      - Email sent from the user who created the ticket
      - HTML templates included


## User Dashboards

-  **User Dashboard**

   - Create tickets
   - View status & assigned moderator
   - Read AI-generated helpfulNotes

-  **Moderator Dashboard**

   - See assigned tickets
   - Update status (TODO → IN_PROGRESS → DONE)
   - Access AI insights

-  **Admin Dashboard**

   - View all users
   - Edit roles & skills
   - Manage tickets & assignments
   - Analytics ready


## Modern UI/UX

-  **Built with:**

   - React + TailwindCSS
   - Smooth Framer Motion animations
   - Lottie animations (empty states, success states)
   - Fully responsive design
   - Clean spacing and layout system
   - Custom gradients and card components
   - Futuristic dark UI theme


## Tech Stack

- **Frontend**: React (Vite), React Router DOM, Tailwind CSS, Framer Motion, Axios, Lottie React
- **Backend**: Node.js + Express, MongoDB + Mongoose, JWT Authentication, Inngest (Background automation), Gemini API, Mailtrap + Nodemailer
- **Database**: MongoDB
- **Authentication**: JWT
- **Background Jobs**: Inngest
- **AI Integration**: Google Gemini API
- **Email**: Nodemailer with Mailtrap
- **Development**: Nodemon for hot reloading


## Prerequisites

- Node.js
- MongoDB
- Google Gemini API key
- Mailtrap account (for email testing)


## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/ai-ticket-assistant.git
   cd ai-ticket-assistant
   ```

2. **Install frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Install backend**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Environment Setup**
   Create a `.env` file for both frontend and backend:

      **Backend `.env` example:**

      ```env
      # MongoDB
      MONGO_URI=your_mongodb_uri

      # JWT
      JWT_SECRET=your_jwt_secret

      # Email (Mailtrap)
      MAILTRAP_SMTP_HOST=your_mailtrap_host
      MAILTRAP_SMTP_PORT=your_mailtrap_port
      MAILTRAP_SMTP_USER=your_mailtrap_user
      MAILTRAP_SMTP_PASS=your_mailtrap_password

      # AI (Gemini)
      GEMINI_API_KEY=your_gemini_api_key

      # Application
      APP_URL=http://localhost:3000
      ```

      **Frontend `.env` example:**

      ```env
      # Application
      VITE_SERVER_URL=http://localhost:3000/api
      ```


## Running the Application

1. **Start the main server**

   ```bash
   npm run dev
   ```

2. **Start the Inngest dev server**
   ```bash
   npm run inngest-dev
   ```

3. **Start the Application**
   ```bash
   npm run dev
   ```


## Ticket Processing Flow

1. **Ticket Creation**

   - User submits a ticket with title and description
   - System creates initial ticket record

2. **AI Processing**

   - Inngest triggers `on-ticket-created` event
   - AI analyzes ticket content
   - Generates:
     - Required skills
     - Priority level
     - Helpful notes
     - Ticket type

3. **Moderator Assignment**

   - System searches for moderators with matching skills
   - Uses regex-based skill matching
   - Falls back to admin if no match found
   - Updates ticket with assignment

4. **Notification**

   - Sends email to assigned moderator
   - Includes ticket details and AI-generated notes


##  Dependencies

- `@inngest/agent-kit`: ^0.7.3
- `bcrypt`: ^5.1.1
- `cors`: ^2.8.5
- `dotenv`: ^16.5.0
- `express`: ^5.1.0
- `inngest`: ^3.35.0
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.13.2
- `nodemailer`: ^6.10.1


## Summary

- AI Ticket Assistant is a modern, AI-powered helpdesk platform built with production-ready architecture, event-driven automation, and intelligent triage workflows.
  It combines clean UI, smart automation, and scalable engineering delivering a next-gen support experience.

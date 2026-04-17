# Ottobon Box Cricket Tournament Management

A full-stack web application designed for managing tournament registrations, team formation, and knockout match brackets.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, Supabase Client
- **Database:** Supabase (PostgreSQL)

## Getting Started

### 1. Prerequisites
- Node.js (v16+)
- A Supabase account

### 2. Database Setup
1. Go to your Supabase Project.
2. Open the **SQL Editor**.
3. Copy the contents of `DATABASE.md` and run them.
4. Create two public buckets in **Storage**: `student-ids` and `marks-memos`.

### 3. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Create a `.env` file:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_random_secret
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```

### 4. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

## Folder Structure
- `/frontend`: React application (front-end)
- `/backend`: Express.js API (back-end)
- `DATABASE.md`: SQL schema for tables

# Blog Storage Setup Guide

## Option 1: Vercel Redis (Recommended - Easiest if deploying on Vercel)

### Setup Steps:

1. **Install Redis Client** (Already done)
   ```bash
   npm install redis
   ```

2. **Create Vercel Redis Database:**
   - Go to your Vercel project dashboard
   - Navigate to "Storage" → "Create Database"
   - Select "Redis" 
   - Follow the setup wizard
   - It will automatically add environment variables to your project

3. **Environment Variable** (Auto-configured by Vercel):
   - `REDIS_URL` - Redis connection URL (automatically set by Vercel)

4. **Done!** The code is already configured to use Redis.

### Free Tier:
- Varies by Vercel plan
- Generous free tier for most blogs
- Perfect for production use!

---

## Option 2: Supabase (PostgreSQL - More features)

### Setup Steps:

1. **Create Supabase Account:**
   - Go to https://supabase.com
   - Sign up for free
   - Create a new project

2. **Install Supabase Client:**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Create Table:**
   Run this SQL in Supabase SQL Editor:
   ```sql
   CREATE TABLE blog_posts (
     id TEXT PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     excerpt TEXT NOT NULL,
     author TEXT NOT NULL,
     published_at TIMESTAMP WITH TIME ZONE NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
     featured_image TEXT,
     tags TEXT[] DEFAULT '{}'
   );
   ```

4. **Get API Keys:**
   - Go to Project Settings → API
   - Copy "Project URL" and "anon public" key

5. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

### Free Tier:
- 500 MB database
- 2 GB bandwidth
- Great for larger blogs!

---

## Option 3: MongoDB Atlas (MongoDB)

### Setup Steps:

1. **Create MongoDB Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Create a free cluster (M0)

2. **Install MongoDB Driver:**
   ```bash
   npm install mongodb
   ```

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy connection string

4. **Add Environment Variable:**
   ```
   MONGODB_URI=your-connection-string
   ```

### Free Tier:
- 512 MB storage
- Shared cluster
- Good for flexibility!

---

## Current Setup

The code is currently configured to:
1. **Try Redis first** (if `REDIS_URL` is configured)
2. **Fallback to file system** (for local development)
3. **Use in-memory storage** (if both fail - serverless environments)

This ensures it works in all environments!

---

## Recommendation

**For your use case, I recommend Vercel Redis** because:
- ✅ Easiest setup (1 click in Vercel dashboard)
- ✅ Free tier is generous for blogs
- ✅ No database schema to manage
- ✅ Automatically configured with `REDIS_URL`
- ✅ Fast Redis-based storage
- ✅ Uses standard Redis client (`redis` package)

If you're NOT using Vercel, use **Supabase** - it's the easiest PostgreSQL option.


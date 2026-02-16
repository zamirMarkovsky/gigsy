# Deploying to Vercel - Quick Guide

## Prerequisites
- Vercel account connected to your GitHub repo
- MongoDB Atlas database (already set up)

## Step 1: Set Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** > **Environment Variables**
2. Add these three variables (for Production, Preview, and Development):

```
VITE_LOGIN_PASSWORD=your_login_password
VITE_GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

**Important:** Make sure to URL-encode the MongoDB URI password (the `%3A` is the encoded `:`)

## Step 2: Deploy

### Option A: Auto-deploy (if connected to GitHub)
1. Push your code to GitHub
2. Vercel will automatically deploy

### Option B: Manual deploy
```bash
npm install -g vercel
vercel --prod
```

## Step 3: Verify

After deployment:
1. Visit your Vercel URL
2. You should see the login page
3. Enter the password you set in `VITE_LOGIN_PASSWORD`
4. Events should load from MongoDB

## Troubleshooting

**Login page doesn't appear:**
- Clear browser cache
- Check browser console for errors

**No events loading:**
- Check Vercel deployment logs
- Verify `MONGODB_URI` is set correctly
- Ensure MongoDB IP whitelist allows Vercel (0.0.0.0/0 for all IPs)

**API errors:**
- Check MongoDB Atlas: Network Access > Add IP Address > Allow Access from Anywhere (0.0.0.0/0)

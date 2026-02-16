# Environment Variables for Production

## Required Variables

When deploying to production (Vercel, Netlify, etc.), you MUST set these environment variables in your hosting platform:

### Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following:

```
VITE_GEMINI_API_KEY=your_gemini_key
VITE_LOGIN_PASSWORD=your_login_password
MONGODB_URI=your_mongodb_connection_string
```

**CRITICAL:** All three variables are required:
- `VITE_LOGIN_PASSWORD` - For authentication
- `VITE_GEMINI_API_KEY` - For AI features
- `MONGODB_URI` - For database connection (used by serverless functions)

**IMPORTANT:** 
- The `.env` file is only for local development
- It is NOT deployed to production (it's in `.gitignore`)
- You must manually set environment variables in your hosting platform
- After adding variables, **redeploy** your site

### Testing Locally
To clear cached login:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete the `gigsy_auth` key
4. Refresh the page

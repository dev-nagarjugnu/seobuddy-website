# Admin Panel Troubleshooting Guide

## Issues Fixed

### 1. Notifications API Errors
- **Problem**: "Failed to fetch notifications: Internal server error"
- **Root Cause**: Database connection issues and missing error handling
- **Solution**: Added comprehensive error handling and database connection testing

### 2. Missing Environment Variables
- **Problem**: Missing `NEXTAUTH_URL` and other required environment variables
- **Solution**: Created setup script and environment validation

### 3. Pusher Connection Errors
- **Problem**: Pusher client initialization failures
- **Solution**: Added graceful error handling for missing Pusher configuration

## Quick Fix Steps

### Step 1: Environment Setup
```bash
# Run the setup script to check environment
node setup-env.js

# Add missing NEXTAUTH_URL to your .env file
NEXTAUTH_URL="http://localhost:3000"
```

### Step 2: Database Setup
```bash
# Push database schema (if you have permission issues with generate)
npx prisma db push

# Create admin users
npx prisma db seed
```

### Step 3: Test Database Connection
```bash
# Test the health endpoint
curl http://localhost:3000/api/health
```

## Admin Login Credentials

- **Admin**: bob@seobuddy.io / password123
- **User**: alice@seobuddy.io / password123

## Error Resolution

### If you still see notification errors:

1. **Check Database Connection**:
   - Visit `/api/health` in your browser
   - Should return `{"status":"healthy","database":"connected"}`

2. **Check Environment Variables**:
   - Ensure `DATABASE_URL` is correct
   - Ensure `NEXTAUTH_SECRET` is set
   - Ensure `NEXTAUTH_URL` is set to your development URL

3. **Database Schema Issues**:
   - Run `npx prisma db push` to sync schema
   - Run `npx prisma db seed` to create test users

4. **Pusher Issues** (Optional):
   - Pusher is optional for real-time notifications
   - If not configured, notifications will still work without real-time updates

## API Endpoints Fixed

- `/api/notifications` - Now handles database errors gracefully
- `/api/users` - Added database connection testing
- `/api/health` - New endpoint for database health checks

## Components Fixed

- `AdminHeader.tsx` - Better error handling for notifications
- `AdminUsersPage.tsx` - Improved error display

## Common Error Messages and Solutions

| Error | Solution |
|-------|----------|
| "Database connection error" | Check DATABASE_URL in .env |
| "Authentication required" | Ensure you're logged in as admin |
| "Access Denied" | Ensure user has ADMIN role |
| "Pusher initialization failed" | Optional - can be ignored |

## Testing the Fix

1. Start your development server: `npm run dev`
2. Login as admin: bob@seobuddy.io / password123
3. Navigate to Admin Panel → Users
4. Check that notifications load without errors
5. Test the notification bell in the header

## Still Having Issues?

If you're still experiencing problems:

1. Check the browser console for specific error messages
2. Check the server logs for database connection errors
3. Verify your database is running and accessible
4. Ensure all environment variables are properly set

## Environment Variables Checklist

Required:
- [ ] `DATABASE_URL`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL`

Optional:
- [ ] `NEXT_PUBLIC_PUSHER_APP_KEY`
- [ ] `NEXT_PUBLIC_PUSHER_APP_CLUSTER`
- [ ] `NEXT_PUBLIC_TAWK_TO_WIDGET_ID`

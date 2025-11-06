# Deployment Troubleshooting Guide

## Common Issues After Deploying to Render

### 1. 500 Internal Server Error

**Possible Causes:**
- Missing `JWT_SECRET` environment variable
- Missing or incorrect `MONGO_URL` environment variable
- Database connection failure

**Solutions:**

#### Check Environment Variables in Render:
1. Go to your backend service on Render
2. Click on "Environment" tab
3. Verify these variables are set:
   - `MONGO_URL` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - A strong random string (e.g., use a password generator)
   - `NODE_ENV` - Set to `production`
   - `PORT` - Can be left blank (Render assigns automatically)

#### Test Backend Health:
Visit: `https://your-backend-url.onrender.com/health`

If this returns `{"status":"OK"}`, your backend is running correctly.

### 2. 400 Bad Request Error

**Possible Causes:**
- Missing required fields in request
- Invalid data format
- User already exists (for signup)

**Solutions:**
- Check browser console for specific error messages
- Verify all form fields are filled correctly
- Try with a different email for signup

### 3. Database Connection Issues

**Check MongoDB Atlas:**
1. Ensure your MongoDB Atlas cluster is running
2. Check Network Access - Add `0.0.0.0/0` to allow all IPs (or Render's IPs)
3. Verify database user credentials
4. Check connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

### 4. Frontend Can't Connect to Backend

**Check:**
1. Frontend environment variable `REACT_APP_API_URL` is set to your backend URL
2. Backend URL includes `https://` (not `http://`)
3. No trailing slash in the backend URL
4. CORS is enabled in backend (already done)

**Example:**
```
REACT_APP_API_URL=https://personal-fin-tracker-v0xb.onrender.com
```

### 5. Check Render Logs

1. Go to your backend service on Render
2. Click on "Logs" tab
3. Look for error messages
4. Common errors you might see:
   - "JWT_SECRET is not set" → Add JWT_SECRET environment variable
   - "MONGO_URL is not set" → Add MONGO_URL environment variable
   - "DB Connection Error" → Check MongoDB Atlas connection string

## Quick Health Check Steps

1. **Backend Health**: Visit `https://your-backend.onrender.com/health`
   - Should return: `{"status":"OK","message":"Server is running",...}`

2. **Test API Endpoint**: Try `POST https://your-backend.onrender.com/api/auth/register`
   - Use Postman or curl to test
   - Should return token if successful

3. **Check Frontend Build**: 
   - Ensure `REACT_APP_API_URL` is set correctly
   - Rebuild frontend after changing environment variables

## Environment Variables Checklist

### Backend (Render Web Service):
- [ ] `MONGO_URL` - MongoDB connection string
- [ ] `JWT_SECRET` - Random secret string
- [ ] `NODE_ENV` - `production`
- [ ] `PORT` - (optional, Render assigns)

### Frontend (Render Static Site):
- [ ] `REACT_APP_API_URL` - Your backend URL (e.g., `https://your-backend.onrender.com`)

## Still Having Issues?

1. Check Render service logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas cluster is accessible
4. Test backend endpoints directly using Postman or curl
5. Check browser console for frontend errors


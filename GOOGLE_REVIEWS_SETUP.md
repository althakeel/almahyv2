# Google Maps Reviews Setup

Your website now fetches real Google Maps reviews dynamically! Here's how to set it up:

## Quick Setup Steps

### 1. Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Places API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### 2. Add API Key to Your Project

1. Create a file named `.env.local` in your project root:
   ```bash
   GOOGLE_PLACES_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```

2. Replace `YOUR_ACTUAL_API_KEY_HERE` with your actual API key

### 3. Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## How It Works

- **API Route**: `/api/google-reviews` fetches reviews from Google Places API
- **Component**: `GoogleReviews.tsx` displays the reviews on your homepage
- **Caching**: Reviews are cached for 1 hour to save API quota
- **Fallback**: If API fails, fallback reviews are shown automatically
- **Features**:
  - Real-time Google rating and review count
  - Up to 6 most recent reviews
  - Reviewer profile photos
  - Star ratings and timestamps
  - Direct link to all reviews on Google Maps

## API Costs

- Google Places API has a **free tier**: 
  - First $200/month is free (covers ~28,000 requests)
  - Each review fetch = 1 request
  - With 1-hour caching, you'll use very few requests

## Place ID

Your business Place ID is already configured:
```
ChIJA7raX0_0Xz4RgYHZ2Wl_Bzc
```

This was extracted from your Google Maps URL.

## Troubleshooting

If reviews don't show:
1. Check `.env.local` file exists with correct API key
2. Verify Places API is enabled in Google Cloud Console
3. Check browser console for errors
4. Restart development server after adding `.env.local`

## Security

- API key is stored in `.env.local` (never committed to git)
- API calls are made server-side only (API key is never exposed to browser)
- Consider adding API key restrictions in Google Cloud Console

## Optional: API Key Restrictions

For production, restrict your API key:
1. In Google Cloud Console > Credentials
2. Edit your API key
3. Under "Application restrictions": Select "HTTP referrers"
4. Add your domain: `alamhy.com`, `*.alamhy.com`
5. Under "API restrictions": Select "Places API"

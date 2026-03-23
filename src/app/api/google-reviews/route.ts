import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your Google Places API key - add this to your .env.local file
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      console.error('Google Places API key is not configured');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Place ID for Almahy Legal Services
    // You can find this by searching on Google Maps or using the Place ID Finder
    const placeId = 'ChIJA7raX0_0Xz4RgYHZ2Wl_Bzc'; // This is extracted from your Google Maps URL
    
    // Fetch place details including reviews
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Places API');
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json(
        { error: `Google API error: ${data.status}` },
        { status: 500 }
      );
    }

    const result = data.result;
    
    // Transform Google reviews to our format
    const reviews = result.reviews?.slice(0, 6).map((review: any, index: number) => ({
      id: index + 1,
      name: review.author_name,
      rating: review.rating,
      date: review.relative_time_description,
      text: review.text,
      avatar: review.author_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
      profilePhotoUrl: review.profile_photo_url
    })) || [];

    return NextResponse.json({
      rating: result.rating || 5.0,
      totalReviews: result.user_ratings_total || 0,
      reviews
    });

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

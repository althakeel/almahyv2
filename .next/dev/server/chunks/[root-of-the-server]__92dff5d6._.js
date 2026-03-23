module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/Archive (15)/src/app/api/google-reviews/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Archive__$28$15$292f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Archive (15)/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET() {
    try {
        // Your Google Places API key - add this to your .env.local file
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            console.error('Google Places API key is not configured');
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Archive__$28$15$292f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'API key not configured'
            }, {
                status: 500
            });
        }
        // Place ID for Almahy Legal Services
        // You can find this by searching on Google Maps or using the Place ID Finder
        const placeId = 'ChIJA7raX0_0Xz4RgYHZ2Wl_Bzc'; // This is extracted from your Google Maps URL
        // Fetch place details including reviews
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`, {
            next: {
                revalidate: 3600
            } // Cache for 1 hour
        });
        if (!response.ok) {
            throw new Error('Failed to fetch from Google Places API');
        }
        const data = await response.json();
        if (data.status !== 'OK') {
            console.error('Google Places API error:', data.status, data.error_message);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Archive__$28$15$292f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Google API error: ${data.status}`
            }, {
                status: 500
            });
        }
        const result = data.result;
        // Transform Google reviews to our format
        const reviews = result.reviews?.slice(0, 6).map((review, index)=>({
                id: index + 1,
                name: review.author_name,
                rating: review.rating,
                date: review.relative_time_description,
                text: review.text,
                avatar: review.author_name.split(' ').map((n)=>n[0]).join('').substring(0, 2).toUpperCase(),
                profilePhotoUrl: review.profile_photo_url
            })) || [];
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Archive__$28$15$292f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            rating: result.rating || 5.0,
            totalReviews: result.user_ratings_total || 0,
            reviews
        });
    } catch (error) {
        console.error('Error fetching Google reviews:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Archive__$28$15$292f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch reviews'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__92dff5d6._.js.map
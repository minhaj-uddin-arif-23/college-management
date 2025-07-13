// app/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/admission',
  '/colleges',
  '/myCollege',
  '/services',
  '/sign-in(.*)',
  '/homeCollege',
  '/api/colleges', // Make /api/colleges public for GET
  '/api/homecollege', // Already added for homeCollege
]);

export default clerkMiddleware(async (auth, request) => {
  // Allow GET requests to /api/colleges and /api/homecollege without authentication
  if (
    request.method === 'GET' &&
    (request.nextUrl.pathname === '/api/colleges' || request.nextUrl.pathname === '/api/homecollege')
  ) {
    return; // Skip authentication
  }

  // Protect all other non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
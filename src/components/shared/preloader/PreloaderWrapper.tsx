// // components/PreloaderWrapper.tsx
// 'use client'; // This directive makes it a Client Component

// import { useState, useEffect } from 'react';
// import { usePathname, useSearchParams } from 'next/navigation'; // Correct import for App Router
// import Preloader from './PreloaderMain';

// interface PreloaderWrapperProps {
//   children: React.ReactNode;
// }

// const PreloaderWrapper: React.FC<PreloaderWrapperProps> = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const pathname = usePathname();
//   // const searchParams = useSearchParams();

//   // You can refine this logic if you want to be more precise about when it shows
//   useEffect(() => {
//     // This effect runs on initial load and whenever pathname or searchParams change
//     // We want to hide the preloader after the initial render of the new page content
//     setLoading(false); // Hide after initial render

//     // You might want to implement a slight delay to avoid flashing if content loads instantly
//     // Example:
//     // const timer = setTimeout(() => {
//     //   setLoading(false);
//     // }, 100);
//     // return () => clearTimeout(timer);

//   }, [pathname, searchParams]); // Dependency array to re-run effect when route changes

//   // There's no direct equivalent of router.events.on('routeChangeStart')
//   // for the App Router's client-side navigation in the same way.
//   // Instead, the preloader will be managed by the parent layout and
//   // the client-side rendering of the new page content.

//   // To *show* the preloader during client-side navigation, we often rely on:
//   // 1. The initial state of `loading` when the component first mounts.
//   // 2. React.Suspense boundaries (see Approach 2).
//   // 3. Manually setting `loading(true)` when you trigger data fetching.

//   // For a general client-side navigation preloader, you'd typically manage
//   // this state where the navigation happens, or rely on Suspense.
//   // Below is a basic example, but a more robust solution might involve:
//   // - Context API to manage global loading state.
//   // - Libraries like NProgress (though less integrated with App Router's data fetching).

//   // A common pattern for showing a loading state during navigation with App Router
//   // is to use `Suspense` at a lower level or manage loading state within the component
//   // that triggers a `next/link` navigation or data fetch.

//   // For now, let's just render the preloader when `loading` is true.
//   // The challenge is when to set `loading` to `true` for general navigation.
//   // A common workaround is to have a small delay or context for it.

//   // Let's adapt this to reflect a simple "initial load" preloader for the entire app.
//   // For *navigation*, we'll often use Suspense or manage the loading state at the point of data fetch.

//   // To trigger the preloader during client-side navigation,
//   // we'd typically manage the `loading` state higher up in the component
//   // that initiates the navigation or data fetch.

//   // For a "global" preloader across client-side navigations in the App Router:
//   // We can't use `router.events`. A common pattern is to show it initially,
//   // and then hide it. For subsequent client-side navigations, `loading.tsx` and `Suspense`
//   // are the intended way.

//   // Let's refine this to be an "initial page load" preloader.
//   // For client-side navigation, App Router encourages `loading.tsx`.

//   // If you want a preloader for *every* client-side navigation that is not handled
//   // by `loading.tsx` (e.g., just for the route change itself before data loads),
//   // it becomes more complex. You might need to:
//   // 1. Create a `LoadingContext` in a client component.
//   // 2. Wrap your `layout.tsx` children with this provider.
//   // 3. When `next/link` is clicked, trigger the loading state via context.
//   // 4. Hide it once the new page component renders.

//   // For simplicity, let's make this PreloaderWrapper primarily handle the *initial*
//   // page load preloader, and then we'll discuss `loading.tsx` for subsequent navigations.

//   const [initialLoadComplete, setInitialLoadComplete] = useState(false);

//   useEffect(() => {
//     // Simulating initial load time
//     const timer = setTimeout(() => {
//       setInitialLoadComplete(true);
//     }, 3000); // Display preloader for at least 500ms on initial load

//     return () => clearTimeout(timer);
//   }, []); // Run only once on mount

//   // If you strictly want a preloader for every client-side navigation,
//   // you might need a more advanced solution involving `NProgress` or a custom
//   // context API.

//   return (
//     <>
//       {!initialLoadComplete && <Preloader />}
//       <div style={{ visibility: initialLoadComplete ? 'visible' : 'hidden' }}>
//         {children}
//       </div>
//     </>
//   );
// };

// export default PreloaderWrapper;
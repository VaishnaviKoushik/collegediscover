import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/layout/Layout";
import { CollegeGridSkeleton } from "./components/ui/LoadingSkeleton";
import { ToastProvider } from "./components/ui/Toast";
import { AuthProvider, useAuth } from "./contexts/auth";
import { CompareProvider } from "./contexts/compare";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const CollegeDetailPage = lazy(() => import("./pages/CollegeDetail"));
const ComparePage = lazy(() => import("./pages/Compare"));
const LoginPage = lazy(() => import("./pages/Login"));
const SavedPage = lazy(() => import("./pages/Saved"));

function PageFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CollegeGridSkeleton count={6} />
    </div>
  );
}

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <CompareProvider>
        <Layout>
          <ToastProvider />
          <Outlet />
        </Layout>
      </CompareProvider>
    </AuthProvider>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const collegeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/college/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CollegeDetailPage />
    </Suspense>
  ),
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ComparePage />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LoginPage />
    </Suspense>
  ),
});

// Protected saved route — redirects to /login if not authenticated
const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/saved",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <SavedPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  collegeDetailRoute,
  compareRoute,
  loginRoute,
  savedRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

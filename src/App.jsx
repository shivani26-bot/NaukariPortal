import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LandingPage from "./pages/landing-page";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listing";
import JobPage from "./pages/job-page";
import PostJob from "./pages/post-job";
import SavedJobs from "./pages/saved-jobs";

import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protected-route";
import MyJobs from "./pages/my-jobs";
// createBrowserRouter function that defines your application's routes.
const router = createBrowserRouter([
  {
    // AppLayout component is set as the element for the root route, meaning it acts as the layout for all the nested routes inside the children array.
    element: <AppLayout />,
    // define all the routes inside this
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        //displays current jobs
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return (
    // https://ui.shadcn.com/docs/dark-mode/vite
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

// wrapping with ProtectedRoute will prevent from going to any route if
// user is not logged in

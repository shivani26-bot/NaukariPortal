import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  //   isSignedIn value should be false and but not undefined
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }

  //check onboarding status, //candidate or recruiter
  // when not onboarded successfully it should not allow to go to /jobs or /post-job page
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  )
    return <Navigate to="/onboarding" />;

  return children;
};

export default ProtectedRoute;

// How to check if user is logged in or Not,
//  we get so many hooks from clerk to do so, one of them is useUser()

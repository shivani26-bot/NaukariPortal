import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    // console.log(search.get("sign-in")); //output true
    if (search.get("sign-in")) {
      setShowSignInModal(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    // console.log(e.target);
    // console.log(e.currentTarget);
    if (e.target == e.currentTarget) {
      setShowSignInModal(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-20" />
        </Link>

        {/* when user is signed out they see sign in button and when user is signed in they see user button  */}
        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignInModal(true)}>
              Login
            </Button>
            {/* <SignInButton /> */}
          </SignedOut>

          <SignedIn>
            {/* add a condition here, what buttons to show when its a user or company */}
            {user?.unsafeMetadata?.role == "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignInModal && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signedUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;

// useSearchParams provided by React Router (version 6 and later)
// allows you to read and update the query parameters in the URL from within your React components.

// const [searchParams, setSearchParams] = useSearchParams();
// // Read a specific query parameter
// const category = searchParams.get("category"); // e.g., ?category=books

// // Update a query parameter
// const updateCategory = () => {
//   setSearchParams({ category: "electronics" });
// };
// searchParams.get(param): Returns the value of the specified query parameter (e.g., ?category=books would return "books"
//   setSearchParams(newParams): Updates the query string in the URL. It takes an object where the keys are the parameter names and the values are the parameter values. When called, it updates the browser's URL and triggers a re-render of the component.

// Suppose you have a URL like https://example.com/products?category=electronics&page=2
// const [searchParams, setSearchParams] = useSearchParams();

// const category = searchParams.get('category');
// const page = searchParams.get('page');

// const handleNextPage = () => {
//   setSearchParams({ category, page: Number(page) + 1 });
// };

// e.currentTarget: This is the element to which the event handler is attached.
// In this case, it will always be the <div> element with the fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 classes.
// e.target: This is the element that was actually clicked. It could be any child element inside the <div> where the click occurred.

// if user has not logged in currently and search any route manually in the search bar then we
// route them to homepage with search param sign-in=true, loggin pop will automatically
// displayed

// tailwind shorcuts
// 4 in Tailwind's default configuration maps to 1rem or 16px
// py-4:
// padding-top: 1rem; /* 16px */
// padding-bottom: 1rem; /* 16px */

// flex:
// display: flex;

// justify-between:
// justify-content: space-between;

// items-center:
// align-items: center;

// rounded - full; //fully rounded border radius to the element, making it a perfect circle or oval
// .rounded-full {
//   border-radius: 9999px;
// }

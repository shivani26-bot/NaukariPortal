import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>

      {/* outlet helps to render the children element of app layout when ever the route changes  */}
      {/* When you navigate to a route, react-router-dom will match the path and render the corresponding component in the Outlet */}
      {/* When you navigate to /jobs, the AppLayout component will be rendered first because it's the parent route.
Inside AppLayout, Outlet will render the compo nent associated with the /jobs path, which is <JobListing />. */}

      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>

      {/* footer  */}
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with &nbsp;
        <img className="w-10 inline-block" src="512.gif" alt="" />
        &nbsp;by GetHired Community
      </div>
    </div>
  );
};

export default AppLayout;

// Tailwind shortcuts
// min-h-screen:
// min-height: 100vh;

// container:
// width: 100%;
// max-width: 640px; /* This value can vary based on the screen size and the Tailwind configuration */
// margin-left: auto;
// margin-right: auto;

// p-10:
// padding: 2.5rem; /* 40px */

// text-center:
// text-align: center;

// bg-gray-800:
// background-color: #2d3748; /* This is the hexadecimal value for Tailwind's gray-800 */

// mt-100
// margin-top: 100px;

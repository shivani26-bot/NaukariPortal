import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  console.log(user);
  const navigate = useNavigate();
  // when user clicks on candidate , his role as candidate is Saved
  // when user clicks on recruiter, his role as recruiter is saved
  // make asynchromous call to clerk to update the unsaved metadata
  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  // once onboarded successfully , if we click back button it should not take us back to the onboarding page again
  useEffect(() => {
    console.log(user);
    if (user?.unsafeMetadata?.role) {
      console.log(true);
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 width-full  md: px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          {" "}
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;

// under user object we get many options as follows :
// unsafeMetadata where we can store information that is not critical to the App
// like information regarding role that someone is candidate or recruiter

// to store some secure data use privatemetadata or publicmetadata

// for loading spinners
// npm i react-spinners
// https://dev.to/nnnirajn/how-to-use-react-spinners-step-by-step-guide-18b5

// if (user?.unsafeMetadata?.role) uses optional chaining (?.), a feature in JavaScript that allows you to safely access deeply nested properties of an object without having to manually check if each level of the property exists.
// user?.: The ?. operator checks if the user object exists. If user is null or undefined, the expression short-circuits and returns undefined
// user?.unsafeMetadata?.: If user exists, it then checks for unsafeMetadata. If unsafeMetadata is null or undefined, it again short-circuits and returns undefined.
// user?.unsafeMetadata?.role: Finally, if both user and unsafeMetadata exist, it attempts to access the role property. If role exists, it returns its value; otherwise, it returns undefined.

// tailwind
// tracking-tighter: Tighter letter spacing (reduces the space between letters).

// rounded - md; //medium border radius to the element, making its corners slightly rounded.
// .rounded-md {
//   border-radius: 0.375rem; /* 6px */
// }

// hover:bg-blue-600
// Changes the background color of the element to a darker blue when the element is hovered.
// .hover\:bg-blue-600:hover {
//   background-color: #2563eb; /* Tailwind's blue-600 */
// }

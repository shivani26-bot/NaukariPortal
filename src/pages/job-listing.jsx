import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { State } from "country-state-city";

const JobListing = () => {
  // useSession will provide us with the token of the authenticated user
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  // fetching job lists
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  // fetching companies
  // use companies data to add in the select box
  const { fn: fnCompanies, data: companies = [] } = useFetch(getCompanies);

  // console.log("ufgc", useFetch(getCompanies));
  console.log("datajob", jobs);
  console.log("datacompanies", companies);

  useEffect(() => {
    if (isLoaded) fnCompanies(); // call the function to fetch the jobs
  }, [isLoaded]);
  // useEffect(() => {
  //   console.log("Companies data:", companies);
  // }, [companies]);

  useEffect(() => {
    if (isLoaded) fnJobs(); // call the function to fetch the jobs
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    console.log("fd", query);
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
  };
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 ">
        Latest Jobs
      </h1>
      {/* add filters here  */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        {" "}
        <Input
          type="text"
          placeholder="Search Jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        {" "}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* {companies !== undefined && (
          <Select
            value={company_id}
            onValueChange={(value) => setCompany_id(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies.map(({ name, id }) => {
                  return (
                    <SelectItem key={name} value={id}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        )} */}
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilters}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div>
      {/* while loading jobs show the barloader  */}
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {/* only when items are loaded then display them */}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              // return <span>{job.title}</span>;
              console.log("job", job);
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div> No Jobs Found ☹ </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;

// first we need to fetch all the jobs

// for fetching list of country state and city
// we will filter job baased on state
// npm i country-state-city

// h-full
// height: 100%;
// flex-1
// flex: 1 1 0%
// sets the element to grow and shrink as needed, taking up an equal share of the available space in a flex container.
// flex-grow: 1; - The element will grow to fill available space.
// flex-shrink: 1; - The element will shrink if necessary to prevent overflow.
// flex-basis: 0%; - The element's initial size is 0%, but it will grow based on available space.

// The location data, using State.getStatesOfCountry("IN"), is likely coming from a static library or an internal function that provides the data immediately when called.
// The company data, on the other hand, is being fetched from an API using the useFetch hook. This is an asynchronous operation, meaning it takes some time to complete the fetch, during which companies remains undefined
// or in its initial state (which you can set to an empty array to avoid errors).
// using conditional rendering ({companies !== undefined && ...}) or by setting a default value like an empty array. This ensures that the map function doesn't try to operate on undefined.

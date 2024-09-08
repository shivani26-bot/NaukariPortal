// all the apis related to jobs are stored here

import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  console.log("token", token);
  //   query to fetch data from supabase database tables
  //   jobs table
  // to fetch company details from companies table as well
  // i twill look for foreign key relation between jobs and companies tables
  // we have wishlist optin for all the cards to save them
  let query = supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url),saved: saved_jobs(id)");
  if (location) {
    // if any column inside table with location key matches the location we are sending then it will
    // filter rows based on those location
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    // if title of job containes the required searchQuery then return only those jobs

    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }
  console.log("data1", data);
  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);
  // alreadySaved -> to know whether job is already saved or Not, if job is already saved then delete it from database
  // saveData -> data to be saved

  if (alreadySaved) {
    // delete the data if job_id is equal to saveData.job_id;
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);
    if (deleteError) {
      console.error("Error deleting Saved Job:", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();
    if (insertError) {
      console.error("Error fetching Jobs:", insertError);
      return null;
    }

    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  // only recruiters can see the applications
  // select everything from jobs table where id matches the job_id
  // we are fetching a single job, hence use single because this gives response in form of array

  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name, logo_url),applications: applications(*)")
    .eq("id", job_id)
    .single();
  if (error) {
    console.error("Error Fetching Job:", error);
    return null;
  }
  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();
  if (error) {
    console.error("Error Updating Job:", error);
    return null;
  }
  return data;
}

// creating a job, or posting a job by recruiter
// make policy change in supabase under jobs table
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();
  if (error) {
    console.error("Error Creating Job:", error);
    return null;
  }
  return data;
}

// only requires token, because in policies we have configured it like that
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);

  // this only provides with jobid and userid
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*,job:jobs(*,company:companies(name,logo_url))");
  if (error) {
    console.error("Error Fetching Saved Jobs", error);
    return null;
  }
  return data;
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  // show the my created job only for user who is recruiter
  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);
  if (error) {
    console.error("Error Fetching Jobs", error);
    return null;
  }
  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  // show the my created job only for user who is recruiter
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();
  if (error) {
    console.error("Error Deleting Job", error);
    return null;
  }
  return data;
}

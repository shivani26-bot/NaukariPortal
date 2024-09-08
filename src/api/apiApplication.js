// all the api logic related to applications
import supabaseClient, { supabaseUrl } from "@/utils/supabase";
//  _ takes nothing inside object
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  // upload resume with name of file
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;
  const { error: storageError } = await supabase.storage
    .from("resume")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error Uploading Resume:", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resume/${fileName}`;
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error Submitting Application:", error);
    return null;
  }
  return data;
}

export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  // delete the data if job_id is equal to saveData.job_id;
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();
  if (error || data.length === 0) {
    console.error("Error updating Application Status:", error);
    return null;
  }
  return data;
}

export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  // delete the data if job_id is equal to saveData.job_id;
  const { data, error } = await supabase
    .from("applications")
    .select("*,job:jobs(title,company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error Fetching Applications:", error);
    return null;
  }
  return data;
}

// https://hyngnzpudlpzzlkfuumx.supabase.co/storage/v1/object/public/company-logo/amazon.png?t=2024-08-28T12%3A06%3A59.642Z

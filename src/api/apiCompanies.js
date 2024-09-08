// all the operation like fetching the comapny etc. related to company will be stored here

import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  // delete the data if job_id is equal to saveData.job_id;
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.error("Error Fetching Companies:", error);
    return null;
  }
  return data;
}

export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;
  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.error("Error Uploading Company Logo:", storageError);
    return null;
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  // delete the data if job_id is equal to saveData.job_id;
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();
  if (error) {
    console.error("Error Adding Company:", error);
    return null;
  }
  return data;
}

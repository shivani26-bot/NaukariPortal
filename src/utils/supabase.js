import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// send a token every single time to verify the user is authorized or not
// etting up supabase with clerk
const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
  console.log("sp1", supabase);
  return supabase;
};
export default supabaseClient;

// we use clerk for user authentication
// npm install @supabase/supabase-js
// for dark mode
// npm install @clerk/themes

// ------------------------------------------------------------------------------------------------------------------------------------
// connect supabase with clerk
// https://supabase.com/partners/integrations/clerk#:~:text=Overview%201%20Step%201%3A%20Create%20JWT%20template%20The,Step%205%3A%20Set%20auth%20token%20with%20Supabase%20
// supabase is used as database and clerk is used for authentication

// -----------------------------------------------------------------------------------------------------------------------
// create or replace function requesting_user_id()
// returns text
// language sql stable
// as $$
//   select nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;
// $$;
// the above code is pasted in supabase ->sql editor-> run
// this compares and checks the user id coming from the frontend
// CREATE OR REPLACE FUNCTION requesting_user_id():

// This creates a function named requesting_user_id() or replaces an existing one with the same name if it already exists.
// RETURNS text:

// The function returns a value of type text. This will be the user's ID extracted from the JWT claims.
// LANGUAGE sql STABLE:

// LANGUAGE sql: The function is written in SQL.
// STABLE: This indicates that the function returns the same result for the same input parameters within a single query (it does not modify the database state and does not depend on database changes).
// AS $$ ... $$:

// The SQL code for the function is enclosed between the $$ symbols.
// SELECT nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::text;:

// current_setting('request.jwt.claims', true):
// Retrieves the current value of the setting request.jwt.claims.
// The true parameter indicates that if this setting is not found, the function should return NULL instead of throwing an error.
// ::json:
// Casts the retrieved setting value to a JSON data type. This allows JSON-specific operations, like extracting keys and values.
// ->>'sub':
// This extracts the value associated with the key "sub" from the JSON object.
// In the context of JWT, "sub" usually represents the subject of the token, which is typically the user ID.
// nullif(..., ''):
// This function returns NULL if the extracted value is an empty string ('').
// Otherwise, it returns the extracted value.
// ::text:
// The final result is cast to text, ensuring that the function always returns a text type, even if the extracted value is NULL.
// Summary:
// The requesting_user_id() function extracts the user ID (typically stored in the "sub" key of the JWT claims) from the request.jwt.claims session setting. If the value is an empty string, the function returns NULL instead. This function is useful in scenarios where you need to identify the user making the request based on the JWT provided in the session.

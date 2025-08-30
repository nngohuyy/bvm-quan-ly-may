import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export const signUpUser = async (
  email: string,
  password: string,
  full_name: string,
  username: string,
  role_name: string
) => {
  if (!email || !password) {
    return null;
  }
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          username,
          role_name
        },
      },
    })

    if (error) {
      console.error("Supabase Error:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected Error:", error);
    return null;
  }
}

export const signInUser = async (email: string, password: string) => {
  if (!email || !password) {
    return null;
  }
  try {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      console.error("Supabase Error:", error.message);
      return error;
    }

    return data.user;
  } catch (error) {
    return error;
  }
};

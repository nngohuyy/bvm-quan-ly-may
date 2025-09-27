'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export const signUpUser = async (
  email: string,
  password: string,
  full_name: string,
  username: string,
  role_name: string
) => {
  const supabase = await createClient();

  if (!email || !password) {
    return null;
  }
  try {
    const { error } = await supabase.auth.signUp({
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

  } catch (error) {
    console.error("Unexpected Error:", error);
    return null;
  }
  revalidatePath('/trang-chu', 'layout');
  redirect('/trang-chu');
}

export const signInUser = async (email: string, password: string) => {
  const supabase = await createClient();

  if (!email || !password) {
    return null;
  }
  try {
    console.log(email, password);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      console.error("Supabase Error:", error.message);
      return error;
    }

  } catch (error) {
    return error;
  }
  revalidatePath('/trang-chu', 'layout');
  redirect('/trang-chu');
};

export const signOutUser = async () => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Supabase Error:", error.message);
      return null;
    }

  } catch (error) {
    console.error("Unexpected Error:", error);
    return null;
  }
  redirect('/dang-nhap');
};

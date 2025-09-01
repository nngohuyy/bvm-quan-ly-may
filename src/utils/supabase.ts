import { createClient } from '@supabase/supabase-js'
import { EquipmentFormData } from '@/lib/type'

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

export const getAllEquipments = async () => {
  try {
    const { data: equipments, error } = await supabase
      .from('equipment')
      .select('*')

    if (error) {
      throw new Error("Failed to fetch equipments");
    }
    console.log("Fetched equipments:", equipments);
    return equipments;
  } catch (error) {
    console.log('Unexpected Error:', error);
    return null;
  }
};

export const addEquipment = async (equipment: EquipmentFormData) => {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .insert([equipment])

    if (error) {
      throw new Error("Failed to add equipment");
    }

    console.log("Added equipment:", data);
    return data;
  } catch (error) {
    console.log('Unexpected Error:', error);
    return null;
  }
}

export async function getEquipmentWithHistory(equipmentId: string) {
  try {
    const { data, error } = await supabase
      .from('equipment')
      .select('*, maintenance_history(*, profiles(full_name))')
      .eq('id', equipmentId)
      .single();

    if (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }

    if (!data) {
      console.log(`No equipment found with ID: ${equipmentId}`);
      return null;
    }
    
    console.log('Successfully fetched equipment details:', data);
    return data;

  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return null;
  }
}

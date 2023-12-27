'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addExpense(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });
  const expense = Object.fromEntries(formData);

  // console.log('expense', expense);

  const { error } = await supabase.from('expense').insert({ ...expense });

  if (error) {
    throw error;
  }
  revalidatePath('/');
}

export async function addIncome(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });
  const income = Object.fromEntries(formData);
  // console.log('income', income);

  const { error } = await supabase.from('income').insert({ ...income });

  if (error) {
    throw error;
  }
  revalidatePath('/');
}

'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function addExpense(formData: FormData) {
  const expense = Object.fromEntries(formData);
  const supabase = createServerActionClient({ cookies });
  // console.log('expense', expense);

  const { error } = await supabase.from('expense').insert({ ...expense });

  if (error) {
    throw error;
  }
}
export async function addIncome(formData: FormData) {
  const income = Object.fromEntries(formData);
  const supabase = createServerActionClient({ cookies });
  // console.log('income', income);

  const { error } = await supabase.from('income').insert({ ...income });

  if (error) {
    throw error;
  }
}

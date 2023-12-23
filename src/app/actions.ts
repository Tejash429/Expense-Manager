'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function addExpense(formData: FormData) {
  const expense = Object.fromEntries(formData);
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.from('expense').insert({ ...expense });

  if (error) {
    throw error;
  }
}

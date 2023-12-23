import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

async function getExpenses() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('expense').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export default async function ExpenseList() {
  const expenses = await getExpenses();

  return (
    <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-4 rounded-md'>
      <h2 className='text-xl font-semibold mb-4'>Expense List</h2>
      <ul className='divide-y divide-gray-600'>
        {expenses &&
          expenses.map((expense) => (
            <div key={expense.id} className='py-2'>
              <li className='py-2'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-lg font-medium'>{expense.date}</p>
                    <p className='text-gray-400'>{expense.category}</p>
                  </div>
                  <div>
                    <p className='text-lg font-medium text-right'>
                      {expense.amount}
                    </p>
                    <p className='text-gray-400 text-right'>
                      {expense.payment}
                    </p>
                  </div>
                </div>
                <p className='mt-2 text-gray-400'>{expense.payee}</p>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}

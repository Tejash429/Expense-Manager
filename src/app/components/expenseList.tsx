import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React, { useEffect } from 'react';

async function getExpenses() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('expense').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}
async function getInomes() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from('income').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export default async function ExpenseList() {
  const expenses = await getExpenses();
  const incomes = await getInomes();

  const combinedData = [...expenses, ...incomes].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });

  return (
    <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-4 rounded-md'>
      <h2 className='text-xl font-semibold mb-4'>Transaction List</h2>
      <ul className='divide-y divide-gray-600'>
        {combinedData &&
          combinedData.map((transaction) => (
            <div key={transaction.id} className='py-2'>
              <li className='py-2'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-lg font-medium'>{transaction.date}</p>
                    <p className='text-gray-400'>{transaction.category}</p>
                  </div>
                  <div>
                    <p className='text-lg font-medium text-right'>
                      {transaction.amount}
                    </p>
                    <p className='text-gray-400 text-right'>
                      {transaction.payment}
                    </p>
                  </div>
                </div>
                <p className='mt-2 text-gray-400'>
                  {transaction.income_source
                    ? transaction.income_source
                    : transaction.payee}
                </p>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}

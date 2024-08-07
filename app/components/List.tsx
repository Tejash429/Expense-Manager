import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

interface Transaction {
  transaction: {
    category: string;
    amount: number;
    date: string;
    payee: string;
    payment: string;
    income_source: string;
  };
}

export async function getExpenses() {
  const cokkieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cokkieStore });
  const { data, error } = await supabase.from('expense').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}
export async function getIncomes() {
  const cokkieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cokkieStore });
  const { data, error } = await supabase.from('income').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export async function combinedDatas() {
  const expenses = await getExpenses();
  const incomes = await getIncomes();
  const combinedData = [...(expenses || []), ...(incomes || [])].sort(
    (a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    }
  );
  return combinedData;
}

export default async function List() {
  const combinedData = await combinedDatas();
  return (
    <div className='w-full mobile:mx-auto bg-[#1E1E1E] text-[#cbd5e0] rounded-md '>
      <ul className='divide-y divide-gray-600 '>
        {combinedData?.map((transaction) => (
          <li
            key={transaction.id}
            className='p-4 hover:rounded-md hover:bg-[#2A2A2A]'
          >
            {transaction.income_source ? (
              <IncomeLists transaction={transaction} />
            ) : (
              <ExpenseLists transaction={transaction} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpenseLists({ transaction }: Transaction) {
  return (
    <div className='flex flex-wrap justify-between'>
      <div className='flex flex-col text-start'>
        <p className='text-xl font-medium capitalize '>{transaction.payee}</p>
        <p className='text-gray-400 capitalize text-base'>
          {` ${transaction.date} , ${transaction.category} `}
        </p>
      </div>

      <div className='flex flex-col'>
        <p className='text-lg font-semibold text-right text-danger'>
          ₹ {transaction.amount}
        </p>
        <p className='text-gray-400 text-right capitalize'>
          {transaction.payment}
        </p>
      </div>
    </div>
  );
}
function IncomeLists({ transaction }: Transaction) {
  return (
    <div className='flex flex-wrap justify-between items-center'>
      <div className='flex flex-col text-start'>
        <p className='text-xl font-medium capitalize '>
          {transaction.income_source}
        </p>
        <p className='text-gray-400 capitalize text-base'>{transaction.date}</p>
      </div>

      <p className='text-lg font-semibold text-right text-primary'>
        ₹ {transaction.amount}
      </p>
    </div>
  );
}

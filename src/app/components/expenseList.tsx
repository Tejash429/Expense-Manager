import React from 'react';

export default function ExpenseList() {
  return (
    <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-4 rounded-md'>
      <h2 className='text-xl font-semibold mb-4'>Expense List</h2>
      <ul className='divide-y divide-gray-600'>
        {expenses.map((expense) => (
          <li key={expense.id} className='py-2'>
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
                  {expense.paymentMethod}
                </p>
              </div>
            </div>
            <p className='mt-2 text-gray-300'>{expense.description}</p>
            <p className='mt-2 text-gray-400'>{expense.vendor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

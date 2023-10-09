import React from 'react';

export default function Amount() {
  return (
    <div className=''>
      <label
        className='block text-gray-400 text-sm font-bold mb-2'
        htmlFor='amount'
      >
        Amount
      </label>
      <input
        type='amount'
        id='amount'
        name='amount'
        placeholder='Expense Amount'
        className='w-full px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'
      />
    </div>
  );
}

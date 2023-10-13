import React from 'react';

export default function Amount() {
  return (
    <div className=''>
      <label
        className='block text-[#F0F0F0] text-sm font-bold mb-2'
        htmlFor='amount'
      >
        Amount
      </label>
      <input
        type='amount'
        id='amount'
        name='amount'
        placeholder='Expense Amount'
        className='w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-skyBlue bg-[#1A191A] text-[#E0E0E0]
    focus:border-blue-500'
      />
    </div>
  );
}

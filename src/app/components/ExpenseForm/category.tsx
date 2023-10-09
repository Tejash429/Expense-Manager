import React from 'react';

export default function Category() {
  return (
    <div className='mb-4'>
      <label
        className='block text-gray-400 text-sm font-bold mb-2'
        htmlFor='category'
      >
        Category
      </label>
      <input
        type='category'
        id='category'
        name='category'
        placeholder='Expense Category'
        className='w-full px-3 py-[9px] rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'
      />
    </div>
  );
}

import React from 'react';

export default function Payment() {
  return (
    <div className=''>
      <label
        className='block text-gray-400 text-sm font-bold mb-2'
        htmlFor='payment'
      >
        Payment Method
      </label>
      <input
        type='payment'
        id='payment'
        name='payment'
        placeholder='Payment Method '
        className='w-full px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'
      />
    </div>
  );
}

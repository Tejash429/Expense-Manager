import React from 'react';

export default function Payment() {
  return (
    <div className=''>
      <label
        className='block text-[#F0F0F0]  text-sm font-bold mb-2'
        htmlFor='payment'
      >
        Payment Method
      </label>
      <input
        type='payment'
        id='payment'
        name='payment'
        placeholder='Payment Method '
        className='w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-skyBlue bg-[#1A191A] text-[#E0E0E0]
    focus:border-blue-500'
      />
    </div>
  );
}

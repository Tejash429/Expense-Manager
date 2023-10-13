import React from 'react';

export default function Vendor() {
  return (
    <div className='mb-4'>
      <label
        className='block text-[#F0F0F0] text-sm font-bold mb-2'
        htmlFor='vendor'
      >
        Vendor/Payee
      </label>
      <input
        type='vendor'
        id='vendor'
        name='vendor'
        placeholder='Vendor/Payee Name '
        className='w-full px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-skyBlue bg-[#1A191A] text-[#E0E0E0]
    focus:border-blue-500'
      />
    </div>
  );
}

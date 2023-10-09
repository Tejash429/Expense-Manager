import React from 'react';

export default function Vendor() {
  return (
    <div className='mb-4'>
      <label
        className='block text-gray-400 text-sm font-bold mb-2'
        htmlFor='vendor'
      >
        Vendor/Payee
      </label>
      <input
        type='vendor'
        id='vendor'
        name='vendor'
        placeholder='Vendor/Payee Name '
        className='w-full px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'
      />
    </div>
  );
}

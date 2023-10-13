import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export default function Payment() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=''>
      <label
        className='block text-[#F0F0F0]  text-sm font-bold mb-2'
        htmlFor='payment'
      >
        Payment Method
      </label>

      <div className='relative inline-block w-full rounded-md bg-[#1A191A] text-[#E0E0E0] '>
        <select
          id='payment'
          name='payment'
          className='w-full px-3 py-[8px]  rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 appearance-none  bg-[#1A191A] text-[#E0E0E0]
    '
          onClick={() => setIsOpen(!isOpen)}
        >
          <option value=''>Select:</option>
          <option value='creditCard'>Credit Card</option>
          <option value='debitCard'>Debit Card</option>
          <option value='cash'>Cash</option>
          <option value='onlinePayment'>Online Payment</option>
          <option value='other'>Other</option>
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700'>
          {isOpen ? <ChevronUp /> : <ChevronDown color='#F0F0F0' />}
        </div>
      </div>
    </div>
  );
}

import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export default function IncomeSource() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='mb-4'>
      <label
        className='block text-[#F0F0F0]  text-sm font-bold mb-2'
        htmlFor='incomeSource'
      >
        Income Source
      </label>
      <div className='relative inline-block w-full rounded-md bg-[#1A191A] text-[#E0E0E0] '>
        <select
          id='incomeSource'
          name='incomeSource'
          className='w-full px-3 py-[8px]  rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 appearance-none  bg-[#1A191A] text-[#E0E0E0]
    '
          onClick={() => setIsOpen(!isOpen)}
        >
          <option value=''>Income Source:</option>
          <option value='salary'>Salary</option>
          <option value='freelance'>Freelance</option>
          <option value='business'>Business</option>
          <option value='investments'>Investments</option>
          <option value='rent'>Rent</option>
          <option value='other'>Other</option>
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700'>
          {isOpen ? <ChevronUp /> : <ChevronDown color='#F0F0F0' />}
        </div>
      </div>
    </div>
  );
}

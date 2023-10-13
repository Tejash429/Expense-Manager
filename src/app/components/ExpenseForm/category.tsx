import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export default function Category() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='mb-4'>
      <label
        className='block text-[#F0F0F0] text-sm font-bold mb-2'
        htmlFor='category'
      >
        Category
      </label>
      <div className='relative inline-block w-full bg-[#1A191A]  rounded-md text-[#E0E0E0] '>
        <select
          id='category'
          name='category'
          className='w-full px-3 py-[9px]  rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 appearance-none  bg-[#1A191A] text-[#E0E0E0]
    '
          onClick={() => setIsOpen(!isOpen)}
        >
          <option value=''>Select Category</option>
          <option value='food'>Food</option>
          <option value='transportation'>Transportation</option>
          <option value='housing'>Housing</option>
          <option value='entertainment'>Entertainment</option>
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700'>
          {isOpen ? <ChevronUp /> : <ChevronDown color='#F0F0F0' />}
        </div>
      </div>
    </div>
  );
}

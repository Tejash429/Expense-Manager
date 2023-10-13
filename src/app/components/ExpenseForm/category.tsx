import React from 'react';

export default function Category() {
  return (
    <div className='mb-4'>
      <label
        className='block text-[#F0F0F0] text-sm font-bold mb-2'
        htmlFor='category'
      >
        Category
      </label>

      {/* <details className='dropdown mb-32'>
        <summary className='m-1 btn  hover:bg-gray-600 w-full px-3 py-[9px] rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'>
          Category
        </summary>
        <ul className='p-1 shadow menu dropdown-content rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'>
          <li>
            <a>Transportation</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details> */}

      {/* <select
        name='category'
        id='category'
        className='w-full px-3 py-[9px] rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'
      >
        <option value='default'>Select:</option>
        <option value='transportation'>Transportation</option>
        <option value='entertainment'>Entertainment</option>
        <option value='Grocries'>Grocries</option>
      </select> */}
    </div>
  );
}

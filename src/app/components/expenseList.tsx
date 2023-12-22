import React from 'react';

export default function ExpenseList() {
  return (
    // <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-4 rounded-md'>
    //   <h2 className='text-xl font-semibold mb-4'>Expense List</h2>
    //   <ul className='divide-y divide-gray-600'>
    //     {/* {expenses.map((expense) => ( */}
    //     {/* <li key={expense.id} className='py-2'> */}
    //     <li className='py-2'>
    //       <div className='flex justify-between items-center'>
    //         <div>
    //           <p className='text-lg font-medium'>12/3/2023</p>
    //           <p className='text-gray-400'>fun</p>
    //         </div>
    //         <div>
    //           <p className='text-lg font-medium text-right'>300</p>
    //           <p className='text-gray-400 text-right'>UPI</p>
    //         </div>
    //       </div>
    //       <p className='mt-2 text-gray-300'>I spent it on my friends</p>
    //       <p className='mt-2 text-gray-400'>Martinoz</p>
    //     </li>
    //     {/* ))} */}
    //   </ul>
    // </div>

    <div className='w-full max-w-md mx-auto bg-gray-800 text-white p-6 rounded-md shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4'>Expense List</h2>
      <ul className='divide-y divide-gray-600'>
        <li className='py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-lg font-semibold'>12/3/2023</p>
              <p className='text-gray-400'>Category: Fun</p>
            </div>
            <div className='text-right'>
              <p className='text-lg font-semibold'>$300</p>
              <p className='text-gray-400'>Payment: UPI</p>
            </div>
          </div>
          <p className='mt-2 text-gray-300'>
            Description: I spent it on my friends
          </p>
          <p className='mt-2 text-gray-400'>Vendor: Martinoz</p>
        </li>

        {/* Add more list items as needed */}
      </ul>
    </div>
  );
}

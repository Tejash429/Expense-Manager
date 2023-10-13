import React from 'react';
import Payment from './ExpenseForm/payment';
import Date from './ExpenseForm/date';
import Amount from './ExpenseForm/amount';
import IncomeSource from './IncomeForm/incomeSource';

export default function IncomeForm() {
  return (
    <>
      <div className='flex flex-wrap justify-between items-center mb-5'>
        <h1 className='text-xl text-center font-semibold '>Add Income</h1>
        <button className='btn btn-sm btn-circle btn-ghost '>✕</button>
      </div>

      <Date />

      <div className='mb-4'>
        <Amount />
      </div>

      <IncomeSource />

      <div className='flex justify-end gap-4'>
        <button
          type='submit'
          className='px-4 py-2  btn  hover:bg-primary bg-transparent border-white hover:text-white '
        >
          Save
        </button>
        <button
          type='button'
          className='px-4 py-2 bg-gray-600 text-white btn btn-neutral hover:btn-error focus:outline-none focus:bg-gray-700'
        >
          Cancel
        </button>
      </div>
    </>
  );
}

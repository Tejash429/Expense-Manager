import { Plus } from 'lucide-react';
import Amount from './ExpenseForm/amount';
import Category from './ExpenseForm/category';
import Date from './ExpenseForm/date';
import Description from './ExpenseForm/description';
import Payment from './ExpenseForm/payment';
import Vendor from './ExpenseForm/vendor';

export default function ExpenseForm() {
  return (
    <>
      <div className='flex flex-wrap justify-between items-center mb-5'>
        <h1 className='text-xl text-center font-semibold '>Add Expense</h1>
        <button className='btn btn-sm btn-circle btn-ghost '>✕</button>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <Payment />
        </div>
        <div>
          <Amount />
        </div>
        <div>
          <Date />
        </div>
        <div className='col-span-1 '>
          <Category />
        </div>
      </div>

      <Vendor />

      <Description />

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

import React from 'react';
import ExpenseForm from './expenseForm';

export default function ExpenseDiaglog() {
  return (
    <>
      <button
        className='btn'
        onClick={() => {
          const modal = document.getElementById('expenseModal');
          if (modal instanceof HTMLDialogElement) {
            modal.showModal();
          }
        }}
      >
        Add Expense
      </button>
      <dialog id='expenseModal' className='modal backdrop-blur-sm  bg-black/30'>
        <form className='w-full max-w-sm mx-auto bg-[#232023] text-white p-4 rounded-md  '>
          <ExpenseForm />
        </form>
      </dialog>
    </>
  );
}

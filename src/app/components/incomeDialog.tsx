import React from 'react';
import IncomeForm from './incomeForm';

export default function IncomeDialog() {
  return (
    <>
      <button
        className='btn'
        onClick={() => {
          const modal = document.getElementById('incomeModal');
          if (modal instanceof HTMLDialogElement) {
            modal.showModal();
          }
        }}
      >
        Add Income
      </button>
      <dialog
        id='incomeModal'
        className='modal backdrop-blur-sm  bg-[#151010]/30'
      >
        <form className='w-full max-w-sm mx-auto bg-[#232023] text-white p-4 rounded-md  '>
          <IncomeForm />
        </form>
      </dialog>
    </>
  );
}

'use client';
import ExpenseDiaglog from './components/expenseDiaglog';
import ExpenseForm from './components/expenseForm';
import ExpenseList from './components/expenseList';
import IncomeDialog from './components/incomeDialog';
import NavBar from './components/navBar';

export default function Home() {
  return (
    <main className='bg-[#151010] h-screen '>
      {/* <div className='flex items-center justify-center flex-col gap-6'> */}
      {/* 
            Date: To record when the expense occurred.
            Category: To categorize the expense (e.g., groceries, transportation, entertainment).
            Amount: To specify the monetary value of the expense.
            Payment Method: To track how you paid for the expense (e.g., cash, credit card).
            Description: A brief note or description of the expense.
            Vendor/Payee: The name of the vendor or payee associated with the expense.
        */}

      <NavBar />
      <div className='flex items-center mt-5 justify-between px-5'>
        <h3 className='text-2xl font-medium'>Records</h3>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <ExpenseDiaglog />
          <IncomeDialog />
        </div>
      </div>

      <center>
        <div className='h-px bg-gray-700 mt-3  w-[97%]'></div>
      </center>
    </main>
  );
}

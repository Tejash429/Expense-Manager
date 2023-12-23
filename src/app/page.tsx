'use client';
import { Divider } from '@nextui-org/react';
import ExpenseForm from './components/expenseForm';
import ExpenseList from './components/expenseList';
import IncomeForm from './components/incomeForm';
import NavBar from './components/navBar';

export default function Home() {
  // const amount = 0;
  return (
    <main>
      <section className='bg-[#151010] h-screen '>
        <NavBar />
        <div className='flex items-center mt-5 mobile:flex-col gap-2 tablet:flex-row justify-between px-5'>
          <h3 className='text-2xl font-medium mobile:hidden tablet:flex'>
            Transactions
          </h3>
          <p className='text-xl font-medium '>Amount:- $1500</p>
          {/* <p className='text-xl font-medium '>
            Amount:-{' '}
            {amount > 0 ? (
              <span className='text-primary'>${amount}</span>
            ) : (
              <span className='text-danger'>${amount}</span>
            )}
          </p> */}
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <ExpenseForm />
            <IncomeForm />
          </div>
          <h3 className='text-xl font-medium text-start tablet:hidden'>
            Transactions
          </h3>
        </div>
        <center>
          <div className='h-px bg-gray-700 tablet:mt-3 mobile:mt-0 text-center mb-4 w-[97%]' />
          {/* <div className='grid grid-rows-5 grid-flow-col  gap-4'>
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
            <ExpenseList />
          </div> */}
        </center>
      </section>
    </main>
  );
}

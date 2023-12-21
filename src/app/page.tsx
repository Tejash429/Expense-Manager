'use client';
import ExpenseForm from './components/expenseForm';
import NavBar from './components/navBar';

export default function Home() {
  return (
    <main className='bg-[#151010] h-screen '>
      <NavBar />
      <div className='flex items-center mt-5 justify-between px-5'>
        <h3 className='text-2xl font-medium'>Records</h3>
        <p className='text-xl font-medium '>Amount:- $1500</p>
        <div className='flex flex-wrap items-center justify-between gap-4'></div>
      </div>
      <ExpenseForm />
      {/* <center>
        <div className='h-px bg-gray-700 mt-3  w-[97%]'></div>
      </center> */}
    </main>
  );
}

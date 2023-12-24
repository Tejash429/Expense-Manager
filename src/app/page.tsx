import { Divider } from '@nextui-org/react';
import ExpenseForm from './components/expenseForm';
import IncomeForm from './components/incomeForm';
import NavBar from './components/navBar';
import ExpenseList, { combinedDatas } from './components/expenseList';

export default async function Home() {
  const combinedData = await combinedDatas();

  const amount = combinedData.reduce((acc, curr) => {
    return curr.income_source ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <main>
      <section className='bg-[#151010] overflow-hidden h-screen'>
        <NavBar />
        <div className='flex items-center mt-5 mobile:flex-col gap-2 tablet:flex-row justify-between px-5'>
          <h3 className='text-2xl font-medium mobile:hidden tablet:flex'>
            Transactions
          </h3>
          {/* <p className='text-xl font-medium '>Amount:- $1500</p> */}
          <p className='text-xl font-medium '>
            Amount:-{' '}
            {amount > 0 ? (
              <span className='text-primary'>${amount}</span>
            ) : (
              <span className='text-danger'>${amount}</span>
            )}
          </p>
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
          <div className=' overflow-y-scroll h-[79vh]'>
            <ExpenseList />
          </div>
        </center>
      </section>
    </main>
  );
}

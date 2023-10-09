import ExpenseForm from './components/expenseForm';

export default function Home() {
  return (
    <main className='bg-base-200 h-screen flex items-center'>
      {/* <div className='flex items-center justify-center flex-col gap-6'> */}
      {/* 
            Date: To record when the expense occurred.
            Category: To categorize the expense (e.g., groceries, transportation, entertainment).
            Amount: To specify the monetary value of the expense.
            Payment Method: To track how you paid for the expense (e.g., cash, credit card).
            Description: A brief note or description of the expense.
            Vendor/Payee: The name of the vendor or payee associated with the expense.
        */}

      <ExpenseForm />
    </main>
  );
}

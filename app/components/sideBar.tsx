import { getExpenses } from './List';
import Progress from './progress';

export default async function SideBar() {
  const data = await getExpenses();

  const expeseAmount = data?.reduce((acc: number, curr: { amount: number }) => {
    return acc + curr.amount;
  }, 0);

  const categoryTotals = data?.reduce(
    (
      acc: { [x: string]: number },
      curr: { category: string; amount: number }
    ) => {
      const category = curr.category;

      if (!acc[category]) {
        acc[category] = curr.amount;
      } else {
        acc[category] += curr.amount;
      }
      return acc;
    },
    {}
  );

  return (
    data &&
    data.length > 0 && (
      <div className='w-[35%] p-6 mr-4 shadow-xl bg-[#1a202c] h-fit text-[#cbd5e0] rounded-2xl'>
        <h2 className='font-bold text-xl mb-4'>Where does your Money go?</h2>
        <ul className='flex flex-col gap-4 '>
          {Object.keys(categoryTotals).map((category) => (
            <li className='capitalize' key={category}>
              <Progress
                value={categoryTotals[category]}
                label={category}
                maxValue={expeseAmount}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

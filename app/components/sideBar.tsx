import { combinedDatas, getExpenses } from './List';
import Progress from './progress';

export default async function SideBar() {
  const data = await getExpenses();

  const expeseAmount = data?.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const categoryTotals = data?.reduce((acc, curr) => {
    const category = curr.category;

    if (!acc[category]) {
      acc[category] = curr.amount;
    } else {
      acc[category] += curr.amount;
    }
    return acc;
  }, {});

  return (
    <div className='w-[35%] p-6 mr-2 shadow-xl bg-[#1a202c] h-fit text-[#cbd5e0] rounded-2xl'>
      <h2 className='font-bold text-xl mb-4'>Where does your Money go?</h2>
      <ul className='flex flex-col gap-4 '>
        {Object.keys(categoryTotals).map((key) => (
          <li className='capitalize' key={key}>
            <Progress
              value={categoryTotals[key]}
              label={key}
              maxValue={expeseAmount}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

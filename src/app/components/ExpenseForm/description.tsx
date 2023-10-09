export default function Description() {
  return (
    <div className='mb-4'>
      <label
        className='block text-gray-400 text-sm font-bold mb-2'
        htmlFor='description'
      >
        Description
      </label>

      <textarea
        id='description'
        name='description'
        placeholder='Expense Description'
        className='w-full px-3 textarea py-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white'
      ></textarea>
    </div>
  );
}

const Balance = ({
  balance,
  income,
  expenses,
}: {
  balance: number;
  income: number;
  expenses: number;
}) => {
  return (
    <div className="flex flex-col mb-8">
      <h3 className="text-2xl font-medium ">Your Balance:</h3>
      <h2
        className={
          balance < 0 ? "text-red-500 text-2xl font-semibold" : `text-black text-2xl font-semibold`
        }
      >
        ${balance}
      </h2>
      <h3 className="text-xl text-green-700">Income:</h3>
      <h2 className="text-2xl font-semibold">${income}</h2>
      <h3 className="text-xl text-red-700">Expenses:</h3>
      <h2 className="text-2xl font-semibold">${expenses}</h2>
    </div>
  );
};

export default Balance;

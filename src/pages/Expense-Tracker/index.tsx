import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";

import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import Header from "@/components/Header";
import Balance from "@/components/Balance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Transactions from "@/components/Transactions";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const [description, setDescription] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<string>("expense");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount(0);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center my-4 px-4">
        <div>
          <div className="flex w-full">
            <Header name={name} profilePhoto={profilePhoto} signUserOut={signUserOut} />
          </div>

          <Balance
            balance={Number(transactionTotals.balance.toFixed(2))}
            income={Number(transactionTotals.income.toFixed(2))}
            expenses={Number(transactionTotals.expenses.toFixed(2))}
          />

          <form onSubmit={onSubmit}>
            <div className="flex space-x-2 my-4">
              <Input
                type="text"
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <Input
                type="number"
                placeholder="Amount"
                required
                onChange={(e) => setTransactionAmount(Number(e.target.value))}
                value={transactionAmount}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-around ">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <label htmlFor="expense" className="text-lg font-medium text-red-700">
                    Expense
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="income"
                    value="income"
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <label htmlFor="income" className="text-lg font-medium text-green-700">
                    Income
                  </label>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                <Button type="submit" className="my-4 w-32">
                  Add Transaction
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <Transactions transactions={transactions} />
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;

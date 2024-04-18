import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

type Transaction = {
  id: string;
  transactionAmount: number;
  transactionType: "income" | "expense";
  createdAt: Date;
  description?: string;
};

type TransactionTotals = {
  balance: number;
  income: number;
  expenses: number;
};

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionTotals, setTransactionTotals] = useState<TransactionTotals>({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const queryTransactions = query(
      transactionCollectionRef,
      where("userID", "==", userID),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(
      queryTransactions,
      (snapshot) => {
        let docs: Transaction[] = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          const id = doc.id;

          const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt;

          const transaction: Transaction = {
            id,
            transactionAmount: data.transactionAmount,
            transactionType: data.transactionType,
            createdAt: createdAt,
            description: data.description,
          };

          docs.push(transaction);

          if (transaction.transactionType === "expense") {
            totalExpenses += Number(transaction.transactionAmount);
          } else {
            totalIncome += Number(transaction.transactionAmount);
          }
        });

        setTransactions(docs);

        setTransactionTotals({
          balance: totalIncome - totalExpenses,
          income: totalIncome,
          expenses: totalExpenses,
        });
      },
      (error) => {
        console.error("Error fetching transactions:", error);
      }
    );

    return () => unsubscribe();
  }, [userID]);

  return { transactions, transactionTotals };
};

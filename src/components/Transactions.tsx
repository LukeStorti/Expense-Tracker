import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
type Transaction = {
  id: string;
  transactionAmount: number;
  transactionType: "income" | "expense";
  createdAt: Date;
  description?: string;
};
const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <Table className="border my-4 px-4">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-black">Description</TableHead>
          <TableHead className="font-bold text-black">Transaction Type</TableHead>
          <TableHead className="font-bold text-black">Transaction Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((item: Transaction) => (
          <TableRow key={item.id}>
            <TableCell className="capitalize">{item.description}</TableCell>
            <TableCell
              className={cn(
                item.transactionType === "expense" ? "text-red-500" : "text-green-500",
                "capitalize"
              )}
            >
              {item.transactionType}
            </TableCell>
            <TableCell className="font-semibold text-black ">
              ${item.transactionAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Transactions;

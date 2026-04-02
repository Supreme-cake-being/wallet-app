import { useState, useEffect } from "react";
import { Transaction } from "./types/transaction";
import TransactionsList from "./screens/TransactionsList";
import TransactionDetail from "./screens/TransactionDetail";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((data: Transaction[]) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="app-shell">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <div className="loading-text">Loading wallet...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="phone-frame">
        {selected ? (
          <TransactionDetail
            transaction={selected}
            onBack={() => setSelected(null)}
          />
        ) : (
          <TransactionsList
            transactions={transactions}
            onSelect={setSelected}
          />
        )}
      </div>
    </div>
  );
}

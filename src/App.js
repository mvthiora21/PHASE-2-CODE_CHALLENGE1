import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Tag from "./components/Tag";
import Search from "./components/Search";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionTable from "./components/TransactionTable";
import Transactions from "./components/Transactions";
import Sort from "./components/Sort";

function App() {
  const [formIsShowing, setFormIsShowing] = useState(true);
  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/transactions");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setTransactions(data);
        setFilteredTransactions(data);
        setSortedTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleSort(sortBy) {
    let sortedTransactionsCopy = [...filteredTransactions];
    if (sortBy === "category") {
      sortedTransactionsCopy.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "description") {
      sortedTransactionsCopy.sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === "amount") {
      sortedTransactionsCopy.sort((a, b) => b.amount - a.amount);
    }
    setSortedTransactions(sortedTransactionsCopy);
  }

  function handleSetNewTransaction(transaction) {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    setFilteredTransactions((prevFilteredTransactions) => [...prevFilteredTransactions, transaction]);
    setSortedTransactions((prevSortedTransactions) => [...prevSortedTransactions, transaction]);
  }

  function handleShowForm() {
    setFormIsShowing((show) => !show);
  }

  async function deleteTransaction(id) {
    try {
      const res = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log(`Transaction with ID ${id} deleted successfully!`);
        const newFilteredTransactions = filteredTransactions.filter((transaction) => transaction.id !== id);
        const newSortedTransactions = sortedTransactions.filter((transaction) => transaction.id !== id);
        setFilteredTransactions(newFilteredTransactions);
        setSortedTransactions(newSortedTransactions);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  function handleDeleteTransaction(id) {
    deleteTransaction(id);
  }

  useEffect(() => {
    const filteredTrans = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filteredTrans);
  }, [query, transactions]);

  return (
    <>
      <Header>
        <Tag />
        <Logo />
        <Search query={query} setQuery={setQuery} />
      </Header>

      <div className="sub-header">
        <Sort transactions={filteredTransactions} onSort={handleSort} />
        <button className="open-form btn" onClick={handleShowForm}>
          {formIsShowing ? "Close Form" : "Add Transaction"}
        </button>
      </div>

      <Transactions>
        {isLoading ? (
          <h1>LOADING...</h1>
        ) : (
          <TransactionTable
            transactions={sortedTransactions}
            onDelete={handleDeleteTransaction}
            handleSort={handleSort}
          />
        )}
        {formIsShowing && (
          <AddTransactionForm
            onSetNewTransaction={handleSetNewTransaction}
          />
        )}
      </Transactions>
    </>
  );
}

export default App;

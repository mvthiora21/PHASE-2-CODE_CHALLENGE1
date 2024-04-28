import React, { useState } from "react";

function AddTransactionForm({ onSetNewTransaction }) {
  const [transaction, setTransaction] = useState({
    category: "",
    description: "",
    amount: "",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transaction.category || !transaction.description || !transaction.amount || !transaction.date) return;

    const newTransaction = {
      ...transaction,
      amount: parseFloat(transaction.amount)
    };

    onSetNewTransaction(newTransaction);

    setTransaction({
      category: "",
      description: "",
      amount: "",
      date: ""
    });
  };

  return (
    <div>
      <form className="add-transaction" onSubmit={handleSubmit}>
        <h1 className="form-title">Add a transaction</h1>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          className="transaction-input"
          value={transaction.category}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          className="transaction-input"
          value={transaction.description}
          onChange={handleChange}
          required
        />
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          className="transaction-input"
          value={transaction.amount}
          onChange={handleChange}
          required
        />
        <label>Date:</label>
        <input
          type="date"
          name="date"
          className="transaction-input"
          value={transaction.date}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn btn">Submit</button>
      </form>
    </div>
  );
}

export default AddTransactionForm;

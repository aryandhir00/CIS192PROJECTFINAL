import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import './Home.css';


interface Transaction {
    _id: number;
    name: string;
    amount: number; 
    summary: string;
  }


function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [summary, setSummary] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [budget, setBudget] = useState(0);
    const [finalBudget, setFinalBudget] = useState(0);

    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    




    const navigate = useNavigate();

    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:3000/account/loggedin', {withCredentials: true});
            const isLoggedIn = response.data.isLoggedIn;
            if (!isLoggedIn) {
                navigate('/login');
            }

            const budgetResponse = await axios.get('http://localhost:3000/account/budget', {withCredentials: true});
            setFinalBudget(budgetResponse.data.budget);
            
            const transactionsResponse = await axios.get('http://localhost:3000/api/transactions', {withCredentials: true});
            setTransactions(transactionsResponse.data);


          } catch (error) {
            console.error('Error checking authentication:', error);
          }
        }
    
        fetchData();
        // const intervalId = setInterval(fetchData, 2000);
        // return () => clearInterval(intervalId); 
    
      }, []);
    

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/account/logout', {

            }, {withCredentials: true});
            console.log('Logout successful:', response.data);
            navigate('/login');
          } catch (error) {
            alert("Log Out error")
            console.error('Unable to log out');
          }
    };
    const handleTransaction = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/transactions/add', {name, amount, summary}, {withCredentials: true});
          console.log('Added transaction:', response.data);
          setModalOpen(false)
          setTransactions((txns) => [...txns, response.data])
        } catch (error) {
          console.error('Unable to add transaction');
        }
      };

      const handleBudget = async () => {
        try {
          const response = await axios.put('http://localhost:3000/account/budget', {budget}, {withCredentials: true});
          console.log('Added transaction:', response.data);
          setFinalBudget(response.data.budget)
        } catch (error) {
          console.error('Unable to set budget');
        }
      };

    
    
        return (
            <div>
                <h1>Amount spent</h1>
                {totalAmount}
                <h1>Budget</h1>
                <p> {finalBudget} dollars</p>
                <input
                 type="number"
                 placeholder="Enter budget in dollars"
                 value={budget}
                 onChange={( (e) => setBudget(parseInt(e.target.value)))}
            
                />
                <button type="submit" onClick={handleBudget}>Set Budget</button>
                <button type="submit" onClick={handleLogout}>Log Out</button>
                <button onClick={() => setModalOpen(true)}>Add Transaction</button>
    
                <Modal
                 isOpen={modalOpen}
                 onRequestClose={() => setModalOpen(false)}
    
    
         >
                <h1>Add Transaction</h1>
                <input
                 type="text"
                 placeholder="Enter transaction name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
            
                />
                <input
                 type="number"
                 placeholder="Enter transaction amount"
                 value={amount}
                 onChange={(e) => setAmount(parseInt(e.target.value))}
            
                />
                <input
                 type="text"
                 placeholder="Enter transaction summary"
                 value={summary}
                 onChange={(e) => setSummary((e.target.value))}
            
                />
                
                <button onClick={handleTransaction}>Submit</button>
    
    
    
    
           <button onClick={() => setModalOpen(false)}>Close</button>
         </Modal>
            
                <h1>Transactions</h1>
                {transactions.map((transaction) => (
                    <p key={transaction._id} style={{ cursor: 'pointer' }}>
                        <p>Name: {transaction.name} Amount: {transaction.amount} Summary: {transaction.summary}</p>
                    </p>
                  ))}
                
    
            </div>
        );
    }
        


export default Home;
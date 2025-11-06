// import React, { useEffect } from 'react'
// import styled from 'styled-components'
// import { useGlobalContext } from '../../context/globalContext';
// import History from '../../History/History';
// import { InnerLayout } from '../../styles/Layouts';
// import { dollar } from '../../utils/Icons';
// import Chart from '../Chart/Chart';

// function Dashboard() {
//     const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

//     useEffect(() => {
//         // Fetch incomes and expenses when Dashboard mounts
//         const fetchData = async () => {
//             await getIncomes();
//             await getExpenses();
//         };
//         fetchData();
//     }, [getIncomes, getExpenses]);

//     // Safe calculation for min/max if incomes/expenses are not empty
//     const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
//     const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
//     const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
//     const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

//     return (
//         <DashboardStyled>
//             <InnerLayout>
//                 <h1>All Transactions</h1>
//                 <div className="stats-con">
//                     <div className="chart-con">
//                         <Chart />
//                         <div className="amount-con">
//                             <div className="income">
//                                 <h2>Total Income</h2>
//                                 <p>
//                                     {dollar} {totalIncome()}
//                                 </p>
//                             </div>
//                             <div className="expense">
//                                 <h2>Total Expense</h2>
//                                 <p>
//                                     {dollar} {totalExpenses()}
//                                 </p>
//                             </div>
//                             <div className="balance">
//                                 <h2>Total Balance</h2>
//                                 <p>
//                                     {dollar} {totalBalance()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="history-con">
//                         <History />
//                         <h2 className="salary-title">Min <span>Salary</span>Max</h2>
//                         <div className="salary-item">
//                             <p>
//                                 ${minIncome}
//                             </p>
//                             <p>
//                                 ${maxIncome}
//                             </p>
//                         </div>
//                         <h2 className="salary-title">Min <span>Expense</span>Max</h2>
//                         <div className="salary-item">
//                             <p>
//                                 ${minExpense}
//                             </p>
//                             <p>
//                                 ${maxExpense}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </InnerLayout>
//         </DashboardStyled>
//     )
// }

// const DashboardStyled = styled.div`
//     .stats-con{
//         display: grid;
//         grid-template-columns: repeat(5, 1fr);
//         gap: 2rem;
//         .chart-con{
//             grid-column: 1 / 4;
//             height: 400px;
//             .amount-con{
//                 display: grid;
//                 grid-template-columns: repeat(4, 1fr);
//                 gap: 2rem;
//                 margin-top: 2rem;
//                 .income, .expense{
//                     grid-column: span 2;
//                 }
//                 .income, .expense, .balance{
//                     background: #FCF6F9;
//                     border: 2px solid #FFFFFF;
//                     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//                     border-radius: 20px;
//                     padding: 1rem;
//                     p{
//                         font-size: 3.5rem;
//                         font-weight: 700;
//                     }
//                 }

//                 .balance{
//                     grid-column: 2 / 4;
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: center;
//                     align-items: center;
//                     p{
//                         color: var(--color-green);
//                         opacity: 0.6;
//                         font-size: 4.5rem;
//                     }
//                 }
//             }
//         }

//         .history-con{
//             grid-column: 4 / -1;
//             h2{
//                 margin: 1rem 0;
//                 display: flex;
//                 align-items: center;
//                 justify-content: space-between;
//             }
//             .salary-title{
//                 font-size: 1.2rem;
//                 span{
//                     font-size: 1.8rem;
//                 }
//             }
//             .salary-item{
//                 background: #FCF6F9;
//                 border: 2px solid #FFFFFF;
//                 box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//                 padding: 1rem;
//                 border-radius: 20px;
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 p{
//                     font-weight: 600;
//                     font-size: 1.6rem;
//                 }
//             }
//         }
//     }
// `;

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import History from '../../History/History';
import Chart from '../Chart/Chart';
import Navigation from '../Navigation/Navigation'; // Import navigation here

const BASE_URL = "http://localhost:5000/api/transactions";

function Dashboard() {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [active, setActive] = useState(1); // for navigation highlighting

    useEffect(() => {
        const fetchData = async () => {
            try {
                const incomeRes = await axios.get(`${BASE_URL}/get-incomes`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const expenseRes = await axios.get(`${BASE_URL}/get-expenses`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setIncomes(incomeRes.data);
                setExpenses(expenseRes.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalIncome = () => incomes.reduce((acc, item) => acc + item.amount, 0);
    const totalExpenses = () => expenses.reduce((acc, item) => acc + item.amount, 0);
    const totalBalance = () => totalIncome() - totalExpenses();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <DashboardLayout>
            <Navigation active={active} setActive={setActive} />
            <div className="dashboard-content">
                <div className="hero">
                    <div className="hero-text">
                        <h1>Welcome back</h1>
                        <p>Here’s a snapshot of your finances today.</p>
                    </div>
                    <div className="hero-balance">
                        <span>Current Balance</span>
                        <strong>${totalBalance()}</strong>
                    </div>
                    <div className="hero-actions">
                        <button onClick={() => window.location.hash = '#/incomes'}>Add Income</button>
                        <button className="secondary" onClick={() => window.location.hash = '#/expenses'}>Add Expense</button>
                    </div>
                </div>

                <div className="kpis">
                    <div className="kpi income">
                        <span>Total Income</span>
                        <strong>${totalIncome()}</strong>
                    </div>
                    <div className="kpi expense">
                        <span>Total Expense</span>
                        <strong>${totalExpenses()}</strong>
                    </div>
                    <div className="kpi balance">
                        <span>Net Balance</span>
                        <strong>${totalBalance()}</strong>
                    </div>
                </div>

                <div className="stats-con">
                    <div className="chart-con">
                        <Chart incomes={incomes} expenses={expenses} />
                    </div>
                    <div className="history-con">
                        <History incomes={incomes} expenses={expenses} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

const DashboardLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .dashboard-content {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
    }

    .hero {
        position: relative;
        display: grid;
        grid-template-columns: 1.5fr 1fr auto;
        gap: 1rem;
        align-items: center;
        background: linear-gradient(135deg, #e0eafc, #cfdef3);
        border-radius: 20px;
        padding: 1.2rem 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 6px 18px rgba(0,0,0,0.06);

        .hero-text h1 {
            margin: 0;
            font-size: 1.6rem;
        }
        .hero-text p {
            margin: .25rem 0 0;
            color: rgba(34,34,96,.7);
        }
        .hero-balance {
            justify-self: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .25rem;
        }
        .hero-balance span {
            font-size: .9rem;
            color: rgba(34,34,96,.7);
        }
        .hero-balance strong {
            font-size: 2rem;
            color: #222260;
        }
        .hero-actions {
            display: flex;
            gap: .5rem;
        }
        .hero-actions button {
            border: none;
            border-radius: 10px;
            padding: .6rem .9rem;
            background: #4a90e2;
            color: #fff;
            cursor: pointer;
            box-shadow: 0 6px 14px rgba(74,144,226,.25);
        }
        .hero-actions button.secondary {
            background: #00b894;
            box-shadow: 0 6px 14px rgba(0,184,148,.25);
        }
    }

    .kpis {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    .kpi {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
        border-radius: 16px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: .35rem;
    }
    .kpi span { color: rgba(34,34,96,.7); }
    .kpi strong { font-size: 1.6rem; }

    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        padding-bottom: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 420px;
        }

        .history-con {
            grid-column: 4 / -1;
        }
    }
`;

export default Dashboard;

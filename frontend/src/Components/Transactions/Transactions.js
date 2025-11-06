import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:5000/api/transactions";

function Transactions() {
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all | income | expense
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [incRes, expRes] = await Promise.all([
          axios.get(`${BASE_URL}/get-incomes`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get(`${BASE_URL}/get-expenses`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        ]);
        setIncomes(incRes.data || []);
        setExpenses(expRes.data || []);
      } catch (e) {
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const rows = useMemo(() => {
    const formatted = [
      ...incomes.map(i => ({
        id: i._id,
        type: 'income',
        title: i.title,
        category: i.category,
        amount: Number(i.amount),
        date: i.date,
        description: i.description
      })),
      ...expenses.map(e => ({
        id: e._id,
        type: 'expense',
        title: e.title,
        category: e.category,
        amount: Number(e.amount),
        date: e.date,
        description: e.description
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return formatted.filter(r => {
      const matchesType = typeFilter === 'all' || r.type === typeFilter;
      const q = query.trim().toLowerCase();
      const matchesQ = !q || `${r.title} ${r.category} ${r.description}`.toLowerCase().includes(q);
      return matchesType && matchesQ;
    });
  }, [incomes, expenses, typeFilter, query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Page>
      <nav className="nav-container">
        <Navigation active={active} setActive={setActive} />
      </nav>
      <Content>
        <div className="header">
          <div>
            <h1>Transactions</h1>
            <p className="sub">Browse, filter and search across all entries</p>
          </div>
          <button className="back" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>

        <Controls>
          <div className="segmented">
            <button className={typeFilter==='all' ? 'active': ''} onClick={() => setTypeFilter('all')}>All</button>
            <button className={typeFilter==='income' ? 'active': ''} onClick={() => setTypeFilter('income')}>Income</button>
            <button className={typeFilter==='expense' ? 'active': ''} onClick={() => setTypeFilter('expense')}>Expense</button>
          </div>
          <input
            className="search"
            placeholder="Search title, category or note"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Controls>

        <TableCard>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th className="right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={5} className="empty">No results</td></tr>
              ) : rows.map(r => (
                <tr key={r.id}>
                  <td>
                    <span className={`pill ${r.type}`}>{r.type}</span>
                  </td>
                  <td>{r.title}</td>
                  <td className="muted">{r.category}</td>
                  <td className="muted">{new Date(r.date).toLocaleDateString()}</td>
                  <td className={`right ${r.type}`}>{r.type === 'income' ? '+' : '-'}${r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </Content>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  
  .nav-container {
    width: 250px;
    background-color: #fff;
    border-right: 1px solid #e0e0e0;
    height: 100vh;
    overflow-y: auto;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .sub { color: rgba(34,34,96,.65); margin-top: .25rem; }
  .back {
    background: #4a90e2; color: #fff; border: none; border-radius: 10px;
    padding: .5rem .9rem; cursor: pointer;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  .segmented { background: #fff; border-radius: 12px; padding: .25rem; box-shadow: 0 1px 12px rgba(0,0,0,.06); }
  .segmented button { border: none; background: transparent; padding: .5rem .8rem; border-radius: 8px; cursor: pointer; }
  .segmented button.active { background: #e9f2ff; color: #1f6feb; }
  .search { flex: 1; border-radius: 10px; border: 2px solid rgba(34,34,96,.2); padding: .6rem .8rem; }
`;

const TableCard = styled.div`
  background: #fff; border-radius: 16px; box-shadow: 0 1px 15px rgba(0,0,0,.08);
  overflow: hidden;

  table { width: 100%; border-collapse: collapse; }
  thead { background: #f6f8fa; }
  th, td { padding: .9rem 1rem; text-align: left; }
  .right { text-align: right; }
  .muted { color: rgba(34,34,96,.65); }
  tbody tr:not(:last-child) { border-bottom: 1px solid #eee; }
  .empty { text-align: center; color: rgba(34,34,96,.65); }

  .pill { padding: .2rem .55rem; border-radius: 999px; font-size: .8rem; }
  .pill.income { background: #e7f8ef; color: #138a49; }
  .pill.expense { background: #fdecea; color: #b42318; }

  td.income { color: #138a49; }
  td.expense { color: #b42318; }
`;

export default Transactions;



// import React, {useState, useMemo} from 'react';
// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import styled from "styled-components";
// import bg from './img/bg.png'
// import {MainLayout} from './styles/Layouts'
// import Orb from './Components/Orb/Orb'
// import Navigation from './Components/Navigation/Navigation'
// import Dashboard from './Components/Dashboard/Dashboard';
// import Income from './Components/Income/Income'
// import Expenses from './Components/Expenses/Expenses';
// import { useGlobalContext } from './context/globalContext';
// import Signup from './pages/signup';
// import Login from './pages/login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
        
//         <Route path="/Adminlogin" element={<Signup/>} />
//         <Route path="/Userlogin" element={<Login />} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// function App() {
//   const [active, setActive] = useState(1)

//   const global = useGlobalContext()
//   console.log(global);

//   const displayData = () => {
//     switch(active){
//       case 1:
//         return <Dashboard/>
//       case 2:
//         return <Dashboard />
     
//       case 3:
//         return <Income />
//       case 4: 
//         return <Expenses />
//       default: 
//         return <Dashboard />
//     }
//   }

//   const orbMemo = useMemo(() => {
//     return <Orb />
//   },[])

//   return (
//     <AppStyled bg={bg} className="App">
//       {orbMemo}
//       <MainLayout>
//         <Navigation active={active} setActive={setActive} />
//         <main>
//           {displayData()}
//         </main>
//       </MainLayout>
//     </AppStyled>
//   );
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   position: relative;
//   main{
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar{
//       width: 0;
//     }
//   }
// `;

// export default App;
// import React, { useState, useMemo } from 'react'
// import styled from 'styled-components'
// import bg from './img/bg.png'
// import { MainLayout } from './styles/Layouts'
// import Orb from './Components/Orb/Orb'
// import Navigation from './Components/Navigation/Navigation'
// import Dashboard from './Components/Dashboard/Dashboard'
// import Income from './Components/Income/Income'
// import Expenses from './Components/Expenses/Expenses'
// import { useGlobalContext } from './context/globalContext'
// import Signup from './Components/Signup/Signup'
// import Signin from './Components/Signin/Signin'

// function App() {
//   const [active, setActive] = useState(1)
//   const global = useGlobalContext()

//   const displayData = () => {
//     switch (active) {
//       case 1:
//         return <Signup />
//       case 2:
//         return <Signin />
//       case 3:
//         return <Dashboard />
//       case 4:
//         return <Income />
//       case 5:
//         return <Expenses />
//       default:
//         return <Signup />
//     }
//   }

//   const orbMemo = useMemo(() => <Orb />, [])

//   return (
//     <AppStyled bg={bg}>
//       {orbMemo}
//       <MainLayout>
//         <Navigation active={active} setActive={setActive} />
//         <main>
//           {displayData()}
//         </main>
//       </MainLayout>
//     </AppStyled>
//   )
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   background-size: cover;
//   background-position: center;
//   position: relative;
//   box-sizing: border-box;

//   main {
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #ffffff;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     padding: 2rem;
//     &::-webkit-scrollbar {
//       width: 0;
//     }
//   }
// `

// export default App

// Import necessary libraries
// import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signup from './pages/Signup'; // Match PascalCase
// import Login from './pages/Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
//import Icons from './utils/Icons';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Transactions from './Components/Transactions/Transactions';
import Chart from './Components/Chart/Chart';
import History from './History/History';
import IncomeItem from './Components/IncomeItem/IncomeItem';
import Calculator from './Components/Calculator/Calculator';
import ReportGenerator from './Components/Report/ReportGenerator';
import StockNews from './Components/Stock/StockNews';
// removed GlobalProvider usage



import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [active, setActive] = useState(1); // Default to Dashboard (id: 1)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track if the user is logged in
  const navigate = useNavigate();

  // Check if the user has a token (indicating they are logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
      setActive(1); // Set to Dashboard when logged in
    }
  }, []);

  // Handle login and redirect to dashboard
  const handleLogin = (loginSuccess) => {
    if (loginSuccess) {
      setIsLoggedIn(true); // Set logged in status
      setActive(1); // Set to Dashboard
      navigate('/app'); // Redirect to dashboard
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />; // Dashboard
      case 2:
        return <Transactions />; // Transactions
      case 3:
        return <Income />; // Incomes
      case 4:
        return <Expenses />; // Expenses
      case 5:
        return <Calculator />; // Calculator
      case 6:
        return <ReportGenerator />; // Report
      case 7:
        return <StockNews />; // Stock news
      default:
        return <Dashboard />;
    }
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          
          {/* Main App Route - Single entry point with Navigation */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppStyled bg={bg} className="App">
                  {orbMemo}
                  <MainLayout>
                    <Navigation active={active} setActive={setActive} />
                    <main>{displayData()}</main>
                  </MainLayout>
                </AppStyled>
              </ProtectedRoute>
            }
          />
          
          {/* Redirect all other routes to /app */}
          <Route path="/dashboard" element={<Navigate to="/app" replace />} />
          <Route path="/transactions" element={<Navigate to="/app" replace />} />
          <Route path="/incomes" element={<Navigate to="/app" replace />} />
          <Route path="/expenses" element={<Navigate to="/app" replace />} />
          <Route path="/calculator" element={<Navigate to="/app" replace />} />
          <Route path="/report" element={<Navigate to="/app" replace />} />
          <Route path="/stock" element={<Navigate to="/app" replace />} />
        </Routes>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;

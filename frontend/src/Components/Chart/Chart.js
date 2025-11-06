// import React from 'react'
// import {Chart as ChartJs, 
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// } from 'chart.js'

// import {Line} from 'react-chartjs-2'
// import styled from 'styled-components'
// //import { useGlobalContext } from '../../context/globalContext'
// import { dateFormat } from '../../utils/dateFormat'

// ChartJs.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
// )

// function Chart() {
//     const {incomes, expenses} = useGlobalContext()

//     const data = {
//         labels: incomes.map((inc) =>{
//             const {date} = inc
//             return dateFormat(date)
//         }),
//         datasets: [
//             {
//                 label: 'Income',
//                 data: [
//                     ...incomes.map((income) => {
//                         const {amount} = income
//                         return amount
//                     })
//                 ],
//                 backgroundColor: 'green',
//                 tension: .2
//             },
//             {
//                 label: 'Expenses',
//                 data: [
//                     ...expenses.map((expense) => {
//                         const {amount} = expense
//                         return amount
//                     })
//                 ],
//                 backgroundColor: 'red',
//                 tension: .2
//             }
//         ]
//     }


//     return (
//         <ChartStyled >
//             <Line data={data} />
//         </ChartStyled>
//     )
// }

// const ChartStyled = styled.div`
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     padding: 1rem;
//     border-radius: 20px;
//     height: 100%;
// `;

// export default 
import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat'; // Assuming you have a dateFormat function

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart({ incomes, expenses }) {
    // Debugging logs to check if expenses are correctly received
    console.log("Incomes Data:", incomes);
    console.log("Expenses Data:", expenses);

    // Map incomes and expenses to check data
    const incomeLabels = incomes.map((inc) => dateFormat(inc.date));
    const incomeAmounts = incomes.map((income) => income.amount);
    
    const expenseLabels = expenses.map((expense) => dateFormat(expense.date));
    const expenseAmounts = expenses.map((expense) => expense.amount);

    // Debugging logs to check if data is correctly mapped
    console.log("Income Labels:", incomeLabels);
    console.log("Income Amounts:", incomeAmounts);
    console.log("Expense Labels:", expenseLabels);
    console.log("Expense Amounts:", expenseAmounts);

    // Combine labels: if both have labels, use the union of both
    const labels = [...new Set([...incomeLabels, ...expenseLabels])];

    // Make sure both datasets have data for all labels
    const incomeData = labels.map(label => incomeAmounts[incomeLabels.indexOf(label)] || 0);
    const expenseData = labels.map(label => expenseAmounts[expenseLabels.indexOf(label)] || 0);

    // Data for the combined chart
    const data = {
        labels: labels,  // Combined labels (income and expense)
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'green',  // Correct color for the income line
                tension: 0.2,
                fill: false,  // Ensure the line is not filled
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: 'red',  // Correct color for the expense line
                tension: 0.2,
                fill: false,  // Ensure the line is not filled
            },
        ],
    };

    return (
        <ChartStyled>
            <h3>Income vs Expenses</h3>
            <Line data={data} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;

    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    canvas {
        max-width: 100%;
        height: auto;
    }
`;

export default Chart;

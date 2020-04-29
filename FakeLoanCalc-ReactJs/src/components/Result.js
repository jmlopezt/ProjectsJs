import React from 'react';

const Result = (props) => (         
    <div className = "u-full-width result">
        <h2>Summary</h2>
        <p>The requested loan is: {props.amount} €</p>
        <p>Deadline is: {props.deadline} Months</p>
        <p>Monthly Payment: {(props.totalLoan/props.deadline).toFixed(3)} €</p>
        <p>Total Payment: {props.totalLoan} €</p>
    </div> 
);

export default Result;
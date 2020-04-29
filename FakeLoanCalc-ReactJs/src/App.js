import React, { Fragment, useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Result from './components/Result.js';
import Message from './components/Message.js';
import Spinner from './components/Spinner.js';

function App() {

  const [amount, getAmount] = useState(0);
  const [deadline, getDeadline] = useState('');
  const [totalLoan, getTotalLoan] = useState(0);
  const [spinner, handleSpinner] = useState(false);

  let component;
  if (spinner) {
    component = <Spinner />
  }else if (totalLoan === 0) {
    component = <Message />
  } else {
    component = <Result 
      totalLoan = {totalLoan}
      deadline = {deadline}
      amount = {amount}
    />
  }

  return (
    <Fragment>
      <Header
        title = "Loan Taxes Calculator"
        description = "Use it !"
      />
      <div className = "container">
        <Form
          amount = {amount}
          getAmount = {getAmount}
          deadline = {deadline}
          getDeadline = {getDeadline}
          totalLoan = {totalLoan}
          getTotalLoan = {getTotalLoan}
          handleSpinner = {handleSpinner}
        />
        <div className = "messages">
          {component}
        </div>
      
      </div>
    </Fragment>
  );
}

export default App;

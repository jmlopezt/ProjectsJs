import React, {useState, Fragment} from 'react';
import { calculateLoanTaxes } from '../helpers.js'


const Form = (props) => {

    const {amount, getAmount, deadline, getDeadline, getTotalLoan, handleSpinner} = props;

    const [error, handleError] = useState(false);

    const calculateLoan = e => {
        e.preventDefault();

        if (amount === 0  || amount === '') {
            handleError(true);
            return;
        }
        handleError(false);
        handleSpinner(true);

        setTimeout(() => {
            const total = amount + calculateLoanTaxes(amount, deadline);
            getTotalLoan(total);

            handleSpinner(false);
        }, 2000);


    }

    return( 
        <Fragment>       
            <form onSubmit = {calculateLoan}>
            <div className="row">
                <div>
                    <label>Loan Amount</label>
                    <input 
                        className="u-full-width" 
                        type="number" 
                        placeholder="For instance: 3000" 
                        onChange = { (e) =>getAmount(parseInt(e.target.value)) }
                    />
                </div>
                <div>
                    <label>Payment deadline</label>
                    <select 
                        className="u-full-width"
                        onChange = { (e) => getDeadline(e.target.value) }
                    >
                        <option value="">Select</option>
                        <option value="3">3 month</option>
                        <option value="6">6 month</option>
                        <option value="12">12 month</option>
                        <option value="24">24 month</option>
                    </select>
                </div>
                <div>
                    <input 
                        type="submit" 
                        value="Calculate" 
                        className="button-primary u-full-width" 
                    />
                </div>
            </div>
            </form>
            { (error) ? <p className = "error"> All the fields are mandatory</p>: null}
            
        </Fragment> 
    )
};

export default Form;
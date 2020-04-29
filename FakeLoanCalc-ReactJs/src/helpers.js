export function calculateLoanTaxes(amount, deadline) {
    let totalTaxes;
    if (amount <= 1000) {
        totalTaxes = amount * 0.25;
    } else if (amount >1000 && amount <= 6000){
        totalTaxes = amount * 0.2;
    } else if(amount >6000 && amount <= 15000){
        totalTaxes = amount * 0.15;
    } else if(amount >15000){
        totalTaxes = amount * 0.1;
    }
    

    switch (deadline) {
        case 3:
            totalTaxes += totalTaxes*1.05;
            break;
        case 6:
            totalTaxes += totalTaxes*1.10;
            break;
        case 12:
            totalTaxes += totalTaxes*1.15;
            break;
        case 24:
            totalTaxes += totalTaxes*1.20;
            break;
        default:
            break;
    }

    return totalTaxes;
}
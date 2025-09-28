console.log("Script loaded");

// Constants
const highdebtToValueThreshold = 70 / 100;
const lowDebtToValueThreshold = 50 / 100;
const debtToSalaryThreshold = 4.5;
const stampFee = 825;

// From Form Fields
// NB: placeholder values for now, replace with form field values
let interestRate = 3 / 100;
let monthlyPretaxSalary = [4000, 35000];
let finalPrize = 8800000;
let downPayment = 3277000 + 500000;
let fee = 3000;
// Taxeringsvärde
let taxationValue = 7467000;
// Inteckningar
let mortgage = 2551100;

// Calculations
let debt = finalPrize - downPayment;
let combinedPretaxSalary = monthlyPretaxSalary.reduce((a, b) => a + b);

let debtToValueRatio = (1 - (downPayment / finalPrize)).toFixed(2);
let debtToSalaryFactor = (debt / (12 * combinedPretaxSalary)).toFixed(1);

// Checks and tests

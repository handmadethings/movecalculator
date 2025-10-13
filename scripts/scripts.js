// NAVBAR
const navbarToggle = navbar.querySelector('#navbar-toggle');
const navbarMenu = document.querySelector('#navbar-menu');
const navbarLinksContainer = navbarMenu.querySelector('.navbar-links');
let isNavbarExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';

function toggleNavbarVisibility() {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute('aria-expanded', isNavbarExpanded);
};

navbarToggle.addEventListener('click', toggleNavbarVisibility);
navbarLinksContainer.addEventListener('click', (e) => e.stopPropagation());
navbarMenu.addEventListener('click', toggleNavbarVisibility);
// END NAVBAR

// MAIN APP
// Constant values
const highdebtToValueThreshold = 70 / 100;
const lowDebtToValueThreshold = 50 / 100;
const debtToSalaryThreshold = 4.5;
const stampFee = 825;


// Variables
let noOfApplicantsFields = 1;


// Constant DOM elements
const purchaseForm = document.getElementById('purchase-calculator-form');
const addApplicantBtn = document.getElementById('add-applicant-btn');
const deleteApplicantBtn = document.getElementById('delete-applicant-btn')
const applicantsFieldsdiv = document.getElementById('applicants-fields');


// autoNumeric initializations
const interestRateInput = new AutoNumeric(document.querySelector('#interest-rate'), {
    alwaysAllowDecimalCharacter: true,
    decimalCharacter: ",",
    digitGroupSeparator: " ",
    suffixText: "%"
});

const purchasePrize = new AutoNumeric(document.querySelector('#purchase-prize'), {
    alwaysAllowDecimalCharacter: false,
    digitGroupSeparator: " ",
    suffixText: " kr"
});

const downPayment = new AutoNumeric(document.querySelector('#down-payment'), {
    alwaysAllowDecimalCharacter: false,
    digitGroupSeparator: " ",
    suffixText: " kr"
});



// variables from Form Fields
// NB: placeholder values for now, replace with form field values
// let interestRate = 3 / 100;
let monthlyPretaxSalary = [4000, 35000];
let fee = 3000;
// Taxeringsvärde
let taxationValue = 7467000;
// Inteckningar
let mortgage = 2551100;

// Calculations
let debt = purchasePrize - downPayment;
let combinedPretaxSalary = monthlyPretaxSalary.reduce((a, b) => a + b);

let debtToValueRatio = (1 - (downPayment / purchasePrize)).toFixed(2);
let debtToSalaryFactor = (debt / (12 * combinedPretaxSalary)).toFixed(1);


let amortizationRate = 0;

if (debtToValueRatio > highdebtToValueThreshold) {
    console.log('Belåningsgrad över 70%');
    amortizationRate += 2;
} else if (debtToValueRatio > lowDebtToValueThreshold) {
    console.log('Belåningsgrad över 70%');
    amortizationRate += 1;
} else {
    console.log('Belåningsgrad under 50%');
}

console.log(`Årlig amortering efter belåningsgrad: ${amortizationRate}%`);

if (debtToSalaryFactor > debtToSalaryThreshold) {
    console.log('Skuldkvot över 4.5');
    amortizationRate += 1;
}

// let yearlyInterest = interestRate * debt;
let yearlyAmortization = (amortizationRate / 100) * debt;
// let totalMonthlyCost = ((yearlyInterest + yearlyAmortization) / 12).toFixed(0);
// console.log(`Månadskostnad: ${totalMonthlyCost}`);

let stampTax = 0.015 * Math.max(purchasePrize, taxationValue) + stampFee + 0.02 * (debt - mortgage);

console.log(`Stämpelskatt: ${stampTax}`);

// Functions
function showNewApplicantField() {
    if (noOfApplicantsFields > 3) {
        return;
    }
    console.log('Adding new applicant field');
    let applicantsFieldsdiv = document.getElementById('applicants-fields');
    const nextApplicantFieldDiv = applicantsFieldsdiv.querySelectorAll('.applicant-label-input')[noOfApplicantsFields - 1];
    nextApplicantFieldDiv.classList.remove('display-none');
    noOfApplicantsFields += 1;

    if (noOfApplicantsFields > 1) {
        console.log('No of applicants more than 1');
        deleteApplicantBtn.classList.remove('hidden');
    }
    console.log(`nOfApplicantsFields variable: ${noOfApplicantsFields}`);
};

function deleteExtraApplicantsFields() {
    // TODO: Set the fields' value to zero when hiding them
    console.log('Deleting extra applicants fields');
    let applicantsFieldsdiv = document.getElementById('applicants-fields');
    if (noOfApplicantsFields > 1) {
        const lastApplicantFieldDiv = applicantsFieldsdiv.querySelectorAll('.applicant-label-input')[noOfApplicantsFields - 2];
        lastApplicantFieldDiv.classList.add('display-none');
        lastApplicantFieldDiv.classList.add('test');
        noOfApplicantsFields -= 1;
    }
    if (noOfApplicantsFields === 1) {
        deleteApplicantBtn.classList.add('hidden');
    }

    console.log(`nOfApplicantsFields variable: ${noOfApplicantsFields}`);

}

function updateCalculation() {
    console.log('Calculation updated (by function)');
    const results = {};
    const interestRate = interestRateInput.getNumber() / 100;
    // Combined pretax salary
    const salaryInputs = document.querySelectorAll('.monthly-salaries-input');
    const salaryValues = Array.from(salaryInputs).map(input => Number(input.value));
    results[combinedPretaxSalary] = salaryValues.reduce((a, b) => a + b);
    results[interestRate] = interestRateInput.getNumber() / 100;
    console.log(results[combinedPretaxSalary]);
    console.log(results[interestRate]);
}


// Init and event listeners
addApplicantBtn.addEventListener('click', function(event) {
    showNewApplicantField();
})

deleteApplicantBtn.addEventListener('click', function(event) {
    deleteExtraApplicantsFields();
    updateCalculation();
})

purchaseForm.addEventListener('change', function(event) {
    updateCalculation();
})
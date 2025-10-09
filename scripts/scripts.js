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


// variables from Form Fields
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
console.log(`Belåningsgrad: ${debtToValueRatio * 100}%`);
console.log(`skuldkvot: ${debtToSalaryFactor}`);


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

let yearlyInterest = interestRate * debt;
let yearlyAmortization = (amortizationRate / 100) * debt;
let totalMonthlyCost = ((yearlyInterest + yearlyAmortization) / 12).toFixed(0);
console.log(`Månadskostnad: ${totalMonthlyCost}`);

let stampTax = 0.015 * Math.max(finalPrize, taxationValue) + stampFee + 0.02 * (debt - mortgage);

console.log(`Stämpelskatt: ${stampTax}`);

// Functions
function createNewApplicantField() {
    if (noOfApplicantsFields > 3) {
        return;
    }
    console.log('Adding new applicant field');
    let applicantsFieldsdiv = document.getElementById('applicants-fields');

    const newLabel = document.createElement('label');
    newLabel.htmlFor = `monthly-salary-${noOfApplicantsFields + 1}`;
    newLabel.textContent = `Månadslön för medsökande ${noOfApplicantsFields}`;
    newLabel.classList.add('monthly-salaries')
    const newInput = document.createElement('input');
    newInput.id = `monthly-salary-${noOfApplicantsFields + 1}`;
    newInput.type = 'number';
    newInput.inputmode = 'numeric';
    newInput.placeholder = 0;
    newInput.classList.add('monthly-salaries-input')
    applicantsFieldsdiv.appendChild(newLabel);
    applicantsFieldsdiv.appendChild(newInput);
    noOfApplicantsFields += 1;

    // TODO: Hide/unhide delete button
    const deleteApplicantBtn = document.getElementById('delete-applicant-btn')
    if (noOfApplicantsFields > 1) {
        console.log('No of applicants more than 1');
        deleteApplicantBtn.classList.remove('hidden');
    }
    console.log(`nOfApplicantsFields variable: ${noOfApplicantsFields}`);
};

function deleteExtraApplicantsFields() {
    console.log('Deleting extra applicants fields');
    const deleteApplicantBtn = document.getElementById('delete-applicant-btn')
    const applicantsFieldsdiv = document.getElementById('applicants-fields');
    const lastInput = applicantsFieldsdiv.querySelectorAll('input.monthly-salaries:last-child')[0];
    const lastLabel = applicantsFieldsdiv.querySelectorAll('label:last-of-type')[0];
    if (noOfApplicantsFields > 1) {
        lastInput.remove();
        lastLabel.remove();
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
    let interestRate = Number(document.querySelector('#interest-rate').value);
    // Combined pretax salary
    const salaryInputs = document.querySelectorAll('.monthly-salaries-input');
    const salaryValues = Array.from(salaryInputs).map(input => Number(input.value));
    results[combinedPretaxSalary] = salaryValues.reduce((a, b) => a + b);
}


// Init and event listeners
addApplicantBtn.addEventListener('click', function(event) {
    createNewApplicantField();
})

deleteApplicantBtn.addEventListener('click', function(event) {
    deleteExtraApplicantsFields();
    updateCalculation();
})

purchaseForm.addEventListener('change', function(event) {
    updateCalculation();
})
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-loan');
    const loanAmount = document.getElementById('loan-amount');
    const loanTerm = document.getElementById('loan-term');
    const interestRate = document.getElementById('interest-rate');
    const monthlyPayment = document.getElementById('monthly-payment');
    const loanResult = document.getElementById('loan-result');

    calculateBtn.addEventListener('click', function() {
        const principal = parseFloat(loanAmount.value);
        const years = parseFloat(loanTerm.value);
        const rate = parseFloat(interestRate.value) / 100 / 12;
        const months = years * 12;

        if (isNaN(principal) || isNaN(years) || isNaN(rate)) {
            alert('Por favor, ingrese valores válidos en todos los campos.');
            return;
        }

        const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        monthlyPayment.textContent = '$' + payment.toFixed(2);
        loanResult.classList.remove('hidden');
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});
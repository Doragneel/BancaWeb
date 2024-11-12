document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-loan');
    const loanAmount = document.getElementById('loan-amount');
    const loanTerm = document.getElementById('loan-term');
    const monthlyPayment = document.getElementById('monthly-payment');
    const loanResult = document.getElementById('loan-result');

    calculateBtn.addEventListener('click', function() {
        const principal = parseFloat(loanAmount.value);
        const months = parseFloat(loanTerm.value);
        const rate = 0.025 / 12; // Asumimos una tasa de interés del 2.5% mensual

        if (isNaN(principal) || isNaN(months) || principal < 500000 || principal > 25000000 || months < 1 || months > 36) {
            alert('Por favor, ingrese valores válidos. El monto debe estar entre $500,000 y $25,000,000, y el plazo entre 1 y 36 meses.');
            return;
        }

        const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        monthlyPayment.textContent = '$' + payment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
document.addEventListener('DOMContentLoaded', function() {
    const simulateBtn = document.getElementById('simulate-cdt');
    const investmentAmount = document.getElementById('investment-amount');
    const investmentTerm = document.getElementById('investment-term');
    const simulationResult = document.getElementById('simulation-result');
    const resultAmount = document.getElementById('result-amount');
    const resultTerm = document.getElementById('result-term');
    const resultRate = document.getElementById('result-rate');
    const resultEarnings = document.getElementById('result-earnings');
    const resultTotal = document.getElementById('result-total');

    simulateBtn.addEventListener('click', function() {
        const amount = parseFloat(investmentAmount.value);
        const term = parseInt(investmentTerm.value);

        if (isNaN(amount) || amount < 500000) {
            alert('Por favor, ingrese un monto válido (mínimo $500,000).');
            return;
        }

        // Tasas de interés simuladas (en la realidad, estas tasas vendrían de una API o base de datos)
        const rates = {
            30: 0.03,
            60: 0.035,
            90: 0.04,
            180: 0.045,
            360: 0.05,
            540: 0.055
        };

        const rate = rates[term];
        const earnings = amount * rate * (term / 360); // Cálculo simple de interés
        const total = amount + earnings;

        resultAmount.textContent = '$' + amount.toLocaleString('es-CO');
        resultTerm.textContent = term + ' días';
        resultRate.textContent = (rate * 100).toFixed(2) + '% E.A.';
        resultEarnings.textContent = '$' + earnings.toLocaleString('es-CO', {maximumFractionDigits: 0});
        resultTotal.textContent = '$' + total.toLocaleString('es-CO', {maximumFractionDigits: 0});

        simulationResult.classList.remove('hidden');
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
document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');
    let currentValue = '';
    let operator = '';
    let previousValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (value === 'C') {
                currentValue = '';
                operator = '';
                previousValue = '';
                display.textContent = '0';
            } else if ('+-*/'.includes(value)) {
                operator = value;
                previousValue = currentValue;
                currentValue = '';
            } else if (value === '=') {
                if (previousValue && currentValue && operator) {
                    currentValue = operate(parseFloat(previousValue), parseFloat(currentValue), operator);
                    display.textContent = currentValue;
                    previousValue = '';
                    operator = '';
                }
            } else {
                currentValue += value;
                display.textContent = currentValue;
            }
        });
    });

    function operate(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : 'Error';
            default: return b;
        }
    }
});
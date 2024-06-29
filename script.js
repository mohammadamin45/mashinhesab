document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');
    let currentExpression = '';
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentExpression || '0';
    }

    function handleInput(value) {
        if (value === 'C' || value === 'Delete') {
            currentExpression = '';
        } else if (value === '=') {
            try {
                const result = eval(currentExpression);
                currentExpression += '=' + result;
                shouldResetDisplay = true;
            } catch (error) {
                currentExpression = 'Error';
            }
        } else {
            if (shouldResetDisplay) {
                currentExpression = '';
                shouldResetDisplay = false;
            }
            if (value === '×') value = '*';
            if (value === '÷') value = '/';
            currentExpression += value;
        }
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.dataset.value);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if ('0123456789.+-*/'.includes(key) || key === 'Enter' || key === 'Escape' || key === 'Delete') {
            event.preventDefault();
            if (key === 'Enter') {
                handleInput('=');
            } else if (key === 'Escape') {
                handleInput('C');
            } else if (key === 'Delete') {
                handleInput('Delete');
            } else {
                handleInput(key);
            }
        }
    });

    updateDisplay();
});
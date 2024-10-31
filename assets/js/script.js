const imgLucro = '<img src="./assets/lucro.PNG" alt="Mascote Celebrando" />';
const imgPrejuizo = '<img src="./assets/prejuizo.PNG" alt="Mascote Triste" />';
const imgZero = '<img src="./assets/zero.PNG" alt="Mascote Confuso" />';

const spanLucro = '<span class="resultado lucrativo">Lucrativo</span>';
const spanPrejuizo = '<span class="resultado prejuizo">Prejuizo</span>';
const spanZero = '<span class="resultado zero">Zero</span>';

function formatCurrency(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
}

document.getElementById('credits').addEventListener('input', function() {
    this.value = formatCurrency(this.value);
});

document.getElementById('debits').addEventListener('input', function() {
    this.value = formatCurrency(this.value);
});

document.getElementById('price').addEventListener('input', function() {
    this.value = formatCurrency(this.value);
});

document.getElementById('calculate').addEventListener('click', function() {
    const creditsInput = document.getElementById('credits').value;
    const debitsInput = document.getElementById('debits').value;
    const priceInput = document.getElementById('price').value;
    const totalElement = document.getElementById('total');

    const errorCredits = document.getElementById('error-message-credits');
    const errorDebits = document.getElementById('error-message-debits');
    const errorPrice = document.getElementById('error-message-price');

    function parseInput(value) {
        return parseFloat(value.replace(/\./g, '').replace(',', '.'));
    }

    function validateNumber(value, errorElement, inputElement) {
        const parsedValue = parseInput(value);
        if (isNaN(parsedValue) || value === '' || parsedValue < 0) {
            errorElement.textContent = "Por favor, insira um número válido.";
            inputElement.classList.add('error');
            return false;
        } else {
            errorElement.textContent = "";
            inputElement.classList.remove('error');
            return true;
        }
    }

    const isCreditsValid = validateNumber(creditsInput, errorCredits, document.getElementById('credits'));
    const isDebitsValid = validateNumber(debitsInput, errorDebits, document.getElementById('debits'));
    const isPriceValid = validateNumber(priceInput, errorPrice, document.getElementById('price'));

    if (isCreditsValid && isDebitsValid && isPriceValid) {
        const credits = parseInput(creditsInput);
        const debits = parseInput(debitsInput);
        const price = parseInput(priceInput);
        const total = (credits - debits) / (credits / price);

        const formattedTotal = total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (total > 0) {
            totalElement.innerHTML = imgLucro + " R$ " + formattedTotal + " de lucro por litro de leite";
            totalElement.style.color = 'rgb(163, 184, 255)';
        } else if (total < 0) {
            totalElement.innerHTML = imgPrejuizo + " R$ " + formattedTotal + " de prejuízo por litro de leite";
            totalElement.style.color = 'rgb(255, 176, 176)';
        } else {
            totalElement.innerHTML = imgZero + " R$ " + formattedTotal + " nenhum lucro por litro de leite";
            totalElement.style.color = '#e1e2e3';
        }

        setTimeout(() => { 
            document.getElementById('credits').classList.add('hidden'); 
            document.getElementById('debits').classList.add('hidden'); 
            document.getElementById('price').classList.add('hidden');
            setTimeout(() => { 
                document.getElementById('credits').value = ''; 
                document.getElementById('debits').value = ''; 
                document.getElementById('price').value = '';  
                document.getElementById('credits').classList.remove('hidden'); 
                document.getElementById('debits').classList.remove('hidden'); 
                document.getElementById('price').classList.remove('hidden'); 
            }, 150);
        }, 3000);
    }
});




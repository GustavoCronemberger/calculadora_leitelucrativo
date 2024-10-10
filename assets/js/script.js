function formatCurrency(value) {
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, "");
    // Adiciona vírgula para os dois últimos dígitos
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    // Adiciona pontos como separadores de milhar
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

    totalElement.innerHTML = "R$ 0,00";

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
            totalElement.innerHTML = "R$ " + formattedTotal + " de lucro por litro de leite";
            totalElement.style.color = 'rgb(107, 149, 255)';
        } else if (total < 0) {
            totalElement.innerHTML = "R$ " + formattedTotal + " de prejuízo por litro de leite";
            totalElement.style.color = 'rgb(255, 90, 90)';
        } else {
            totalElement.innerHTML = "R$ " + formattedTotal + " de lucro por litro de leite";
            totalElement.style.color = '#e1e2e3';
        }
    }
});



/*document.getElementById('calculate').addEventListener('click', function() {
    const credits = parseFloat(document.getElementById('credits').value);
    const debits = parseFloat(document.getElementById('debits').value);
    const price = parseFloat(document.getElementById('price').value);
    const totalElement = document.getElementById('total');

    const errorCredits = document.getElementById('error-message-credits');
    const errorDebits = document.getElementById('error-message-debits');
    const errorPrice = document.getElementById('error-message-price');

    function validateNumber(value, errorElement, inputElement) {
        if (isNaN(value) || value === '' || value < 0) {
            errorElement.textContent = "Por favor, insira um número válido.";
            inputElement.classList.add('error');
            return false;
        } else {
            errorElement.textContent = "";
            inputElement.classList.remove('error');
            return true;
        }
    }

    // Reseta o total e as classes de estilo
    totalElement.innerHTML = "R$ 0,00";

    // Validação dos campos
    const isCreditsValid = validateNumber(credits, errorCredits, document.getElementById('credits'));
    const isDebitsValid = validateNumber(debits, errorDebits, document.getElementById('debits'));
    const isPriceValid = validateNumber(price, errorPrice, document.getElementById('price'));

    // Se todos os campos forem válidos, faz o cálculo
    if (isCreditsValid && isDebitsValid && isPriceValid) {
        const total = (credits - debits) / (credits / price);

        // Ajusta a cor com base no resultado
        if (total > 0) {
            totalElement.innerHTML = "R$ " + total.toFixed(2).replace('.', ',') + " de lucro por litro de leite";
            totalElement.style.color = 'rgb(107, 149, 255)';
        } else if(total < 0){
            totalElement.innerHTML = "R$ " + total.toFixed(2).replace('.', ',') + " de prejuízo por litro de leite";
            totalElement.style.color = 'rgb(255, 90, 90)';
        } else{
            totalElement.innerHTML = "R$ " + total.toFixed(2).replace('.', ',') + " de lucro por litro de leite";
            totalElement.style.color = '#e1e2e3';
        }
    }
});


/*
Valor total de leite = valor venda de leite / preço do litro do leite;

Lucro total = valor venda de leite - gastos mensais;

Lucro por litro de leite = Lucro total / Valor total de leite;

Obs: Produção Leite total mensal = valor recebido / preço litro do leite;

Obs: Custo por Litro de Leite = Preço litro do leite - Lucro por litro de leite;

Ideias:
Nova janela: gerar mais conteúdo: lucro, custo, recomendação.

Ícones Visuais: Adicionar mascote

Instruções Simples: Incluir instruções curtas e claras acima de cada campo de entrada, como "Digite o valor da venda do leite".

Botões Grandes: Aumentar o tamanho do botão "Calcular" para torná-lo mais visível e fácil de clicar.

Feedback Visual: Usar cores ou animações para indicar quando um campo foi preenchido corretamente ou se há um erro.

Texto de Ajuda: Adicionar texto de ajuda ou exemplos dentro dos campos de entrada que desaparecem quando o usuário começa a digitar, como "Ex: 1000" para "Valor venda do leite".

Confirmação de Resultado: Talvez usar uma mensagem mais destacada para o resultado, como "Seu lucro é de: R$ X".
*/

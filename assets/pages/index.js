document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede a página de recarregar

    // 1. CAPTURA DE DADOS
    const chargerType = document.getElementById('charger').value;
    const targetBattery = parseInt(document.getElementById('porcentage').value);
    const currentBattery = parseInt(document.getElementById('currentBattery').value);
    const clientType = document.getElementById('typeclient').value;
    const display = document.getElementById('result-display');

    // VALIDAÇÃO (Critério 1: Condicionais)
    if (currentBattery >= targetBattery) {
        alert("A bateria atual já é maior ou igual ao destino!");
        return;
    }

    // 2. DEFINIÇÃO DE VARIÁVEIS (Critério 5: Organização)
    let power = 0; // kW
    let pricePerKWh = 0;
    const batteryCapacity = 60; // Simulando um carro de 60kWh

    // CRITÉRIO 1: Uso de Switch para selecionar carregador
    switch (chargerType) {
        case 'low':
            power = 7;
            pricePerKWh = 1.20;
            break;
        case 'speed':
            power = 50;
            pricePerKWh = 1.60;
            break;
        case 'ultra':
            power = 150;
            pricePerKWh = 2.10;
            break;
    }

    // 3. LÓGICA DE TARIFÃÇÃO (Critério 4: Regras diferenciadas)
    // Regra: Horário de pico (Simulando que agora são 19h)
    const currentHour = new Date().getHours();
    let peakTax = 1.0;
    if (currentHour >= 18 && currentHour <= 21) {
        peakTax = 1.25; // 25% de acréscimo no horário de pico
    }

    // Regra: Desconto para assinante
    let discount = 0;
    if (clientType === 'premium') {
        discount = 0.15; // 15% de desconto
    }

    // 4. SIMULAÇÃO DA RECARGA (Critério 2 e 3: Loops e Lógica)
    let energyCharged = 0;
    let timeElapsed = 0; // em minutos
    
    // O Loop simula o progresso da carga de 1% em 1%
    console.log("Iniciando sessão de recarga...");
    for (let i = currentBattery; i <= targetBattery; i++) {
        // Cálculo simples de tempo (meramente ilustrativo para o simulador)
        timeElapsed += (batteryCapacity / power) * 0.6; 
        energyCharged = ((i - currentBattery) / 100) * batteryCapacity;
    }

    // 5. CÁLCULO FINAL
    const totalCost = (energyCharged * pricePerKWh * peakTax) * (1 - discount);

    // 6. SAÍDA FORMATADA (Critério 6: Estilo Sistema Real)
    display.innerHTML = `
        <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; border-left: 5px solid #00ff00; color: #333">
            <h3>⚡ Relatório de Sessão GoodWe</h3>
            <hr>
            <p><strong>Status:</strong> Concluído com Sucesso ✅</p>
            <p><strong>Energia Consumida:</strong> ${energyCharged.toFixed(2)} kWh</p>
            <p><strong>Tempo Estimado:</strong> ${timeElapsed.toFixed(0)} minutos</p>
            <p><strong>Taxa de Horário:</strong> ${peakTax > 1 ? 'Pico (+25%)' : 'Normal'}</p>
            <p><strong>Desconto Aplicado:</strong> ${discount * 100}%</p>
            <hr>
            <h2 style="color: #2ecc71">Total: R$ ${totalCost.toFixed(2)}</h2>
        </div>
    `;
});
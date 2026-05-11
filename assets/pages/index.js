document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede a página de recarregar

    // Pegando os dados do HTML e transformando em variável
    const chargerType = document.getElementById('charger').value;
    const targetBattery = parseInt(document.getElementById('porcentage').value);
    const currentBattery = parseInt(document.getElementById('currentBattery').value);
    const clientType = document.getElementById('typeclient').value;
    const display = document.getElementById('result-display');

    // Vê se a carga exigida é menor que a já existente
    if (currentBattery >= targetBattery) {
        alert("A bateria atual já é maior ou igual ao destino!");
        return;
    }

    // Definindo as variaveis
    let power = 0; // em kW
    let pricePerKWh = 0; // preço por KWh
    const batteryCapacity = 60; // Simulando um carro de 60kWh

    // para selecionar carregador
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

    // Realizando a tarifação
    // Horário de pico (Simulando que agora são 19h)
    const currentHour = new Date().getHours(); // pega o horário atual
    let peakTax = 1.0;
    if (currentHour >= 18 && currentHour <= 21) {
        peakTax = 1.25; // 25% de acréscimo no horário de pico
    }

    // Desconto para assinante
    let discount = 0;
    if (clientType === 'premium') { // Pega o valor do input
        discount = 0.15; // 15% de desconto
    }

    // Simulando a recarga
    let energyCharged = 0;
    let timeElapsed = 0; // tempo que demorou para carregar
    
    // Simula o progresso da carga de 1% em 1%
    console.log("Iniciando sessão de recarga...");
    for (let i = currentBattery; i <= targetBattery; i++) { // Pega a bateria atual e carrega até o valor desejado
        // Cálculo simples de tempo (ilustrativo para o simulador)
        timeElapsed += (batteryCapacity / power) * 0.6; 
        energyCharged = ((i - currentBattery) / 100) * batteryCapacity;
    }

    // Cálculo do custo total
    const totalCost = (energyCharged * pricePerKWh * peakTax) * (1 - discount);

    //Saída
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
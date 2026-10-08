function gerarTabela() {
    // Captura os valores dos inputs
    const pesoInput = document.getElementById('peso').value;
    const pontaInput = document.getElementById('ponta').value || 100;
    
    const peso = parseFloat(pesoInput);
    const ponta = parseFloat(pontaInput);
    
    const secao = document.getElementById('resultado-secao');
    const tabela = document.getElementById('tabela-spine');

    // --- VALIDAÇÃO DE SEGURANÇA ---
    if (!pesoInput || peso < 10) {
        alert("⚠️ Erro: O peso de puxada deve ser de no mínimo 10 lbs para um cálculo seguro.");
        return;
    }

    if (ponta < 70) {
        alert("⚠️ Erro: O peso da ponta deve ser de no mínimo 70 grains para evitar danos ao arco.");
        return;
    }
    // ------------------------------

    secao.classList.remove('hidden');
    
    let html = `<thead><tr><th>Libras</th>`;
    const comprimentos = [26, 27, 28, 29, 30, 31];
    
    // Cabeçalho de polegadas
    comprimentos.forEach(c => html += `<th>${c}"</th>`);
    html += `</tr></thead><tbody>`;

    // Gera variações de peso (evitando que a variação caia abaixo de 5 lbs para manter a lógica)
    const pesosVariacao = [peso - 4, peso - 2, peso, peso + 2, peso + 4];

    pesosVariacao.forEach(p => {
        // Ignora linhas com peso irrealmente baixo na tabela
        if (p >= 5) {
            html += `<tr><td><strong>${p} lbs</strong></td>`;
            comprimentos.forEach(c => {
                let res = 800 - (p * 5) + ((c - 28) * 40) - ((ponta - 100) * 0.5);
                let spineComercial = Math.round(res / 10) * 10;
                
                // Limita o spine a valores comerciais comuns (mínimo 250, máximo 1200)
                spineComercial = Math.max(250, Math.min(1200, spineComercial));
                
                html += `<td>${spineComercial}</td>`;
            });
            html += `</tr>`;
        }
    });

    html += `</tbody>`;
    tabela.innerHTML = html;
}
// Mensagem de boas-vindas ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    // Mostrar mensagem de boas-vindas
    showWelcomeMessage();
    
    // Adicionar efeitos de entrada
    addEntranceEffects();
});

// Função para mostrar mensagem de boas-vindas
function showWelcomeMessage() {
    // Criar elemento de mensagem
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = `
        <div class="welcome-content">
            <i class="fas fa-fire-flame-curved"></i>
            <h2>Seja bem-vindo à Calculadora de Churrasco!</h2>
            <p>Aplicativo desenvolvido para calcular a quantidade de Carne/Linguiça por pessoas para seu churrasco!</p>
            <p class="dev-credit">DEV. Thoomlira</p>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Adicionar estilos inline para a mensagem
    welcomeDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: welcomeFadeIn 0.5s ease-out;
    `;
    
    // Adicionar ao body
    document.body.appendChild(welcomeDiv);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (welcomeDiv.parentElement) {
            welcomeDiv.style.animation = 'welcomeFadeOut 0.5s ease-out';
            setTimeout(() => {
                if (welcomeDiv.parentElement) {
                    welcomeDiv.remove();
                }
            }, 500);
        }
    }, 5000);
}

// Função para adicionar efeitos de entrada
function addEntranceEffects() {
    const elements = document.querySelectorAll('.calculator-card, .info-card, .hero-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Função principal da calculadora
function calcularChurrasco() {
    const quantidadeInput = document.getElementById('quantidade');
    const quantidade = parseInt(quantidadeInput.value);
    const resultCard = document.getElementById('resultCard');
    const resultText = document.getElementById('resultText');
    
    // Validação
    if (!quantidade || quantidade <= 0) {
        showResult('Chamar a galera! 🎉', 'warning');
        return;
    }
    
    // Constante de gramas por pessoa
    const gramas = 400;
    let total = quantidade * gramas;
    let mensagem = '';
    let tipo = 'success';
    
    // Lógica da calculadora
    if (quantidade <= 2) {
        mensagem = `Sua quantidade é de ${total}g de Carne/Linguiça para ${quantidade} pessoa${quantidade > 1 ? 's' : ''}! 🥩`;
    } else if (quantidade > 3) {
        const totalKg = (total / 1000).toFixed(1);
        mensagem = `Sua quantidade é de ${totalKg}Kg de Carne/Linguiça para ${quantidade} pessoas! 🍖`;
    } else {
        mensagem = `Sua quantidade é de ${total}g de Carne/Linguiça para ${quantidade} pessoas! 🥩`;
    }
    
    // Mostrar resultado
    showResult(mensagem, tipo);
    
    // Adicionar efeito de confete para resultados válidos
    if (quantidade > 0) {
        createConfetti();
    }
}

// Função para mostrar resultado
function showResult(mensagem, tipo) {
    const resultCard = document.getElementById('resultCard');
    const resultText = document.getElementById('resultText');
    
    // Definir cor baseada no tipo
    let borderColor = '#ff6b35';
    if (tipo === 'warning') {
        borderColor = '#ff4757';
    }
    
    // Atualizar texto
    resultText.textContent = mensagem;
    
    // Atualizar estilo da borda
    resultCard.style.borderColor = borderColor;
    
    // Mostrar o card
    resultCard.classList.remove('hidden');
    
    // Adicionar efeito de entrada
    resultCard.style.animation = 'none';
    resultCard.offsetHeight; // Trigger reflow
    resultCard.style.animation = 'resultSlideIn 0.5s ease-out';
}

// Função para criar efeito de confete
function createConfetti() {
    const colors = ['#ff6b35', '#f7931e', '#ff4757', '#ffa502'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            // Remover confetti após animação
            setTimeout(() => {
                if (confetti.parentElement) {
                    confetti.remove();
                }
            }, 3000);
        }, i * 50);
    }
}

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes welcomeFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes welcomeFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .welcome-content {
        text-align: center;
        color: white;
        max-width: 500px;
        padding: 40px;
        position: relative;
    }
    
    .welcome-content i {
        font-size: 4rem;
        color: #ff6b35;
        margin-bottom: 20px;
        animation: iconPulse 2s ease-in-out infinite;
    }
    
    .welcome-content h2 {
        font-family: 'Orbitron', monospace;
        font-size: 2rem;
        margin-bottom: 20px;
        color: #f7931e;
    }
    
    .welcome-content p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    .dev-credit {
        font-weight: bold;
        color: #ff6b35;
        font-size: 1.2rem;
    }
    
    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 53, 0.2);
        border: 1px solid #ff6b35;
        color: #ff6b35;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .close-btn:hover {
        background: #ff6b35;
        color: white;
        transform: scale(1.1);
    }
    
    .input-container input:invalid {
        border: 1px solid #ff4757;
        box-shadow: 0 0 10px rgba(255, 71, 87, 0.3);
    }
    
    .calculate-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
    
    .calculate-btn:disabled:hover {
        transform: none;
        box-shadow: none;
    }
`;

document.head.appendChild(style);

// Adicionar validação em tempo real
document.getElementById('quantidade').addEventListener('input', function() {
    const btn = document.querySelector('.calculate-btn');
    const value = this.value;
    
    if (value && parseInt(value) > 0) {
        btn.disabled = false;
        btn.style.opacity = '1';
    } else {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    }
});

// Adicionar funcionalidade de Enter no input
document.getElementById('quantidade').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calcularChurrasco();
    }
});

// Efeito de hover nos cards de informação
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de clique no botão
document.querySelector('.calculate-btn').addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

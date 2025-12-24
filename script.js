class Navegacao {
    constructor() {
        this.contadorVisitas = 0;
        this.inicializar();
    }

    inicializar() {
        // Inicializar EmailJS
        this.inicializarEmailJS();
        this.criarTelas();
        this.mostrarTela('inicio');
        this.adicionarEventos();
        this.carregarContador();
    }

    inicializarEmailJS() {
        // Verificar se EmailJS está carregado
        if (typeof emailjs !== 'undefined') {
            emailjs.init("pprRtufSCSXKW8OAz");
            console.log("📧 EmailJS inicializado com sucesso!");
        } else {
            console.error("❌ EmailJS não carregado");
        }
    }

    carregarContador() {
        const contadorSalvo = localStorage.getItem('contadorVisitas');
        this.contadorVisitas = contadorSalvo ? parseInt(contadorSalvo) : 0;
    }

    salvarContador() {
        localStorage.setItem('contadorVisitas', this.contadorVisitas.toString());
    }

    incrementarContador() {
        this.contadorVisitas++;
        this.salvarContador();
        this.atualizarContador();
    }

    atualizarContador() {
        const contadorElement = document.querySelector('.contador');
        if (contadorElement) {
            contadorElement.textContent = this.contadorVisitas;
        }
    }

    criarTelas() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <div id="inicio" class="tela">
                <h1 class="titulo-principal">Catedral das Sombras</h1>
                <p class="subtitulo">O portal para o mundo gótico</p>
                <div class="conteudo">
                    <p>Bem-vindo à Catedral das Sombras, onde os mistérios da noite se revelam e os segredos ancestrais aguardam por aqueles que ousam explorar.</p>
                    <div class="container-botoes">
                        <button class="botao-navegacao" data-tela="explorar">Explorar os Mistérios</button>
                        <button class="botao-navegacao" data-tela="galeria">Galeria das Almas</button>
                        <button class="botao-navegacao" data-tela="contato">Oráculo das Sombras</button>
                    </div>
                </div>
            </div>

            <div id="explorar" class="tela">
                <h1 class="titulo-principal">Explorar os Mistérios</h1>
                <div class="conteudo">
                    <p>Descubra os segredos ocultos da catedral:</p>
                    <ul class="lista-gotica">
                        <li>📜 Manuscritos Antigos</li>
                        <li>⚰️ Criptas Secretas</li>
                        <li>🕯️ Rituais Esquecidos</li>
                        <li>🏰 Salões Abandonados</li>
                        <li>🔮 Artefatos Místicos</li>
                    </ul>
                    <div class="container-botoes">
                        <button class="botao-navegacao" data-tela="galeria">Galeria das Almas</button>
                        <button class="botao-navegacao" data-tela="contato">Oráculo das Sombras</button>
                        <button class="botao-navegacao" data-tela="inicio">🏠 Retornar ao Início</button>
                    </div>
                </div>
            </div>

            <div id="galeria" class="tela">
                <h1 class="titulo-principal">Galeria das Almas</h1>
                <div class="conteudo">
                    <p>Coleção de artefatos e relíquias:</p>
                    <div class="galeria">
                        <div class="item-galeria">
                            <div class="icone">⚰️</div>
                            <h3>Urna Ancestral</h3>
                            <p>Datada do século XIV</p>
                        </div>
                        <div class="item-galeria">
                            <div class="icone">🕯️</div>
                            <h3>Candelabro Negro</h3>
                            <p>Forjado nas chamas eternas</p>
                        </div>
                        <div class="item-galeria">
                            <div class="icone">📖</div>
                            <h3>Livro dos Mortos</h3>
                            <p>Contém conhecimentos proibidos</p>
                        </div>
                        <div class="item-galeria">
                            <div class="icone">⚔️</div>
                            <h3>Espada do Cruzado</h3>
                            <p>Banhada em prata lunar</p>
                        </div>
                    </div>
                    <div class="container-botoes">
                        <button class="botao-navegacao" data-tela="explorar">Explorar os Mistérios</button>
                        <button class="botao-navegacao" data-tela="contato">Oráculo das Sombras</button>
                        <button class="botao-navegacao" data-tela="inicio">🏠 Retornar ao Início</button>
                    </div>
                </div>
            </div>

            <div id="contato" class="tela">
                <h1 class="titulo-principal">Oráculo das Sombras</h1>
                <div class="conteudo">
                    <p>Comunique-se com os guardiões da catedral:</p>
                    
                    <div class="contador">${this.contadorVisitas}</div>
                    <p>Almas que buscaram o oráculo</p>
                    
                    <form id="formulario-contato" class="formulario-gotico">
                        <input type="text" id="nome" name="nome" class="campo-formulario" placeholder="Seu nome mortal..." required>
                        <input type="email" id="email" name="email" class="campo-formulario" placeholder="Seu e-mail etéreo..." required>
                        <textarea id="mensagem" name="mensagem" class="campo-formulario" placeholder="Seu chamado..." rows="4" required></textarea>
                        
                        <button type="submit" class="botao-navegacao" id="btn-enviar">
                            <span id="texto-btn">📨 Enviar Mensagem aos Ventos</span>
                            <div id="loading-btn" style="display: none;">🕯️ Invocando os espíritos...</div>
                        </button>
                    </form>

                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #b8860b;">
                        <p>⚡ <strong>Oráculo Ativado:</strong> As mensagens chegarão por email</p>
                    </div>
                    
                    <div class="container-botoes">
                        <button class="botao-navegacao" data-tela="explorar">Explorar os Mistérios</button>
                        <button class="botao-navegacao" data-tela="galeria">Galeria das Almas</button>
                        <button class="botao-navegacao" data-tela="inicio">🏠 Retornar ao Início</button>
                    </div>
                </div>
            </div>
        `;
    }

    mostrarTela(id) {
        const telas = document.querySelectorAll('.tela');
        telas.forEach(tela => {
            tela.classList.remove('ativa');
        });
        const telaAlvo = document.getElementById(id);
        if (telaAlvo) {
            telaAlvo.classList.add('ativa');
            
            if (id === 'contato') {
                this.incrementarContador();
                this.configurarFormulario();
            }
        }
    }

    configurarFormulario() {
        const formulario = document.getElementById('formulario-contato');
        const btnEnviar = document.getElementById('btn-enviar');
        const textoBtn = document.getElementById('texto-btn');
        const loadingBtn = document.getElementById('loading-btn');

        if (formulario) {
            formulario.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Validar EmailJS
                if (typeof emailjs === 'undefined') {
                    this.mostrarMensagem('❌ O oráculo não está disponível. Recarregue a página.', 'error');
                    return;
                }

                // Mostrar loading
                textoBtn.style.display = 'none';
                loadingBtn.style.display = 'block';
                btnEnviar.disabled = true;

                try {
                    await this.enviarEmailReal();
                    this.mostrarMensagem('✅ Seu chamado foi ouvido! Responderemos em breve...', 'success');
                    formulario.reset();
                } catch (error) {
                    console.error('Erro detalhado:', error);
                    this.mostrarMensagem('❌ O feitiço falhou! Tente novamente...', 'error');
                    
                    // Fallback: salvar localmente
                    await this.salvarMensagemLocalmente();
                    this.mostrarMensagem('📜 Mensagem salva localmente. Tentaremos enviar depois.', 'info');
                } finally {
                    // Restaurar botão
                    setTimeout(() => {
                        textoBtn.style.display = 'block';
                        loadingBtn.style.display = 'none';
                        btnEnviar.disabled = false;
                    }, 2000);
                }
            });
        }
    }

    async enviarEmailReal() {
        const templateParams = {
            from_name: document.getElementById('nome').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('mensagem').value,
            to_email: 'gi.dominique.cb@gmail.com',
            date: new Date().toLocaleString('pt-BR'),
            subject: 'Nova mensagem da Catedral das Sombras'
        };

        console.log('📤 Enviando email com template:', 'template_y1pm0m8');

        // Usando suas credenciais CORRETAS
        const response = await emailjs.send(
            'service_elx31z5',      // Seu Service ID
            'template_y1pm0m8',     // Seu Template ID CORRETO
            templateParams
        );

        console.log('✅ Email enviado com sucesso:', response);
        return response;
    }

    salvarMensagemLocalmente() {
        return new Promise((resolve) => {
            const mensagem = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                mensagem: document.getElementById('mensagem').value,
                data: new Date().toLocaleString('pt-BR'),
                timestamp: Date.now()
            };

            // Salvar no localStorage
            const mensagensSalvas = JSON.parse(localStorage.getItem('mensagensCatedral') || '[]');
            mensagensSalvas.push(mensagem);
            localStorage.setItem('mensagensCatedral', JSON.stringify(mensagensSalvas));

            setTimeout(() => {
                resolve(mensagem);
            }, 500);
        });
    }

    adicionarEventos() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('botao-navegacao')) {
                const telaAlvo = e.target.getAttribute('data-tela');
                this.mostrarTela(telaAlvo);
            }
        });
    }

    mostrarMensagem(mensagem, tipo = 'info') {
        // Remover mensagens anteriores
        const mensagensAntigas = document.querySelectorAll('.mensagem-flutuante');
        mensagensAntigas.forEach(msg => msg.remove());

        const mensagemElement = document.createElement('div');
        mensagemElement.className = `mensagem-flutuante ${tipo}`;
        mensagemElement.textContent = mensagem;
        document.body.appendChild(mensagemElement);

        setTimeout(() => {
            mensagemElement.style.animation = 'slideOut 0.5s ease-in forwards';
            setTimeout(() => {
                if (mensagemElement.parentNode) {
                    mensagemElement.remove();
                }
            }, 500);
        }, 5000);
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new Navegacao();
});
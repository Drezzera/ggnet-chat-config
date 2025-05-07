// ==UserScript==
// @name         Chat GGNET com comando /cpf para Integrator
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Chat flutuante com comando /cpf funcional no site do Integrator.
// @author       Você
// @match        https://ggnet.sz.chat/user/agent*
// @match        https://integrator6.gegnet.com.br/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const isIntegrator = window.location.href.includes("integrator6.gegnet.com.br");

    // Chat flutuante visível em ambos os sites
    const style = document.createElement('style');
    style.textContent = `
    .chat-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 320px;
        height: 450px;
        background-color: #1a1a1a;
        border-radius: 10px;
        border: 2px solid #ff0033;
        display: flex;
        flex-direction: column;
        z-index: 9999;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
        transform: translateY(100%);
        transition: transform 0.5s ease;
        visibility: hidden;
    }

    .chat-header {
        background-color: #ff0033;
        color: #fff;
        padding: 12px;
        text-align: center;
        border-radius: 10px 10px 0 0;
        cursor: pointer;
        font-weight: bold;
    }

    .chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        background-color: #333;
        color: #fff;
    }

    .chat-footer {
        padding: 12px;
        display: flex;
        gap: 10px;
        background-color: #444;
        border-radius: 0 0 10px 10px;
    }

    .chat-input {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: none;
        background-color: #555;
        color: #fff;
        font-size: 14px;
        outline: none;
    }

    .chat-button {
        background-color: #ff0033;
        padding: 10px;
        border-radius: 6px;
        border: none;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
    }

    .chat-message {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .chat-message .message-content {
        max-width: 80%;
        padding: 8px 12px;
        border-radius: 10px;
        background-color: #444;
        color: #fff;
        font-size: 14px;
    }

    .chat-message.chat .message-content {
        background-color: #ff0033;
    }

    .chat-message.user .message-content {
        background-color: #555;
    }

    .logo {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqYh7CE__-cafXUlORp3ORgLkDSDV941AVXQ&s');
        background-size: cover;
        margin: 0 10px;
        box-shadow: 0 0 10px rgba(255, 0, 51, 0.5);
    }

    .sidebar-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fff;
        border: 4px solid #ff0033;
        box-shadow: 0 0 15px rgba(255, 0, 51, 0.7);
        cursor: pointer;
    }
    `;
    document.head.appendChild(style);

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';

    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    chatHeader.textContent = 'Chat GGNET';
    chatContainer.appendChild(chatHeader);

    const chatBody = document.createElement('div');
    chatBody.className = 'chat-body';
    chatContainer.appendChild(chatBody);

    const chatFooter = document.createElement('div');
    chatFooter.className = 'chat-footer';

    const chatInput = document.createElement('input');
    chatInput.className = 'chat-input';
    chatInput.placeholder = 'Digite sua mensagem...';

    const chatButton = document.createElement('button');
    chatButton.className = 'chat-button';
    chatButton.textContent = 'Enviar';

    chatFooter.appendChild(chatInput);
    chatFooter.appendChild(chatButton);
    chatContainer.appendChild(chatFooter);
    document.body.appendChild(chatContainer);

    const icon = document.createElement('div');
    icon.className = 'sidebar-icon';
    document.body.appendChild(icon);

    icon.addEventListener('click', () => {
        if (chatContainer.style.visibility === 'hidden') {
            chatContainer.style.visibility = 'visible';
            chatContainer.style.transform = 'translateY(0%)';
        } else {
            chatContainer.style.visibility = 'hidden';
            chatContainer.style.transform = 'translateY(100%)';
        }
    });

    function addMessage(text, sender = 'user') {
        const msg = document.createElement('div');
        msg.className = `chat-message ${sender}`;

        const logo = document.createElement('div');
        logo.className = 'logo';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;

        msg.appendChild(sender === 'chat' ? logo : content);
        msg.appendChild(sender === 'chat' ? content : logo);

        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processCommand(msg) {
        if (msg.startsWith('/cpf') && isIntegrator) {
            const cpf = msg.split(' ')[1]?.trim();
            if (cpf) {
                const interval = setInterval(() => {
                    const input = document.querySelector('input[placeholder="Digite aqui"]') || document.evaluate(
                        '/html/body/elite-root/elite-home/div/div/div/elite-pesquisa-cliente/div/div[2]/p-card/div/div/div/form/div[1]/div[1]/input',
                        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                    if (input) {
                        input.focus();
                        input.value = cpf;
                        input.dispatchEvent(new Event('input', { bubbles: true }));

                        setTimeout(() => {
                            const keyboardEvent = new KeyboardEvent('keydown', {
                                bubbles: true,
                                cancelable: true,
                                key: 'Enter',
                                code: 'Enter'
                            });
                            input.dispatchEvent(keyboardEvent);
                        }, 200);

                        addMessage('CPF enviado ao campo de busca!', 'chat');
                        clearInterval(interval);
                    }
                }, 500);
            } else {
                addMessage('Você precisa digitar um CPF. Ex: /cpf 12345678900', 'chat');
            }
        } else {
            addMessage('Comando não reconhecido.', 'chat');
        }
    }

    function handleSend() {
        const msg = chatInput.value.trim();
        if (msg) {
            addMessage(msg, 'user');
            chatInput.value = '';

            if (msg.startsWith('/')) {
                processCommand(msg);
            } else {
                setTimeout(() => {
                    addMessage('Recebido! Em breve adicionaremos respostas automáticas.', 'chat');
                }, 500);
            }
        }
    }

    chatButton.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });

    setTimeout(() => {
        addMessage('Olá! Envie /cpf 12345678900 para buscar cliente.');
    }, 1500);
})();

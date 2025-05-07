// ==UserScript==
// @name         Chat GGNET com Estilo Refinado e Animações Elegantes (Vermelho Forte)
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Chat flutuante com links interativos, animações suaves e estilo vermelho vibrante.
// @author       Você
// @match        https://ggnet.sz.chat/user/agent*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

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
        overflow: hidden;
        max-height: 450px;
        opacity: 1;
        transform: translateY(0%);
        transition: max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease;
    }

    .chat-container.collapsed {
        max-height: 0;
        opacity: 0;
        transform: translateY(20%);
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
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: opacity 0.3s ease;
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
        transition: background-color 0.3s ease;
    }

    .chat-button:hover {
        background-color: #cc002a;
    }

    .chat-link {
        color: #ff0033;
        text-decoration: none;
        padding: 4px 8px;
        display: inline-block;
        border-radius: 6px;
        transition: background-color 0.3s ease;
        margin: 4px 0;
    }

    .chat-link:hover {
        background-color: #ff0033;
        color: #fff;
    }

    .manual-toggle {
        display: inline-block;
        color: #fff;
        background-color: #444;
        padding: 6px 12px;
        border-radius: 6px;
        margin-top: 10px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .manual-toggle:hover {
        background-color: #ff0033;
    }

    .chat-message {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        flex-wrap: wrap;
    }

    .chat-message.user {
        flex-direction: row-reverse;
        text-align: right;
    }

    .chat-message.chat {
        flex-direction: row;
    }

    .chat-message .message-content {
        max-width: 80%;
        padding: 8px 12px;
        border-radius: 10px;
        background-color: #444;
        color: #fff;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    .chat-message .user .message-content {
        background-color: #555;
    }

    .chat-message .logo {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqYh7CE__-cafXUlORp3ORgLkDSDV941AVXQ&s');
        background-size: cover;
        margin: 0 10px;
        box-shadow: 0 0 10px rgba(255, 0, 51, 0.5);
    }

    .sidebar-icon {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fff;
        border: 4px solid #ff0033;
        box-shadow: 0 0 15px rgba(255, 0, 51, 0.7);
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .sidebar-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(255, 0, 51, 1);
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

    const icon = document.createElement('img');
    icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqYh7CE__-cafXUlORp3ORgLkDSDV941AVXQ&s';
    icon.className = 'sidebar-icon';
    document.body.appendChild(icon);

    // Mensagem inicial
    const messageElem = document.createElement('div');
    messageElem.className = 'chat-message chat';
    const logo = document.createElement('div');
    logo.className = 'logo';
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = 'Olá! Como posso ajudar?';
    messageElem.appendChild(logo);
    messageElem.appendChild(messageContent);
    chatBody.appendChild(messageElem);

    // Botões de menu + containers
    const manualToggle = document.createElement('div');
    manualToggle.className = 'manual-toggle';
    manualToggle.textContent = 'Informações do MANUAL GGNET';
    chatBody.appendChild(manualToggle);

    const manualLinksContainer = document.createElement('div');
    chatBody.appendChild(manualLinksContainer);

    const resolucaoToggle = document.createElement('div');
    resolucaoToggle.className = 'manual-toggle';
    resolucaoToggle.textContent = 'Resolução CSA';
    chatBody.appendChild(resolucaoToggle);

    const resolucaoLinksContainer = document.createElement('div');
    chatBody.appendChild(resolucaoLinksContainer);

    // Menu MANUAL GGNET
    const manualLinks = [
        { label: 'Easymesh Huawei + ONT', url: 'https://drive.google.com/file/d/1slPYt5G_yTakT5RAuLMLBWCvMqS-MuGD/view' },
        { label: 'VINCULAR ONU INT6', url: 'https://drive.google.com/file/d/1xP6hsMN5UuKYV2nPESatr3FfnGogoItu/view' },
        { label: 'EG8145X6-10 - Configuração Inicial', url: 'https://drive.google.com/file/d/1ogs_KfoLWwqMi1Q_pEyBWfn_LAMf-QvN/view' },
        { label: 'Firmwares DEBUG AX2', url: 'https://sites.google.com/view/csawiki/firmwares/firmwares-debug?authuser=1' },
        { label: 'Atualizar ONU FIBERHOME', url: 'https://drive.google.com/file/d/1DhKRW2RB6IQSlNfqHc7xCWpT8JRIK1Nv/view' },
        { label: 'Atualizar ONU DATACOM', url: 'https://drive.google.com/file/u/1/d/1MEPjMtT4ilt2C27uFl2-lzQWuwgON4N3/view' }
    ];

    let manualVisible = false;
    manualToggle.addEventListener('click', () => {
        manualLinksContainer.innerHTML = '';
        if (!manualVisible) {
            manualLinks.forEach(link => {
                const a = document.createElement('a');
                a.className = 'chat-link';
                a.href = link.url;
                a.target = '_blank';
                a.textContent = link.label;
                manualLinksContainer.appendChild(a);
            });
        }
        manualVisible = !manualVisible;
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    // Menu RESOLUÇÃO CSA
    const resolucaoLinks = [
        { label: 'Sem acesso', url: '#' },
        { label: 'Lentidão', url: '#' },
        { label: 'Sinal Alto', url: '#' },
        { label: 'Dificuldade com sites específicos', url: '#' }
    ];

    let resolucaoVisible = false;
    resolucaoToggle.addEventListener('click', () => {
        resolucaoLinksContainer.innerHTML = '';
        if (!resolucaoVisible) {
            resolucaoLinks.forEach(link => {
                const a = document.createElement('a');
                a.className = 'chat-link';
                a.href = link.url;
                a.target = '_blank';
                a.textContent = link.label;
                resolucaoLinksContainer.appendChild(a);
            });
        }
        resolucaoVisible = !resolucaoVisible;
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElem = document.createElement('div');
            messageElem.className = 'chat-message user';

            const logo = document.createElement('div');
            logo.className = 'logo';
            messageElem.appendChild(logo);

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = message;
            messageElem.appendChild(messageContent);

            chatBody.appendChild(messageElem);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    chatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    icon.addEventListener('click', () => {
        chatContainer.classList.toggle('collapsed');
    });

    chatHeader.addEventListener('click', () => {
        chatContainer.classList.toggle('collapsed');
    });

    // Ícone arrastável
    let isDragging = false, offsetX, offsetY;
    icon.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - icon.getBoundingClientRect().left;
        offsetY = e.clientY - icon.getBoundingClientRect().top;
        icon.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            icon.style.left = `${e.clientX - offsetX}px`;
            icon.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        icon.classList.remove('dragging');
    });
})();

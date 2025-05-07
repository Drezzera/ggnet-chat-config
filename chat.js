// ==UserScript==
// @name         Chat GGNET com Estilo Refinado e Animações Elegantes (Vermelho Forte)
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Chat flutuante com links interativos, animações suaves e estilo vermelho vibrante.
// @author       Você
// @match        https://ggnet.sz.chat/user/agent*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
    /* ... [estilos permanecem iguais] ... */
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

    const links = [
        { label: 'Easymesh Huawei + ONT', url: 'https://drive.google.com/file/d/1slPYt5G_yTakT5RAuLMLBWCvMqS-MuGD/view' },
        { label: 'VINCULAR ONU INT6', url: 'https://drive.google.com/file/d/1xP6hsMN5UuKYV2nPESatr3FfnGogoItu/view' },
        { label: 'EG8145X6-10 - Configuração Inicial', url: 'https://drive.google.com/file/d/1ogs_KfoLWwqMi1Q_pEyBWfn_LAMf-QvN/view' },
        { label: 'Firmwares DEBUG AX2', url: 'https://sites.google.com/view/csawiki/firmwares/firmwares-debug?authuser=1' },
        { label: 'Atualizar ONU FIBERHOME', url: 'https://drive.google.com/file/d/1DhKRW2RB6IQSlNfqHc7xCWpT8JRIK1Nv/view' },
        { label: 'Atualizar ONU DATACOM', url: 'https://drive.google.com/file/u/1/d/1MEPjMtT4ilt2C27uFl2-lzQWuwgON4N3/view' }
    ];

    const ajudaLinks = [
        { label: 'Motivos Abertura e Fechamento', url: 'https://drive.google.com/file/d/1mZAHwQngyaCL8YBfL4-FLo3zJzVZD2cS/view' },
        { label: 'Manual do Técnico GGNET', url: 'https://example.com/manual-tecnico' },
        { label: 'Teste de Velocidade', url: 'https://fast.com/' }
    ];

    function createLinkElement(link, delay = 0) {
        const linkElem = document.createElement('a');
        linkElem.className = 'chat-link';
        linkElem.href = link.url;
        linkElem.target = '_blank';
        linkElem.textContent = link.label;

        setTimeout(() => {
            chatBody.appendChild(linkElem);
        }, delay);
    }

    function displayLinks() {
        links.forEach((link, index) => createLinkElement(link, index * 300));
    }

    function displayAjudaLinks() {
        ajudaLinks.forEach((link, index) => createLinkElement(link, index * 300));
    }

    function toggleChat() {
        chatContainer.classList.toggle('collapsed');
    }

    icon.addEventListener('click', toggleChat);
    chatHeader.addEventListener('click', toggleChat);

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

            setTimeout(() => {
                messageElem.classList.add('visible');
            }, 100);

            // Comando especial
            if (message.toLowerCase() === '/ajuda') {
                setTimeout(() => {
                    addChatResponse('Aqui estão mais algumas informações que podem te ajudar:');
                    displayAjudaLinks();
                }, 500);
            }
        }
    }

    chatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    function addChatResponse(responseText) {
        const messageElem = document.createElement('div');
        messageElem.className = 'chat-message chat';

        const logo = document.createElement('div');
        logo.className = 'logo';
        messageElem.appendChild(logo);

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = responseText;
        messageElem.appendChild(messageContent);

        chatBody.appendChild(messageElem);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            messageElem.classList.add('visible');
        }, 100);
    }

    setTimeout(() => {
        addChatResponse('Olá! Como posso ajudar?');
        displayLinks();
    }, 2000);

    // Ícone flutuante arrastável
    let isDragging = false;
    let offsetX, offsetY;

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

// ==UserScript==
// @name         Chat GGNET com Estilo Refinado e Animações Elegantes (Vermelho Forte)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Chat flutuante com links interativos, animações suaves e estilo vermelho vibrante, com avatar para mensagens da GGNET.
// @author       Você
// @match        https://ggnet.sz.chat/user/agent*
// @grant        none
// ==/UserScript==

(function () {
'use strict';

// INSERE ESTILO
const style = document.createElement('style');
style.textContent = `...`; // [omiti aqui por brevidade, mas você pode colar seu CSS inteiro exatamente como está acima]
document.head.appendChild(style);

// CRIA ELEMENTOS PRINCIPAIS
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

// ÍCONE FLUTUANTE
const icon = document.createElement('img');
icon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqYh7CE__-cafXUlORp3ORgLkDSDV941AVXQ&s';
icon.className = 'sidebar-icon';
document.body.appendChild(icon);

// LINKS DO MANUAL
const links = [
    { label: 'Easymesh Huawei + ONT', url: 'https://drive.google.com/file/d/1slPYt5G_yTakT5RAuLMLBWCvMqS-MuGD/view' },
    { label: 'VINCULAR ONU INT6', url: 'https://drive.google.com/file/d/1xP6hsMN5UuKYV2nPESatr3FfnGogoItu/view' },
    { label: 'EG8145X6-10 - Configuração Inicial', url: 'https://drive.google.com/file/d/1ogs_KfoLWwqMi1Q_pEyBWfn_LAMf-QvN/view' },
    { label: 'Firmwares DEBUG AX2', url: 'https://sites.google.com/view/csawiki/firmwares/firmwares-debug?authuser=1' },
    { label: 'Atualizar ONU FIBERHOME', url: 'https://drive.google.com/file/d/1DhKRW2RB6IQSlNfqHc7xCWpT8JRIK1Nv/view' },
    { label: 'Atualizar ONU DATACOM', url: 'https://drive.google.com/file/u/1/d/1MEPjMtT4ilt2C27uFl2-lzQWuwgON4N3/view' }
];

let manualLinksVisible = false;
let manualLinkElements = [];

function toggleManualLinks() {
    if (manualLinksVisible) {
        manualLinkElements.forEach(el => el.remove());
        manualLinkElements = [];
    } else {
        links.forEach((link) => {
            const linkElem = document.createElement('a');
            linkElem.className = 'chat-link';
            linkElem.href = link.url;
            linkElem.target = '_blank';
            linkElem.textContent = link.label;

            chatBody.appendChild(linkElem);
            manualLinkElements.push(linkElem);
        });
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    manualLinksVisible = !manualLinksVisible;
}

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

// FUNÇÃO PARA MENSAGEM DO BOT COM AVATAR
function addChatResponse(text, callback) {
    const messageElem = document.createElement('div');
    messageElem.className = 'chat-message chat';

    const logo = document.createElement('div');
    logo.className = 'logo';
    messageElem.appendChild(logo);

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = text;
    messageElem.appendChild(messageContent);

    chatBody.appendChild(messageElem);

    if (callback) callback();

    chatBody.scrollTop = chatBody.scrollHeight;
}

// MENSAGEM INICIAL
setTimeout(() => {
    addChatResponse('Olá! Como posso ajudar?', () => {
        addChatResponse('Informações do MANUAL GGNET', () => {
            const manualToggle = document.createElement('div');
            manualToggle.className = 'manual-toggle';
            manualToggle.textContent = 'Informações do MANUAL GGNET';
            manualToggle.addEventListener('click', toggleManualLinks);
            chatBody.appendChild(manualToggle);
        });
    });
}, 1000);

// ÍCONE ARRASTÁVEL
let isDragging = false, offsetX, offsetY;
icon.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - icon.getBoundingClientRect().left;
    offsetY = e.clientY - icon.getBoundingClientRect().top;
});
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        icon.style.left = `${e.clientX - offsetX}px`;
        icon.style.top = `${e.clientY - offsetY}px`;
    }
});
document.addEventListener('mouseup', () => {
    isDragging = false;
});

})();

// ==UserScript==
// @name         Chat GGNET com Estilo Refinado e Animações Elegantes (Vermelho Forte)
// @namespace    http://tampermonkey.net/
// @version      1.6
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
        display: inline-block;
        position: relative;
        color: #ff0033;
        text-decoration: none;
        padding: 6px 12px;
        border-radius: 8px;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .chat-link:hover {
        background-color: #ff0033;
        color: #fff;
        transform: translateY(-3px);
    }

    .chat-link::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #ff0033;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    .chat-link:hover::after {
        transform: scaleX(1);
    }

    .chat-message {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
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

    .chat-message .chat .message-content {
        background-color: #ff0033;
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

    const links = [
        { label: 'Easymesh Huawei + ONT', url: 'https://drive.google.com/file/d/1slPYt5G_yTakT5RAuLMLBWCvMqS-MuGD/view' },
        { label: 'VINCULAR ONU INT6', url: 'https://drive.google.com/file/d/1xP6hsMN5UuKYV2nPESatr3FfnGogoItu/view' },
        { label: 'EG8145X6-10', url: 'https://drive.google.com/file/d/1ogs_KfoLWwqMi1Q_pEyBWfn_LAMf-QvN/view' },
        { label: 'Firmwares DEBUG', url: 'https://sites.google.com/view/csawiki/firmwares/firmwares-debug?authuser=1' },
        { label: 'Firmwares ONU UNM', url: 'https://drive.google.com/file/d/1DhKRW2RB6IQSlNfqHc7xCWpT8JRIK1Nv/view' },
        { label: 'Firmwares para ONU Datacom', url: 'https://drive.google.com/file/u/1/d/1MEPjMtT4ilt2C27uFl2-lzQWuwgON4N3/view' }
    ];

    function displayLinks() {
        setTimeout(() => {
            links.forEach((link, index) => {
                const linkElem = document.createElement('a');
                linkElem.className = 'chat-link';
                linkElem.href = link.url;
                linkElem.target = '_blank';
                linkElem.textContent = link.label;
                chatBody.appendChild(linkElem);

                setTimeout(() => {
                    linkElem.classList.add('visible');
                }, index * 300);
            });
        }, 1000);
    }

    icon.addEventListener('click', () => {
        if (chatContainer.style.visibility === 'hidden') {
            chatContainer.style.visibility = 'visible';
            chatContainer.style.transform = 'translateY(0%)';
        } else {
            chatContainer.style.visibility = 'hidden';
            chatContainer.style.transform = 'translateY(100%)';
        }
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

            setTimeout(() => {
                messageElem.classList.add('visible');
            }, 100);
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

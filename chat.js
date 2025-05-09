// ==UserScript==
// @name         GGNET - Chat Flutuante com Atalhos
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Chat flutuante com links úteis, respostas automáticas e atalhos para GGNET.
// @author       Você
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const linksGGNET = [
        { label: 'Integrator', url: 'https://integrator6.gegnet.com.br' },
        { label: 'Painel PPPOE', url: 'https://177.85.98.2/' },
        { label: 'Zabbix', url: 'http://177.85.98.6/zabbix.php?action=dashboard.view' },
        { label: 'Instalação ONUs', url: 'https://ggnet-chat-config.vercel.app/onu' },
        { label: 'Manual GGNET', url: 'https://ggnet-chat-config.vercel.app/manual' }
    ];

    const resolucaoLinks = [
        { label: 'Sem acesso', url: '#' },
        { label: 'Lenta', url: 'https://ggnet-chat-config.vercel.app/lentidao' },
        { label: 'Redirecionamento', url: 'https://ggnet-chat-config.vercel.app/redirecionamento' },
        { label: 'Troca senha Wi-Fi', url: 'https://ggnet-chat-config.vercel.app/troca' }
    ];

    const style = document.createElement('style');
    style.textContent = `
        .ggnet-chat-container {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 320px;
            max-height: 500px;
            background: #111;
            color: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            display: none;
            flex-direction: column;
            z-index: 9999;
            font-family: Arial, sans-serif;
        }
        .ggnet-chat-header {
            background: #c00;
            padding: 10px 15px;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            font-weight: bold;
            cursor: pointer;
        }
        .ggnet-chat-body {
            padding: 10px;
            flex: 1;
            overflow-y: auto;
        }
        .ggnet-chat-input {
            display: flex;
            border-top: 1px solid #333;
        }
        .ggnet-chat-input input {
            flex: 1;
            padding: 10px;
            border: none;
            background: #222;
            color: #fff;
            border-bottom-left-radius: 16px;
        }
        .ggnet-chat-input button {
            padding: 10px 15px;
            border: none;
            background: #c00;
            color: #fff;
            cursor: pointer;
            border-bottom-right-radius: 16px;
        }
        .ggnet-toggle-chat {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #c00;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 28px;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chat-message {
            margin-bottom: 10px;
            display: flex;
            align-items: flex-start;
        }
        .chat-message.user .message-content {
            background: #333;
            align-self: flex-end;
        }
        .chat-message.chat .message-content {
            background: #c00;
        }
        .chat-message .message-content {
            padding: 10px;
            border-radius: 10px;
            max-width: 80%;
        }
        .logo {
            width: 32px;
            height: 32px;
            background: url('https://upload.wikimedia.org/wikipedia/commons/7/77/Google_Chat_icon_%282020%29.svg') no-repeat center/cover;
            margin-right: 8px;
            border-radius: 50%;
        }
        .menu-toggle {
            margin: 10px 0;
            cursor: pointer;
            padding: 6px;
            background: #222;
            border-radius: 8px;
        }
        .menu-toggle:hover {
            background: #333;
        }
        .resolucao-links a {
            display: block;
            margin: 5px 0;
            color: #fff;
            text-decoration: none;
            background: #444;
            padding: 6px;
            border-radius: 6px;
        }
        .resolucao-links a:hover {
            background: #555;
        }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.className = 'ggnet-chat-container';
    container.innerHTML = `
        <div class="ggnet-chat-header">Atendimento GGNET</div>
        <div class="ggnet-chat-body">
            <div class="chat-message chat">
                <div class="logo"></div>
                <div class="message-content">Olá! Como posso ajudar?</div>
            </div>
            <div class="chat-message chat">
                <div class="logo"></div>
                <div class="message-content menu-toggle">Informações do MANUAL GGNET</div>
            </div>
            <div class="resolucao-links" style="display: none;"></div>
        </div>
        <div class="ggnet-chat-input">
            <input type="text" placeholder="Digite sua mensagem...">
            <button>➤</button>
        </div>
    `;
    document.body.appendChild(container);

    const toggleButton = document.createElement('button');
    toggleButton.className = 'ggnet-toggle-chat';
    toggleButton.textContent = '💬';
    document.body.appendChild(toggleButton);

    const chatContainer = document.querySelector('.ggnet-chat-container');
    const chatBody = chatContainer.querySelector('.ggnet-chat-body');
    const chatInput = chatContainer.querySelector('.ggnet-chat-input input');
    const chatButton = chatContainer.querySelector('.ggnet-chat-input button');
    const menuToggle = chatContainer.querySelector('.menu-toggle');
    const resolucaoLinksContainer = chatContainer.querySelector('.resolucao-links');

    toggleButton.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    menuToggle.addEventListener('click', () => {
        const isVisible = resolucaoLinksContainer.style.display === 'block';
        resolucaoLinksContainer.style.display = isVisible ? 'none' : 'block';
        if (!isVisible && resolucaoLinksContainer.childElementCount === 0) {
            resolucaoLinks.forEach(link => {
                const a = document.createElement('a');
                a.textContent = link.label;

                if (link.label === 'Sem acesso') {
                    a.href = 'javascript:void(0)';
                    a.addEventListener('click', () => {
                        const steps = [
                            '👣 Passo 1: Verifique se há luz LOS acesa na ONU do cliente.',
                            '🔍 Passo 2: Tente acessar a ONU via IP pelo navegador (ex: 192.168.1.1).',
                            '🧰 Passo 3: Se não responder, reinicie a ONU e aguarde 2 minutos.',
                            '📞 Passo 4: Se persistir, oriente o cliente a verificar os cabos ou abrir chamado técnico.'
                        ];
                        steps.forEach(text => {
                            const messageElem = document.createElement('div');
                            messageElem.className = 'chat-message chat';

                            const logo = document.createElement('div');
                            logo.className = 'logo';

                            const messageContent = document.createElement('div');
                            messageContent.className = 'message-content';
                            messageContent.textContent = text;

                            messageElem.appendChild(logo);
                            messageElem.appendChild(messageContent);
                            chatBody.appendChild(messageElem);
                        });
                        chatBody.scrollTop = chatBody.scrollHeight;
                    });
                } else {
                    a.href = link.url;
                    a.target = '_blank';
                }

                resolucaoLinksContainer.appendChild(a);
            });
        }
    });

    chatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        const messageElem = document.createElement('div');
        messageElem.className = 'chat-message user';
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        messageElem.appendChild(messageContent);
        chatBody.appendChild(messageElem);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
    }
})();

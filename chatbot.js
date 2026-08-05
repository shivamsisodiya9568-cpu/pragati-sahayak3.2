/* ==========================================================================
   Pragati Sahayak - Chatbot UI Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ai-assistant-container');
    if (!container) return;

    // Render Chatbot HTML
    container.innerHTML = `
        <button class="chatbot-toggle" id="chatbotToggle" aria-label="Open AI Assistant">
            <i class="ph ph-chat-circle-dots"></i>
        </button>
        
        <div class="chatbot-window" id="chatbotWindow">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <div class="chatbot-avatar">
                        <i class="ph ph-robot"></i>
                    </div>
                    <div>
                        <h4 class="chatbot-title">Pragati AI</h4>
                        <span class="chatbot-status">Online</span>
                    </div>
                </div>
                <button class="chatbot-close" id="chatbotClose" aria-label="Close">
                    <i class="ph ph-x"></i>
                </button>
            </div>
            
            <div class="chatbot-body" id="chatbotBody">
                <!-- Messages will be injected here -->
            </div>
            
            <form class="chatbot-footer" id="chatbotForm">
                <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask about our services..." autocomplete="off">
                <button type="submit" class="chatbot-send" id="chatbotSend" aria-label="Send">
                    <i class="ph ph-paper-plane-right"></i>
                </button>
            </form>
        </div>
    `;

    // Elements
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const chatWindow = document.getElementById('chatbotWindow');
    const chatForm = document.getElementById('chatbotForm');
    const chatInput = document.getElementById('chatbotInput');
    const chatBody = document.getElementById('chatbotBody');

    // UI State
    let isOpen = false;

    // Toggle logic
    function toggleChat() {
        isOpen = !isOpen;
        if (isOpen) {
            chatWindow.classList.add('open');
            toggleBtn.style.transform = 'scale(0)';
            chatInput.focus();
            if (chatBody.children.length === 0) {
                // Trigger initial greeting if empty
                window.dispatchEvent(new Event('chatbot-opened'));
            }
        } else {
            chatWindow.classList.remove('open');
            toggleBtn.style.transform = 'scale(1)';
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Messaging UI Logic
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        chatInput.value = '';
        
        // Dispatch event for AI Agent to process
        const event = new CustomEvent('user-message', { detail: { message: text } });
        window.dispatchEvent(event);
    });

    // Expose methods to global scope for ai-agent.js
    window.ChatbotUI = {
        appendMessage,
        showTypingIndicator,
        removeTypingIndicator
    };

    function appendMessage(text, sender = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text; // simple textContent to prevent XSS
        
        chatBody.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message bot typing-wrapper';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatBody.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});

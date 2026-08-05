/* ==========================================================================
   Pragati Sahayak - AI Agent Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Listen for chat window open to send greeting
    window.addEventListener('chatbot-opened', () => {
        setTimeout(() => {
            if (window.ChatbotUI) {
                window.ChatbotUI.showTypingIndicator();
                
                setTimeout(() => {
                    window.ChatbotUI.removeTypingIndicator();
                    window.ChatbotUI.appendMessage("Hi there! I'm Pragati AI, your digital consultant. How can I help you grow your business today?", "bot");
                }, 1000);
            }
        }, 500);
    });

    // Listen for user messages
    window.addEventListener('user-message', (e) => {
        const message = e.detail.message;
        processAIResponse(message);
    });

    // Mock AI Processing Logic
    function processAIResponse(message) {
        if (!window.ChatbotUI) return;
        
        window.ChatbotUI.showTypingIndicator();
        
        const lowerMsg = message.toLowerCase();
        let reply = "";
        
        // Simple mock knowledge base
        if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('plan')) {
            reply = "Our pricing plans start from the 'Starter' tier suitable for small businesses, up to 'Enterprise' for full custom solutions. Would you like me to recommend a plan based on your needs?";
        } 
        else if (lowerMsg.includes('service') || lowerMsg.includes('build') || lowerMsg.includes('create')) {
            reply = "We offer Web Development, Custom Web Apps, UI/UX Design, SEO, and AI Chatbot Integration. What kind of project are you looking to start?";
        }
        else if (lowerMsg.includes('contact') || lowerMsg.includes('meet') || lowerMsg.includes('call')) {
            reply = "You can reach us at contact@pragatisahayak.com or use the Contact Form on our website. Would you like me to collect your details so our sales expert can call you?";
        }
        else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            reply = "Hello! How can I assist you with your digital requirements today?";
        }
        else {
            reply = "That's an interesting question! While I am currently a simulated AI for this demo, in the final version I will connect to advanced LLMs (like OpenAI or Gemini) to provide deep, contextual answers, generate quotes, and help you plan your project. How else can I help?";
        }

        // Simulate network delay
        const delay = Math.random() * 1000 + 1000; // 1s to 2s
        setTimeout(() => {
            window.ChatbotUI.removeTypingIndicator();
            window.ChatbotUI.appendMessage(reply, "bot");
        }, delay);
    }
});

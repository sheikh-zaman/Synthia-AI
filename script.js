// Personality Mapping Visualization
function initPersonalityMap() {
    const canvas = document.getElementById('personalityMap');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Color palette
    const colors = {
        deepBlue: '#0D47A1',
        aiMagenta: '#E91E63',
        growthGreen: '#4CAF50',
        silver: '#E0E0E0'
    };
    
    // Personality dimensions (example values)
    const dimensions = [
        { name: 'Openness', value: 0.75, color: colors.aiMagenta },
        { name: 'Conscientiousness', value: 0.65, color: colors.deepBlue },
        { name: 'Extraversion', value: 0.55, color: colors.growthGreen },
        { name: 'Agreeableness', value: 0.70, color: colors.aiMagenta },
        { name: 'Neuroticism', value: 0.40, color: colors.deepBlue },
        { name: 'Creativity', value: 0.80, color: colors.growthGreen }
    ];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate responsive sizes
    const maxRadius = Math.min(width, height) * 0.4;
    const gridSpacing = maxRadius / 5;
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
    ctx.fillStyle = colors.silver;
    ctx.fill();
    ctx.strokeStyle = colors.deepBlue;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw grid lines
    for (let i = 0; i < 5; i++) {
        const radius = gridSpacing + (i * gridSpacing);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = colors.deepBlue;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.2;
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
    
    // Draw dimension lines
    const numDimensions = dimensions.length;
    const labelRadius = maxRadius + 30;
    const nodeRadius = maxRadius * 0.9;
    
    dimensions.forEach((dim, index) => {
        const angle = (index * 2 * Math.PI / numDimensions) - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = colors.deepBlue;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        
        // Label
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.deepBlue;
        const fontSize = Math.max(10, width / 40);
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dim.name, labelX, labelY);
    });
    
    // Draw personality shape
    ctx.beginPath();
    dimensions.forEach((dim, index) => {
        const angle = (index * 2 * Math.PI / numDimensions) - Math.PI / 2;
        const radius = dim.value * nodeRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    
    // Fill with gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
    gradient.addColorStop(0, 'rgba(233, 30, 99, 0.3)');
    gradient.addColorStop(0.5, 'rgba(13, 71, 161, 0.2)');
    gradient.addColorStop(1, 'rgba(76, 175, 80, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke
    ctx.strokeStyle = colors.aiMagenta;
    ctx.lineWidth = Math.max(2, width / 200);
    ctx.stroke();
    
    // Draw nodes
    dimensions.forEach((dim, index) => {
        const angle = (index * 2 * Math.PI / numDimensions) - Math.PI / 2;
        const radius = dim.value * nodeRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const nodeSize = Math.max(6, width / 60);
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = dim.color;
        ctx.fill();
        ctx.strokeStyle = colors.deepBlue;
        ctx.lineWidth = Math.max(1, width / 250);
        ctx.stroke();
    });
    
    // Animate the visualization
    let animationFrame = 0;
    function animate() {
        animationFrame++;
        if (animationFrame % 60 === 0) {
            // Subtle pulsing effect
            dimensions.forEach(dim => {
                dim.value = Math.max(0.3, Math.min(0.9, dim.value + (Math.random() - 0.5) * 0.05));
            });
            initPersonalityMap();
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// Conversational Demo
const synthiaResponses = [
    {
        keywords: ['hello', 'hi', 'hey'],
        responses: [
            "Hello! I'm Synthia, your digital mirror. I'm here to help you understand yourself better. What would you like to explore today?",
            "Hi there! Ready to dive into some self-reflection? What's on your mind?",
            "Hey! I'm excited to learn more about you. What brings you here today?"
        ]
    },
    {
        keywords: ['values', 'value', 'important', 'matter'],
        responses: [
            "Values are the foundation of who we are. What do you think are your core values? What principles guide your decisions?",
            "Understanding your values helps clarify your path forward. Can you think of a time when you felt most aligned with yourself?",
            "Values clarification is one of my strengths. Tell me about something that's deeply important to you."
        ]
    },
    {
        keywords: ['communication', 'talk', 'speak', 'express'],
        responses: [
            "Communication patterns reveal so much about us. How do you typically express yourself? Are you more direct or indirect?",
            "I notice patterns in how people communicate. What's your communication style like? Do you prefer written or spoken words?",
            "Communication is fascinating! How do you think others perceive your communication style?"
        ]
    },
    {
        keywords: ['future', 'goal', 'aspiration', 'dream', 'want'],
        responses: [
            "The future self is a powerful concept. Where do you see yourself in 5 years? What kind of person do you want to become?",
            "Projecting your future self helps create a roadmap. What changes would you like to see in yourself?",
            "Future self projection is about growth. What's one thing you'd like to improve or develop?"
        ]
    },
    {
        keywords: ['personality', 'who am i', 'myself', 'self'],
        responses: [
            "Personality is complex and beautiful. What aspects of your personality do you feel most connected to?",
            "Understanding yourself is a journey. What do you think makes you unique?",
            "I'm here to help you explore your personality. What would you like to discover about yourself?"
        ]
    },
    {
        keywords: ['help', 'how', 'what'],
        responses: [
            "I can help you with values clarification, communication pattern analysis, and future self projection. What interests you most?",
            "I'm designed to be your synthetic counterpart for self-reflection. Ask me anything about yourself, and we'll explore it together.",
            "Think of me as a mirror that reflects not just who you are, but who you could become. What would you like to explore?"
        ]
    }
];

function getSynthiaResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching keyword category
    for (const category of synthiaResponses) {
        if (category.keywords.some(keyword => lowerMessage.includes(keyword))) {
            const responses = category.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Default responses
    const defaultResponses = [
        "That's interesting. Can you tell me more about that?",
        "I'm learning about you. Help me understand better - what does that mean to you?",
        "Let's explore that together. How does that make you feel?",
        "Thank you for sharing. What else comes to mind when you think about that?",
        "I see. What patterns do you notice in yourself regarding that?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function addMessage(content, isUser = false) {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? 'U' : 'S';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    const p = document.createElement('p');
    p.textContent = content;
    messageContent.appendChild(p);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    
    // Add user message
    addMessage(userMessage, true);
    chatInput.value = '';
    
    // Simulate thinking delay
    setTimeout(() => {
        const response = getSynthiaResponse(userMessage);
        addMessage(response, false);
    }, 500);
}

// Initialize canvas size
function resizeCanvas() {
    const canvas = document.getElementById('personalityMap');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    if (!container) return;
    
    // Maintain aspect ratio and responsive sizing
    const maxSize = Math.min(container.offsetWidth - 40, 500);
    const size = Math.max(300, maxSize); // Minimum 300px
    
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Resize canvas first
    resizeCanvas();
    
    // Initialize personality map
    initPersonalityMap();
    
    // Set up chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Resize canvas on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            resizeCanvas();
            initPersonalityMap();
        }, 250);
    });
});


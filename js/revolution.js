// English Revolution - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 English Revolution - Module 1 Loaded');
    initializeInteractiveElements();
    loadUserProgress();
});

// Play letter sound using Web Speech API
function playLetter(letter) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
        
        // Visual feedback
        const letterCard = event.target.closest('.letter-card');
        if (letterCard) {
            letterCard.style.transform = 'scale(1.1)';
            setTimeout(() => {
                letterCard.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add click sound to all buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
    
    // Initialize letter cards
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Play click sound
function playClickSound() {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('click');
        utterance.volume = 0.1;
        utterance.rate = 2.0;
        speechSynthesis.speak(utterance);
    }
}

// User progress tracking
function loadUserProgress() {
    const progress = localStorage.getItem('englishRevolutionProgress');
    if (progress) {
        const data = JSON.parse(progress);
        updateProgressIndicators(data);
    }
}

function saveProgress(module, section, completed) {
    let progress = JSON.parse(localStorage.getItem('englishRevolutionProgress') || '{}');
    if (!progress[module]) {
        progress[module] = {};
    }
    progress[module][section] = completed;
    localStorage.setItem('englishRevolutionProgress', JSON.stringify(progress));
}

function updateProgressIndicators(data) {
    // Update progress bars and completion indicators
    const module1Progress = data.module1 || {};
    const completedSections = Object.values(module1Progress).filter(Boolean).length;
    const totalSections = 5;
    const percentage = (completedSections / totalSections) * 100;
    
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = percentage + '%';
        bar.setAttribute('aria-valuenow', percentage);
    });
}

// Smooth scrolling for navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + H for Home
    if (e.altKey && e.key === 'h') {
        window.location.href = '../index.html';
    }
    
    // Alt + V for Vocabulary
    if (e.altKey && e.key === 'v') {
        window.location.href = 'vocabulary.html';
    }
    
    // Alt + G for Grammar
    if (e.altKey && e.key === 'g') {
        window.location.href = 'grammar.html';
    }
    
    // Alt + C for Culture
    if (e.altKey && e.key === 'c') {
        window.location.href = 'culture.html';
    }
});

// Accessibility improvements
function increaseFontSize() {
    document.body.style.fontSize = '1.2em';
    localStorage.setItem('fontSize', '1.2em');
}

function decreaseFontSize() {
    document.body.style.fontSize = '1em';
    localStorage.setItem('fontSize', '1em');
}

// Load saved font size
const savedFontSize = localStorage.getItem('fontSize');
if (savedFontSize) {
    document.body.style.fontSize = savedFontSize;
}

// Error handling for media elements
function handleMediaError(element) {
    console.error('Media failed to load:', element.src);
    const fallback = document.createElement('div');
    fallback.className = 'alert alert-warning';
    fallback.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Media temporarily unavailable';
    element.parentNode.replaceChild(fallback, element);
}

// Auto-save progress when leaving page
window.addEventListener('beforeunload', function() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('vocabulary')) {
        saveProgress('module1', 'vocabulary', true);
    } else if (currentPage.includes('grammar')) {
        saveProgress('module1', 'grammar', true);
    } else if (currentPage.includes('culture')) {
        saveProgress('module1', 'culture', true);
    } else if (currentPage.includes('activities')) {
        saveProgress('module1', 'activities', true);
    } else if (currentPage.includes('project')) {
        saveProgress('module1', 'project', true);
    }
});

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

window.addEventListener('load', logPerformance);

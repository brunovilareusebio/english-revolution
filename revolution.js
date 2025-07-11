// English Revolution JavaScript - Interactive Learning Functions

// Initialize the revolution
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌊 English Revolution loaded! Let\'s get groovy!');
    
    // Initialize all interactive elements
    initializeAlphabetCards();
    initializeNumberCards();
    initializeProgressTracking();
    initializeAudioElements();
    
    // Add groovy animations
    addGroovyEffects();
});

// Alphabet Card Interactions
function initializeAlphabetCards() {
    const letterCards = document.querySelectorAll('.letter-card');
    
    letterCards.forEach(card => {
        card.addEventListener('click', function() {
            const letter = this.dataset.letter;
            playLetterSound(letter);
            this.classList.add('groovy-pulse');
            
            setTimeout(() => {
                this.classList.remove('groovy-pulse');
            }, 2000);
        });
    });
}

// Number Card Interactions
function initializeNumberCards() {
    const numberCards = document.querySelectorAll('.number-card');
    
    numberCards.forEach(card => {
        card.addEventListener('click', function() {
            const number = this.querySelector('.number').textContent;
            playNumberSound(number);
            this.style.background = 'linear-gradient(135deg, #FF6B35, #FFE66D)';
            
            setTimeout(() => {
                this.style.background = 'white';
            }, 1000);
        });
    });
}

// Audio Functions
function playLetterSound(letter) {
    // Text-to-speech for letter pronunciation
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    speechSynthesis.speak(utterance);
}

function playNumberSound(number) {
    // Text-to-speech for number pronunciation
    const utterance = new SpeechSynthesisUtterance(number);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    speechSynthesis.speak(utterance);
}

function playAlphabetSong() {
    // Play funky alphabet song
    const alphabetSong = "A B C D E F G, H I J K L M N O P, Q R S T U V, W X Y and Z! Now I know my ABCs, next time won't you sing with me!";
    const utterance = new SpeechSynthesisUtterance(alphabetSong);
    utterance.rate = 0.9;
    utterance.pitch = 1.3;
    speechSynthesis.speak(utterance);
}

// Spelling Challenge
function spellChallenge(word) {
    const letters = word.split('');
    let currentIndex = 0;
    
    const modal = document.createElement('div');
    modal.className = 'challenge-modal';
    modal.innerHTML = `
        <div class="challenge-content">
            <h3>Spell: ${word}</h3>
            <div class="challenge-progress">
                <div class="challenge-letters">
                    ${letters.map((letter, index) => `
                        <span class="challenge-letter ${index === 0 ? 'active' : ''}" data-index="${index}">
                            ${index === 0 ? letter : '_'}
                        </span>
                    `).join('')}
                </div>
            </div>
            <p>Click to hear the next letter!</p>
            <button class="btn btn-primary" onclick="nextLetter()">Next Letter</button>
            <button class="btn btn-secondary" onclick="closeChallenge()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Store challenge data
    window.currentChallenge = {
        word: word,
        letters: letters,
        currentIndex: 0,
        modal: modal
    };
    
    // Play first letter
    playLetterSound(letters[0]);
}

function nextLetter() {
    const challenge = window.currentChallenge;
    if (!challenge) return;
    
    challenge.currentIndex++;
    
    if (challenge.currentIndex >= challenge.letters.length) {
        // Challenge complete!
        const utterance = new SpeechSynthesisUtterance("Great job! You spelled " + challenge.word + " correctly!");
        utterance.rate = 0.9;
        utterance.pitch = 1.3;
        speechSynthesis.speak(utterance);
        
        closeChallenge();
        return;
    }
    
    // Update UI
    const letterElements = challenge.modal.querySelectorAll('.challenge-letter');
    letterElements.forEach((el, index) => {
        if (index <= challenge.currentIndex) {
            el.textContent = challenge.letters[index];
            el.classList.add('revealed');
        }
        el.classList.toggle('active', index === challenge.currentIndex);
    });
    
    // Play current letter
    playLetterSound(challenge.letters[challenge.currentIndex]);
}

function closeChallenge() {
    if (window.currentChallenge) {
        document.body.removeChild(window.currentChallenge.modal);
        window.currentChallenge = null;
    }
}

// Counting Game
function checkCount() {
    const answer = document.getElementById('countAnswer').value;
    const correctAnswer = 3; // Based on the example
    
    if (parseInt(answer) === correctAnswer) {
        showMessage("Groovy! You counted correctly! 🎉", "success");
        playSuccessSound();
    } else {
        showMessage("Not quite right, try again! 😊", "warning");
    }
}

// Grammar Exercise Functions
function checkAnswer(button, result) {
    const allButtons = button.parentElement.querySelectorAll('button');
    
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('btn-outline-primary');
    });
    
    if (result === 'correct') {
        button.classList.add('btn-success');
        showMessage("Correct! Right on! 🎯", "success");
        playSuccessSound();
    } else {
        button.classList.add('btn-danger');
        showMessage("Try again next time! 😊", "info");
    }
}

// Progress Tracking
function initializeProgressTracking() {
    const progressData = getProgressData();
    updateProgressBars(progressData);
}

function getProgressData() {
    return JSON.parse(localStorage.getItem('englishRevolutionProgress')) || {
        module1: {
            vocabulary: false,
            grammar: false,
            culture: false,
            activities: false,
            project: false
        }
    };
}

function updateProgressData(module, section) {
    const progress = getProgressData();
    progress[module][section] = true;
    localStorage.setItem('englishRevolutionProgress', JSON.stringify(progress));
    updateProgressBars(progress);
}

function updateProgressBars(progressData) {
    const module1Progress = progressData.module1;
    const completedSections = Object.values(module1Progress).filter(Boolean).length;
    const totalSections = Object.keys(module1Progress).length;
    const percentage = (completedSections / totalSections) * 100;
    
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = percentage + '%';
    });
    
    const progressTexts = document.querySelectorAll('.progress-text');
    progressTexts.forEach(text => {
        text.textContent = Math.round(percentage) + '% Complete';
    });
}

// Sound Effects
function playSuccessSound() {
    const utterance = new SpeechSynthesisUtterance("Right on! That's groovy!");
    utterance.rate = 1.0;
    utterance.pitch = 1.5;
    speechSynthesis.speak(utterance);
}

// Message System
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type} message-popup`;
    messageDiv.textContent = message;
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 10px;
        padding: 15px 20px;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Groovy Effects
function addGroovyEffects() {
    // Add floating animations to random elements
    const floatingElements = document.querySelectorAll('.content-card, .letter-card, .number-card');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.1) + 's';
        element.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .challenge-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .challenge-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        
        .challenge-letters {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 20px 0;
        }
        
        .challenge-letter {
            font-size: 2rem;
            font-weight: 600;
            color: #FF6B35;
            padding: 10px;
            border-radius: 8px;
            border: 2px solid #FF6B35;
            min-width: 50px;
            transition: all 0.3s ease;
        }
        
        .challenge-letter.active {
            background: #FF6B35;
            color: white;
            transform: scale(1.1);
        }
        
        .challenge-letter.revealed {
            background: #4ECDC4;
            border-color: #4ECDC4;
            color: white;
        }
    `;
    
    document.head.appendChild(style);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape' && window.currentChallenge) {
        closeChallenge();
    }
    
    // Space or Enter for next letter in challenge
    if ((e.key === ' ' || e.key === 'Enter') && window.currentChallenge) {
        e.preventDefault();
        nextLetter();
    }
});

// Mobile Touch Support
document.addEventListener('touchstart', function(e) {
    // Add touch feedback for mobile devices
    if (e.target.classList.contains('letter-card') || e.target.classList.contains('number-card')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(e) {
    // Remove touch feedback
    if (e.target.classList.contains('letter-card') || e.target.classList.contains('number-card')) {
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 100);
    }
});

// Auto-save progress
setInterval(() => {
    const currentPage = window.location.pathname;
    if (currentPage.includes('module1-vocabulary')) {
        updateProgressData('module1', 'vocabulary');
    } else if (currentPage.includes('module1-grammar')) {
        updateProgressData('module1', 'grammar');
    } else if (currentPage.includes('module1-culture')) {
        updateProgressData('module1', 'culture');
    } else if (currentPage.includes('module1-activities')) {
        updateProgressData('module1', 'activities');
    } else if (currentPage.includes('module1-project')) {
        updateProgressData('module1', 'project');
    }
}, 30000); // Auto-save every 30 seconds

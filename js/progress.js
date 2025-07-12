// Progress tracking functionality
class ProgressTracker {
    constructor() {
        this.modules = this.loadProgress();
        this.initializeEventListeners();
        this.updateDisplay();
    }

    loadProgress() {
        const saved = localStorage.getItem('englishRevolutionProgress');
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem('englishRevolutionProgress', JSON.stringify(this.modules));
    }

    toggleModule(moduleId) {
        this.modules[moduleId] = !this.modules[moduleId];
        this.saveProgress();
        this.updateDisplay();
    }

    updateDisplay() {
        const totalModules = 18;
        const completedModules = Object.values(this.modules).filter(Boolean).length;
        const percentage = ((completedModules / totalModules) * 100).toFixed(1);

        // Update overall progress
        const overallProgress = document.getElementById('overall-progress');
        if (overallProgress) {
            overallProgress.style.width = percentage + '%';
        }

        // Update module states
        for (let i = 1; i <= totalModules; i++) {
            const moduleItem = document.querySelector(`[data-module="${i}"]`);
            if (moduleItem) {
                const isCompleted = this.modules[i];
                const icon = moduleItem.querySelector('i');
                const button = moduleItem.querySelector('button');

                if (isCompleted) {
                    moduleItem.classList.add('completed');
                    icon.className = 'fas fa-check-circle text-success me-2';
                    button.innerHTML = '<i class="fas fa-undo"></i> Desmarcar';
                    button.className = 'btn btn-sm btn-outline-success ms-auto';
                } else {
                    moduleItem.classList.remove('completed');
                    icon.className = 'fas fa-circle text-muted me-2';
                    button.innerHTML = '<i class="fas fa-check"></i> Completar';
                    button.className = 'btn btn-sm btn-outline-primary ms-auto';
                }
            }
        }

        // Update level progress
        this.updateLevelProgress();
    }

    updateLevelProgress() {
        const levels = [
            { start: 1, end: 6, class: 'success' },
            { start: 7, end: 12, class: 'warning' },
            { start: 13, end: 18, class: 'danger' }
        ];

        levels.forEach((level, index) => {
            const completed = this.getCompletedInRange(level.start, level.end);
            const total = level.end - level.start + 1;
            const percentage = (completed / total) * 100;

            const progressBar = document.querySelector(`.level-card:nth-child(${index + 1}) .progress-bar`);
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
        });
    }

    getCompletedInRange(start, end) {
        let count = 0;
        for (let i = start; i <= end; i++) {
            if (this.modules[i]) count++;
        }
        return count;
    }

    initializeEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-module]')) {
                const moduleId = parseInt(e.target.closest('[data-module]').dataset.module);
                this.toggleModule(moduleId);
            }
        });
    }
}

// Initialize progress tracker
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});

// Global function for button clicks
function toggleModule(moduleId) {
    if (window.progressTracker) {
        window.progressTracker.toggleModule(moduleId);
    }
}

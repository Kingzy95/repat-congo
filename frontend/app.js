// Application State
const appState = {
    activeSection: 'dashboard',
    activeTab: 'drones',
    pomodoroTime: 25 * 60, // 25 minutes in seconds
    pomodoroInterval: null,
    pomodoroRunning: false,
    habits: {
        sport: { streak: 5, completed: false },
        reading: { streak: 3, completed: false },
        networking: { streak: 2, completed: false }
    },
    swotData: {
        forces: [
            "Diplôme Epitech Architecture Logiciel",
            "Spécialisation Data & IA",
            "Vision entrepreneuriale claire",
            "Connaissance technologies modernes"
        ],
        faiblesses: [
            "Manque expérience terrain Congo",
            "Absence réseau professionnel local",
            "Méconnaissance spécificités culturelles",
            "Capital départ potentiellement limité"
        ],
        opportunites: [
            "Économie croissance 4,4% 2025",
            "Secteur pétrolier cherchant innovation",
            "Marché drones expansion Afrique",
            "CARIA Centre IA Brazzaville"
        ],
        menaces: [
            "Écosystème entrepreneurial peu mature",
            "Difficultés accès financement",
            "Réglementation drone restrictive",
            "Concurrence internationale tech"
        ]
    }
};

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Navigation System
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.dataset.section;
            showSection(targetSection);
            updateActiveNavLink(link);
        });
    });
}

function showSection(sectionId) {
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.activeSection = sectionId;
    }
}

function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Countdown Timer
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

function updateCountdown() {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 4); // 4 months from now
    
    const now = new Date();
    const difference = targetDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

// Task Management
function initTaskManagement() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleTaskChange);
    });
}

function handleTaskChange(e) {
    const checkbox = e.target;
    const label = checkbox.nextElementSibling;
    
    if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
        label.style.opacity = '0.6';
        updateProgress();
    } else {
        label.style.textDecoration = 'none';
        label.style.opacity = '1';
        updateProgress();
    }
}

function updateProgress() {
    // Update month progress bars based on checked tasks
    const timelineMonths = document.querySelectorAll('.timeline-month');
    
    timelineMonths.forEach((month, index) => {
        const checkboxes = month.querySelectorAll('input[type="checkbox"]');
        const checkedBoxes = month.querySelectorAll('input[type="checkbox"]:checked');
        const progress = (checkedBoxes.length / checkboxes.length) * 100;
        
        const progressBar = month.querySelector('.progress-fill');
        const progressText = month.querySelector('.month-progress span');
        
        if (progressBar && progressText) {
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}% complété`;
        }
    });
}

// SWOT Analysis
function initSWOTAnalysis() {
    const addButtons = document.querySelectorAll('.add-item-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', handleAddSWOTItem);
    });
    
    renderSWOTItems();
    generateRecommendations();
}

function handleAddSWOTItem(e) {
    const category = e.target.dataset.category;
    const newItem = prompt(`Ajouter un élément à ${category}:`);
    
    if (newItem && newItem.trim()) {
        appState.swotData[category].push(newItem.trim());
        renderSWOTItems();
        generateRecommendations();
    }
}

function renderSWOTItems() {
    Object.keys(appState.swotData).forEach(category => {
        const container = document.getElementById(`${category}-content`);
        if (container) {
            container.innerHTML = '';
            appState.swotData[category].forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'swot-item';
                itemDiv.innerHTML = `
                    ${item}
                    <button class="btn btn--sm btn--outline" onclick="removeSWOTItem('${category}', ${index})" style="margin-left: 8px; padding: 2px 6px;">×</button>
                `;
                container.appendChild(itemDiv);
            });
        }
    });
}

function removeSWOTItem(category, index) {
    appState.swotData[category].splice(index, 1);
    renderSWOTItems();
    generateRecommendations();
}

function generateRecommendations() {
    const recommendations = [
        "Exploiter votre expertise IA pour différencier vos services drones",
        "Développer un réseau local avant l'installation",
        "Étudier les spécificités culturelles congolaises",
        "Commencer par le secteur pétrolier (forte opportunité)",
        "Établir des partenariats avec CARIA pour la crédibilité",
        "Préparer un capital suffisant pour les 12 premiers mois"
    ];
    
    const container = document.getElementById('recommendations-list');
    if (container) {
        container.innerHTML = '';
        recommendations.slice(0, 3).forEach(rec => {
            const recDiv = document.createElement('div');
            recDiv.className = 'recommendation';
            recDiv.textContent = rec;
            container.appendChild(recDiv);
        });
    }
}

// Tab System for Opportunities
function initTabSystem() {
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetTab = button.dataset.tab;
            showTab(targetTab);
            updateActiveTab(button);
        });
    });
}

function showTab(tabId) {
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`${tabId}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
        appState.activeTab = tabId;
    }
}

function updateActiveTab(activeButton) {
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Pomodoro Timer
function initPomodoroTimer() {
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const resetBtn = document.getElementById('reset-timer');
    
    if (startBtn) startBtn.addEventListener('click', startPomodoro);
    if (pauseBtn) pauseBtn.addEventListener('click', pausePomodoro);
    if (resetBtn) resetBtn.addEventListener('click', resetPomodoro);
    
    updateTimerDisplay();
}

function startPomodoro() {
    if (!appState.pomodoroRunning) {
        appState.pomodoroRunning = true;
        document.getElementById('timer-status').textContent = 'En cours...';
        
        appState.pomodoroInterval = setInterval(() => {
            appState.pomodoroTime--;
            updateTimerDisplay();
            
            if (appState.pomodoroTime <= 0) {
                finishPomodoro();
            }
        }, 1000);
    }
}

function pausePomodoro() {
    if (appState.pomodoroRunning) {
        appState.pomodoroRunning = false;
        clearInterval(appState.pomodoroInterval);
        document.getElementById('timer-status').textContent = 'En pause';
    }
}

function resetPomodoro() {
    appState.pomodoroRunning = false;
    clearInterval(appState.pomodoroInterval);
    appState.pomodoroTime = 25 * 60;
    updateTimerDisplay();
    document.getElementById('timer-status').textContent = 'Prêt à commencer';
}

function finishPomodoro() {
    appState.pomodoroRunning = false;
    clearInterval(appState.pomodoroInterval);
    document.getElementById('timer-status').textContent = 'Terminé! Prenez une pause.';
    
    // Reset for next session
    appState.pomodoroTime = 25 * 60;
    updateTimerDisplay();
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro terminé!', {
            body: 'Temps de faire une pause de 5 minutes.',
            icon: '🍅'
        });
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(appState.pomodoroTime / 60);
    const seconds = appState.pomodoroTime % 60;
    
    document.getElementById('timer-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('timer-seconds').textContent = seconds.toString().padStart(2, '0');
}

// Habits Tracking
function initHabitsTracking() {
    const markDoneButtons = document.querySelectorAll('.mark-done');
    markDoneButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            markHabitDone(index);
        });
    });
}

function markHabitDone(habitIndex) {
    const habitNames = ['sport', 'reading', 'networking'];
    const habitName = habitNames[habitIndex];
    
    if (habitName && !appState.habits[habitName].completed) {
        appState.habits[habitName].completed = true;
        appState.habits[habitName].streak += 1;
        
        // Update UI
        updateHabitsDisplay();
        
        // Show success message
        showNotification(`Bravo! Habitude "${habitName}" complétée aujourd'hui!`);
    }
}

function updateHabitsDisplay() {
    const habitItems = document.querySelectorAll('.habit-item');
    const habitNames = ['sport', 'reading', 'networking'];
    
    habitItems.forEach((item, index) => {
        const habitName = habitNames[index];
        const streakSpan = item.querySelector('.habit-streak');
        const button = item.querySelector('.mark-done');
        
        if (streakSpan && habitName) {
            streakSpan.textContent = `Série: ${appState.habits[habitName].streak} jours`;
            
            if (appState.habits[habitName].completed) {
                button.textContent = '✓ Fait';
                button.disabled = true;
                button.style.opacity = '0.6';
            }
        }
    });
}

// Notification System
function showNotification(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Progress Updates
function initProgressTracking() {
    // Update KPIs based on completed tasks
    updateKPIs();
    
    // Set up periodic updates
    setInterval(updateKPIs, 30000); // Update every 30 seconds
}

function updateKPIs() {
    // Calculate overall preparation progress
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const overallProgress = Math.round((checkedBoxes.length / allCheckboxes.length) * 100);
    
    // Update preparation KPI
    const prepKPI = document.querySelector('.kpi-item .kpi-value');
    if (prepKPI) {
        prepKPI.textContent = `${overallProgress}%`;
    }
    
    const prepProgressBar = document.querySelector('.kpis-card .progress-fill');
    if (prepProgressBar) {
        prepProgressBar.style.width = `${overallProgress}%`;
    }
}

// Data Persistence (using localStorage)
function saveData() {
    const dataToSave = {
        swotData: appState.swotData,
        habits: appState.habits,
        activeSection: appState.activeSection,
        activeTab: appState.activeTab
    };
    
    try {
        localStorage.setItem('entrepreneurCongoApp', JSON.stringify(dataToSave));
    } catch (e) {
        console.warn('Could not save data to localStorage:', e);
    }
}

function loadData() {
    try {
        const savedData = localStorage.getItem('entrepreneurCongoApp');
        if (savedData) {
            const parsed = JSON.parse(savedData);
            
            // Merge saved data with default state
            if (parsed.swotData) {
                appState.swotData = { ...appState.swotData, ...parsed.swotData };
            }
            if (parsed.habits) {
                appState.habits = { ...appState.habits, ...parsed.habits };
            }
            if (parsed.activeSection) {
                appState.activeSection = parsed.activeSection;
            }
            if (parsed.activeTab) {
                appState.activeTab = parsed.activeTab;
            }
        }
    } catch (e) {
        console.warn('Could not load data from localStorage:', e);
    }
}

// Daily Reset for Habits
function checkDailyReset() {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastHabitReset');
    
    if (lastReset !== today) {
        // Reset daily habits
        Object.keys(appState.habits).forEach(habit => {
            appState.habits[habit].completed = false;
        });
        
        localStorage.setItem('lastHabitReset', today);
        updateHabitsDisplay();
    }
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Only trigger if no input is focused
        if (document.activeElement.tagName !== 'INPUT' && 
            document.activeElement.tagName !== 'TEXTAREA') {
            
            switch(e.key) {
                case '1':
                    showSection('dashboard');
                    updateActiveNavLink(document.querySelector('[data-section="dashboard"]'));
                    break;
                case '2':
                    showSection('swot');
                    updateActiveNavLink(document.querySelector('[data-section="swot"]'));
                    break;
                case '3':
                    showSection('planning');
                    updateActiveNavLink(document.querySelector('[data-section="planning"]'));
                    break;
                case '4':
                    showSection('opportunities');
                    updateActiveNavLink(document.querySelector('[data-section="opportunities"]'));
                    break;
                case '5':
                    showSection('productivity');
                    updateActiveNavLink(document.querySelector('[data-section="productivity"]'));
                    break;
                case '6':
                    showSection('resources');
                    updateActiveNavLink(document.querySelector('[data-section="resources"]'));
                    break;
                case ' ':
                    e.preventDefault();
                    if (appState.activeSection === 'productivity') {
                        if (appState.pomodoroRunning) {
                            pausePomodoro();
                        } else {
                            startPomodoro();
                        }
                    }
                    break;
            }
        }
    });
}

// Request Notification Permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Auto-save functionality
function initAutoSave() {
    setInterval(saveData, 30000); // Save every 30 seconds
    
    // Save on page unload
    window.addEventListener('beforeunload', saveData);
}

// Initialize Application
function initApp() {
    console.log('🇨🇬 Initializing Congo Entrepreneur App...');
    
    // Load saved data first
    loadData();
    
    // Initialize all components
    initNavigation();
    initCountdown();
    initTaskManagement();
    initSWOTAnalysis();
    initTabSystem();
    initPomodoroTimer();
    initHabitsTracking();
    initProgressTracking();
    initKeyboardShortcuts();
    initAutoSave();
    
    // Check for daily reset
    checkDailyReset();
    
    // Request notification permission
    requestNotificationPermission();
    
    // Show initial section
    showSection(appState.activeSection);
    const activeNavLink = document.querySelector(`[data-section="${appState.activeSection}"]`);
    if (activeNavLink) {
        updateActiveNavLink(activeNavLink);
    }
    
    // Show initial tab
    showTab(appState.activeTab);
    const activeTabButton = document.querySelector(`[data-tab="${appState.activeTab}"]`);
    if (activeTabButton) {
        updateActiveTab(activeTabButton);
    }
    
    // Update displays
    updateHabitsDisplay();
    updateProgress();
    
    console.log('✅ App initialized successfully!');
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Bienvenue dans votre assistant entrepreneurial Congo! 🇨🇬');
    }, 1000);
}

// Make functions globally available for inline event handlers
window.removeSWOTItem = removeSWOTItem;

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
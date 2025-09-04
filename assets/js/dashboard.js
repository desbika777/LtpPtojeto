class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.currentSort = 'date';
        this.currentDate = new Date();
        this.selectedDate = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.displayTasks();
        this.updateStatistics();
        this.setCurrentDate();
        this.checkUserAuth();
    }

    initializeElements() {
        // Form elements
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskDifficulty = document.getElementById('taskDifficulty');
        this.taskDate = document.getElementById('taskDate');
        this.taskCategory = document.getElementById('taskCategory');
        
        // Filter elements
        this.filterTabs = document.querySelectorAll('.filter-tab');
        this.sortSelect = document.getElementById('sortBy');
        
        // Task list
        this.tasksList = document.getElementById('tasksList');
        this.emptyState = document.getElementById('emptyState');
        
        // Statistics
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.pendingTasksEl = document.getElementById('pendingTasks');
        this.progressPercentageEl = document.getElementById('progressPercentage');
        
        // Modals
        this.helpModal = document.getElementById('helpModal');
        this.calendarModal = document.getElementById('calendarModal');
        this.profileModal = document.getElementById('profileModal');
        
        // User elements
        this.welcomeMessage = document.getElementById('welcomeMessage');
        this.userMenuBtn = document.getElementById('userMenuBtn');
        this.userDropdown = document.getElementById('userDropdown');
        
        // Set default date to today
        this.taskDate.value = this.formatDate(new Date());
    }

    attachEventListeners() {
        // Task management
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        // Filter and sort
        this.filterTabs.forEach(tab => {
            tab.addEventListener('click', () => this.setFilter(tab.dataset.filter));
        });
        this.sortSelect.addEventListener('change', () => this.setSortBy(this.sortSelect.value));
        
        // Clear completed tasks
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompletedTasks());
        
        // Modals
        document.getElementById('helpBtn').addEventListener('click', () => this.showModal('help'));
        document.getElementById('calendarBtn').addEventListener('click', () => this.showModal('calendar'));
        document.getElementById('profileBtn').addEventListener('click', () => this.showModal('profile'));
        document.getElementById('closeHelpModal').addEventListener('click', () => this.hideModal('help'));
        document.getElementById('closeCalendarModal').addEventListener('click', () => this.hideModal('calendar'));
        document.getElementById('closeProfileModal').addEventListener('click', () => this.hideModal('profile'));
        
        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
        
        // User menu
        this.userMenuBtn.addEventListener('click', () => this.toggleUserMenu());
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        
        // Click outside to close user menu
        document.addEventListener('click', (e) => {
            if (!this.userMenuBtn.contains(e.target) && !this.userDropdown.contains(e.target)) {
                this.userDropdown.classList.remove('show');
            }
        });
        
        // Modal close on backdrop click
        this.helpModal.addEventListener('click', (e) => {
            if (e.target === this.helpModal) this.hideModal('help');
        });
        this.calendarModal.addEventListener('click', (e) => {
            if (e.target === this.calendarModal) this.hideModal('calendar');
        });
        this.profileModal.addEventListener('click', (e) => {
            if (e.target === this.profileModal) this.hideModal('profile');
        });

        // Profile functionality
        this.initializeProfile();

        // Footer functionality
        this.initializeFooter();
    }

    // Task Management
    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.showNotification('Por favor, digite uma tarefa!', 'error');
            return;
        }

        const task = {
            id: Date.now().toString(),
            text: text,
            difficulty: this.taskDifficulty.value,
            date: this.taskDate.value,
            category: this.taskCategory.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.displayTasks();
        this.updateStatistics();
        
        // Clear form
        this.taskInput.value = '';
        this.taskDate.value = this.formatDate(new Date());
        this.taskDifficulty.value = 'easy';
        this.taskCategory.value = 'personal';
        
        this.showNotification('Tarefa adicionada com sucesso!', 'success');
    }

    deleteTask(taskId, fromCalendar = false) {
        if (confirm('Deseja realmente excluir esta tarefa?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.displayTasks();
            this.updateStatistics();
            this.showNotification('Tarefa removida!', 'info');
            
            // Se a exclusão veio do calendário, atualiza a visualização do calendário
            if (fromCalendar && this.selectedDate) {
                const tasksForDate = this.tasks.filter(task => task.date === this.selectedDate);
                this.selectCalendarDate(this.selectedDate, tasksForDate);
                this.generateCalendar(); // Regenera o calendário para atualizar os indicadores
            }
        }
    }

    toggleTask(taskId, fromCalendar = false) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.displayTasks();
            this.updateStatistics();
            
            const message = task.completed ? 'Tarefa concluída! 🎉' : 'Tarefa marcada como pendente';
            this.showNotification(message, task.completed ? 'success' : 'info');
            
            // Se a alteração veio do calendário, atualiza a visualização do calendário
            if (fromCalendar && this.selectedDate) {
                const tasksForDate = this.tasks.filter(task => task.date === this.selectedDate);
                this.selectCalendarDate(this.selectedDate, tasksForDate);
                this.generateCalendar(); // Regenera o calendário para atualizar os indicadores
            }
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        const newText = prompt('Editar tarefa:', task.text);
        if (newText && newText.trim() && newText.trim() !== task.text) {
            task.text = newText.trim();
            this.saveTasks();
            this.displayTasks();
            this.showNotification('Tarefa atualizada!', 'success');
        }
    }

    clearCompletedTasks() {
        const completedCount = this.tasks.filter(task => task.completed).length;
        if (completedCount === 0) {
            this.showNotification('Nenhuma tarefa concluída para remover', 'info');
            return;
        }

        if (confirm(`Deseja remover ${completedCount} tarefa(s) concluída(s)?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.displayTasks();
            this.updateStatistics();
            this.showNotification(`${completedCount} tarefa(s) removida(s)!`, 'success');
        }
    }

    // Display and Filtering
    displayTasks() {
        let filteredTasks = this.getFilteredTasks();
        filteredTasks = this.sortTasks(filteredTasks);

        if (filteredTasks.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();
        this.tasksList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
        
        // Add event listeners to task elements
        this.tasksList.querySelectorAll('.task-item').forEach(item => {
            const taskId = item.dataset.taskId;
            
            item.querySelector('.task-checkbox').addEventListener('click', () => this.toggleTask(taskId));
            item.querySelector('.btn-edit').addEventListener('click', () => this.editTask(taskId));
            item.querySelector('.btn-delete').addEventListener('click', () => this.deleteTask(taskId));
        });
    }

    getFilteredTasks() {
        const today = this.formatDate(new Date());
        
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            case 'today':
                return this.tasks.filter(task => task.date === today);
            default:
                return this.tasks;
        }
    }

    sortTasks(tasks) {
        const sortedTasks = [...tasks];
        
        switch (this.currentSort) {
            case 'difficulty':
                const difficultyOrder = { 'hard': 0, 'medium': 1, 'easy': 2 };
                return sortedTasks.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
            case 'category':
                return sortedTasks.sort((a, b) => a.category.localeCompare(b.category));
            case 'alphabetical':
                return sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
            case 'date':
            default:
                return sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
    }

    createTaskHTML(task) {
        const difficultyIcons = {
            easy: '🟢',
            medium: '🟡',
            hard: '🔴'
        };

        const categoryIcons = {
            personal: '👤',
            work: '💼',
            study: '📚',
            health: '🏃',
            shopping: '🛒',
            other: '📝'
        };

        const isOverdue = new Date(task.date) < new Date() && !task.completed;
        const formattedDate = this.formatDisplayDate(task.date);

        return `
            <div class="task-item ${task.difficulty} ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} slide-in" data-task-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'completed' : ''}">
                    ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="task-content">
                    <div class="task-text">${task.text}</div>
                    <div class="task-meta">
                        <span>${difficultyIcons[task.difficulty]} ${this.getDifficultyLabel(task.difficulty)}</span>
                        <span>${categoryIcons[task.category]} ${this.getCategoryLabel(task.category)}</span>
                        <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                        ${isOverdue ? '<span style="color: #f44336;"><i class="fas fa-exclamation-triangle"></i> Atrasada</span>' : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-edit" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active tab
        this.filterTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === filter);
        });
        
        this.displayTasks();
    }

    setSortBy(sortBy) {
        this.currentSort = sortBy;
        this.displayTasks();
    }

    showEmptyState() {
        this.emptyState.style.display = 'block';
        this.tasksList.style.display = 'none';
    }

    hideEmptyState() {
        this.emptyState.style.display = 'none';
        this.tasksList.style.display = 'flex';
    }

    // Statistics
    updateStatistics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        this.totalTasksEl.textContent = total;
        this.completedTasksEl.textContent = completed;
        this.pendingTasksEl.textContent = pending;
        this.progressPercentageEl.textContent = `${progress}%`;

        // Update footer stats if elements exist
        if (document.getElementById('footerTotalTasks')) {
            this.updateFooterStats();
        }
    }

    // Calendar
    showCalendar() {
        this.generateCalendar();
        this.showModal('calendar');
    }

    generateCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update calendar title
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        document.getElementById('calendarTitle').textContent = `${monthNames[month]} ${year}`;
        
        // Generate calendar grid
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header-day';
            header.textContent = day;
            header.style.cssText = `
                background: #667eea;
                color: white;
                padding: 0.5rem;
                text-align: center;
                font-weight: 600;
                font-size: 0.8rem;
            `;
            calendarGrid.appendChild(header);
        });
        
        // Generate calendar days
        const today = new Date();
        const todayStr = this.formatDate(today);
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dateStr = this.formatDate(date);
            const isCurrentMonth = date.getMonth() === month;
            const isToday = dateStr === todayStr;
            const tasksForDate = this.tasks.filter(task => task.date === dateStr);
            const hasOverdue = tasksForDate.some(task => !task.completed && new Date(task.date) < today);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            if (!isCurrentMonth) dayElement.classList.add('other-month');
            if (isToday) dayElement.classList.add('today');
            if (tasksForDate.length > 0) dayElement.classList.add('has-tasks');
            if (hasOverdue) dayElement.classList.add('overdue');
            
            dayElement.innerHTML = `
                <div>${date.getDate()}</div>
                ${tasksForDate.length > 0 ? `<div style="font-size: 0.7rem; color: #666;">${tasksForDate.length} tarefa(s)</div>` : ''}
            `;
            
            dayElement.addEventListener('click', () => this.selectCalendarDate(dateStr, tasksForDate));
            calendarGrid.appendChild(dayElement);
        }
    }

    selectCalendarDate(dateStr, tasks) {
        this.selectedDate = dateStr;
        const formattedDate = this.formatDisplayDate(dateStr);
        
        document.getElementById('selectedDateTitle').textContent = `Tarefas para ${formattedDate}`;
        
        const selectedDateTasks = document.getElementById('selectedDateTasks');
        if (tasks.length === 0) {
            selectedDateTasks.innerHTML = '<p style="color: #666; text-align: center;">Nenhuma tarefa para esta data</p>';
        } else {
            selectedDateTasks.innerHTML = tasks.map(task => `
                <div class="task-item ${task.difficulty} ${task.completed ? 'completed' : ''}" style="margin-bottom: 0.5rem;" data-task-id="${task.id}">
                    <div class="task-checkbox ${task.completed ? 'completed' : ''}" onclick="taskManager.toggleTask('${task.id}', true)">
                        ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <div class="task-content">
                        <div class="task-text">${task.text}</div>
                        <div class="task-meta">
                            <span>${this.getDifficultyLabel(task.difficulty)}</span>
                            <span>${this.getCategoryLabel(task.category)}</span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn-edit" title="Editar" onclick="taskManager.editTask('${task.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete" title="Excluir" onclick="taskManager.deleteTask('${task.id}', true)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.generateCalendar();
    }

    // Modal Management
    showModal(type) {
        const modal = type === 'help' ? this.helpModal : 
                      type === 'calendar' ? this.calendarModal : 
                      this.profileModal;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        if (type === 'calendar') {
            this.generateCalendar();
        } else if (type === 'profile') {
            this.loadProfileData();
            this.animateProfileStats();
        }
    }

    hideModal(type) {
        const modal = type === 'help' ? this.helpModal : 
                      type === 'calendar' ? this.calendarModal : 
                      this.profileModal;
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Profile Management
    initializeProfile() {
        // Avatar upload
        document.querySelector('.avatar-wrapper').addEventListener('click', () => {
            document.getElementById('avatarInput').click();
        });

        document.getElementById('avatarInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profileAvatar').src = e.target.result;
                    this.saveProfileData({ avatar: e.target.result });
                };
                reader.readAsDataURL(file);
            }
        });

        // Profile tabs
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.dataset.tab;
                this.switchProfileTab(tabType);
            });
        });

        // Save profile button
        document.querySelector('.btn-save-profile').addEventListener('click', () => {
            this.saveProfileInfo();
        });

        // Toggle switches
    // (Preferências removidas)
    }

    loadProfileData() {
        const userData = JSON.parse(localStorage.getItem('ltpUser') || '{}');
        const profileData = userData.profile || {};

        // Load basic info
        document.getElementById('profileName').textContent = userData.name || 'Usuário';
        document.getElementById('profileEmail').textContent = userData.email || 'usuario@email.com';
        document.getElementById('editName').value = userData.name || '';
        document.getElementById('editEmail').value = userData.email || '';
    // Campos de meta/foco removidos

        // Load avatar
        if (profileData.avatar) {
            document.getElementById('profileAvatar').src = profileData.avatar;
        }

        // Load member since date
        const memberSince = new Date(userData.createdAt || Date.now());
        document.getElementById('memberSince').textContent = 
            `Membro desde ${memberSince.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}`;

    // Preferências removidas

        // Update achievements
        this.updateAchievements();
    }

    saveProfileData(data) {
        const userData = JSON.parse(localStorage.getItem('ltpUser') || '{}');
        if (!userData.profile) userData.profile = {};
        
        Object.assign(userData.profile, data);
        localStorage.setItem('ltpUser', JSON.stringify(userData));
    }

    saveProfileInfo() {
    const profileData = {}; // metas removidas

        const userData = JSON.parse(localStorage.getItem('ltpUser') || '{}');
        userData.name = document.getElementById('editName').value;
        userData.email = document.getElementById('editEmail').value;

        this.saveProfileData(profileData);
        localStorage.setItem('ltpUser', JSON.stringify(userData));

        // Update display
        document.getElementById('profileName').textContent = userData.name;
        document.getElementById('profileEmail').textContent = userData.email;
        this.welcomeMessage.textContent = `Olá, ${userData.name}!`;

        this.showNotification('Perfil atualizado com sucesso! 🎉', 'success');
        this.createConfettiEffect();
    // progresso diário removido
    }

    createConfettiEffect() {
        const colors = ['#667eea', '#764ba2', '#ff7e5f', '#feb47b', '#56ab2f', '#a8e6cf'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    transform: rotate(${Math.random() * 360}deg);
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                `;
                confettiContainer.appendChild(confetti);
            }, i * 50);
        }

        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 5000);
    }

    switchProfileTab(tabType) {
        // Update tabs
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabType);
        });

        // Update content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(tabType + 'Tab').classList.add('active');
    }

    // savePreference removido

    animateProfileStats() {
        const stats = this.calculateProfileStats();
        
        // Update productivity circle
        this.animateStatCircle(document.querySelectorAll('.stat-circle')[0], stats.productivity);
        document.querySelector('.stat-number').textContent = `${stats.productivity}%`;

        // Update streak days
        this.animateStatCircle(document.querySelectorAll('.stat-circle')[1], (stats.streakDays / 30) * 100);
        document.getElementById('streakDays').textContent = stats.streakDays;

        // Update total completed
        this.animateStatCircle(document.querySelectorAll('.stat-circle')[2], Math.min((stats.totalCompleted / 50) * 100, 100));
        document.getElementById('totalCompleted').textContent = stats.totalCompleted;
    // metas removidas
    }

    animateStatCircle(circle, percentage) {
        // Circle visuals removed; function retained for future extensibility
        // Just store percentage as data attribute (no animation)
        if (circle) {
            circle.dataset.percentage = percentage;
        }
    }

    calculateProfileStats() {
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const totalTasks = this.tasks.length;
        const productivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const todayStr = this.formatDate(new Date());
    const todayCompleted = this.tasks.filter(t => t.completed && t.date === todayStr).length;

        // Calculate streak (simplified)
        const today = new Date();
        let streakDays = 0;
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = this.formatDate(date);
            const dayTasks = this.tasks.filter(task => task.date === dateStr);
            const dayCompleted = dayTasks.filter(task => task.completed).length;
            
            if (dayCompleted > 0) {
                streakDays++;
            } else if (i > 0) {
                break;
            }
        }

        return {
            productivity,
            streakDays,
            totalCompleted: completedTasks,
            todayCompleted
        };
    }

    updateAchievements() {
        const stats = this.calculateProfileStats();
        const achievements = document.querySelectorAll('.achievement-card');

        // Achievement logic
        const achievementConditions = [
            stats.totalCompleted >= 1,  // Primeira Tarefa
            stats.totalCompleted >= 10, // Produtivo
            stats.streakDays >= 7,      // Em Chamas
            stats.totalCompleted >= 100, // Mestre das Tarefas
            this.hasUsedAllCategories(), // Organizador Supremo
            this.getOnTimeTasksCount() >= 20 // Pontual
        ];

        achievements.forEach((card, index) => {
            if (achievementConditions[index]) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
            }
        });
    }

    hasUsedAllCategories() {
        const categories = ['personal', 'work', 'study', 'health', 'shopping', 'other'];
        const usedCategories = new Set(this.tasks.map(task => task.category));
        return categories.every(cat => usedCategories.has(cat));
    }

    getOnTimeTasksCount() {
        return this.tasks.filter(task => {
            if (!task.completed) return false;
            // Simplified: assume task was completed on time if completed
            return new Date(task.date) >= new Date(task.date);
        }).length;
    }

    // Footer Management
    initializeFooter() {
        // Scroll to top functionality
        const scrollToTop = document.getElementById('scrollToTop');
        if (scrollToTop) {
            scrollToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Update footer stats
        this.updateFooterStats();

        // Social links hover effects
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const tooltip = e.target.closest('.social-link').dataset.tooltip;
                if (tooltip) {
                    this.showTooltip(e.target, tooltip);
                }
            });
        });

        // Tech badge animations
        document.querySelectorAll('.tech-badge').forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-3px) scale(1.05)';
            });
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    updateFooterStats() {
        const stats = this.calculateProfileStats();
        
        // Update footer stat numbers
        const footerTotalTasks = document.getElementById('footerTotalTasks');
        const footerCompletedTasks = document.getElementById('footerCompletedTasks');
        const footerProductivity = document.getElementById('footerProductivity');
        const progressText = document.getElementById('progressText');
        const progressCircle = document.getElementById('progressCircle');

        if (footerTotalTasks) {
            this.animateNumber(footerTotalTasks, this.tasks.length);
        }
        
        if (footerCompletedTasks) {
            this.animateNumber(footerCompletedTasks, stats.totalCompleted);
        }
        
        if (footerProductivity) {
            this.animateNumber(footerProductivity, stats.productivity, '%');
        }
    // barra de meta diária removida

        if (progressText) {
            progressText.textContent = `${stats.productivity}%`;
        }

        // Animate progress circle
        if (progressCircle) {
            const circumference = 2 * Math.PI * 35;
            const offset = circumference - (stats.productivity / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }

    // updateDailyGoalProgress removido

    animateNumber(element, targetValue, suffix = '') {
        const startValue = 0;
        const duration = 2000;
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    }

    showTooltip(element, text) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.custom-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Create new tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 10000;
            pointer-events: none;
            transform: translateX(-50%);
            white-space: nowrap;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

        // Remove tooltip after 2 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 2000);
    }

    // User Management
    checkUserAuth() {
        const userData = localStorage.getItem('ltpUser');
        if (!userData) {
            window.location.href = 'index.html';
            return;
        }
        
        const user = JSON.parse(userData);
        
        // Initialize profile data if it doesn't exist
        if (!user.profile) {
            user.profile = {};
            localStorage.setItem('ltpUser', JSON.stringify(user));
        }
        
        // Initialize createdAt if it doesn't exist
        if (!user.createdAt) {
            user.createdAt = Date.now();
            localStorage.setItem('ltpUser', JSON.stringify(user));
        }
        
        this.welcomeMessage.textContent = `Olá, ${user.name}!`;
    }

    toggleUserMenu() {
        this.userDropdown.classList.toggle('show');
    }

    logout() {
        if (confirm('Deseja realmente sair?')) {
            localStorage.removeItem('ltpUser');
            window.location.href = 'index.html';
        }
    }

    // Utility Functions
    loadTasks() {
        const userData = localStorage.getItem('ltpUser');
        if (userData) {
            const user = JSON.parse(userData);
            return user.tasks || [];
        }
        return [];
    }

    saveTasks() {
        const userData = localStorage.getItem('ltpUser');
        if (userData) {
            const user = JSON.parse(userData);
            user.tasks = this.tasks;
            localStorage.setItem('ltpUser', JSON.stringify(user));
        }
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatDisplayDate(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    setCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('pt-BR', options);
    }

    getDifficultyLabel(difficulty) {
        const labels = {
            easy: 'Fácil',
            medium: 'Médio',
            hard: 'Difícil'
        };
        return labels[difficulty] || difficulty;
    }

    getCategoryLabel(category) {
        const labels = {
            personal: 'Pessoal',
            work: 'Trabalho',
            study: 'Estudos',
            health: 'Saúde',
            shopping: 'Compras',
            other: 'Outros'
        };
        return labels[category] || category;
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #4CAF50, #45a049);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #f44336, #d32f2f);
    }
    
    .notification.info {
        background: linear-gradient(135deg, #2196F3, #1976D2);
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the app
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

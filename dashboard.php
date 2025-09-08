<?php /* Página convertida para PHP (markup inalterado) */ ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - LTP</title>
    <link rel="stylesheet" href="assets/css/dashboard.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <i class="fas fa-tasks"></i>
                <h1>LTP</h1>
            </div>
            
            <div class="header-center">
                <h2 id="welcomeMessage">Bem-vindo!</h2>
                <p class="date-display" id="currentDate"></p>
            </div>
            
            <div class="header-actions">
                <button class="btn-help" id="helpBtn" title="Como usar">
                    <i class="fas fa-question-circle"></i>
                </button>
                <button class="btn-calendar" id="calendarBtn" title="Calendário">
                    <i class="fas fa-calendar-alt"></i>
                </button>
                <div class="user-menu">
                    <button class="user-avatar" id="userMenuBtn">
                        <i class="fas fa-user"></i>
                    </button>
                    <div class="user-dropdown" id="userDropdown">
                        <a href="#" id="profileBtn"><i class="fas fa-user-edit"></i> Perfil</a>
                        <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sair</a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Task Input Section -->
        <section class="task-input-section">
            <div class="input-container">
                <div class="task-form">
                    <div class="input-group">
                        <input type="text" id="taskInput" placeholder="Adicione uma nova tarefa..." maxlength="100">
                        <button class="btn-add" id="addTaskBtn">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    
                    <div class="task-options">
                        <select id="taskDifficulty" class="difficulty-select">
                            <option value="easy">🟢 Fácil</option>
                            <option value="medium">🟡 Médio</option>
                            <option value="hard">🔴 Difícil</option>
                        </select>
                        
                        <input type="date" id="taskDate" class="date-input">
                        
                        <select id="taskCategory" class="category-select">
                            <option value="personal">👤 Pessoal</option>
                            <option value="work">💼 Trabalho</option>
                            <option value="study">📚 Estudos</option>
                            <option value="health">🏃 Saúde</option>
                            <option value="shopping">🛒 Compras</option>
                            <option value="other">📝 Outros</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>

        <!-- Statistics Section -->
        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="totalTasks">0</h3>
                        <p>Total de Tarefas</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon completed">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="completedTasks">0</h3>
                        <p>Concluídas</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon pending">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="pendingTasks">0</h3>
                        <p>Pendentes</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon progress">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-info">
                        <h3 id="progressPercentage">0%</h3>
                        <p>Progresso</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Filter Section -->
        <section class="filter-section">
            <div class="filter-container">
                <div class="filter-tabs">
                    <button class="filter-tab active" data-filter="all">
                        <i class="fas fa-list"></i> Todas
                    </button>
                    <button class="filter-tab" data-filter="pending">
                        <i class="fas fa-clock"></i> Pendentes
                    </button>
                    <button class="filter-tab" data-filter="completed">
                        <i class="fas fa-check"></i> Concluídas
                    </button>
                    <button class="filter-tab" data-filter="today">
                        <i class="fas fa-calendar-day"></i> Hoje
                    </button>
                </div>
                
                <div class="filter-options">
                    <select id="sortBy" class="sort-select">
                        <option value="date">Data</option>
                        <option value="difficulty">Dificuldade</option>
                        <option value="category">Categoria</option>
                        <option value="alphabetical">A-Z</option>
                    </select>
                </div>
            </div>
        </section>

        <!-- Tasks Section -->
        <section class="tasks-section">
            <div class="tasks-container">
                <div class="tasks-header">
                    <h3>Suas Tarefas</h3>
                    <div class="tasks-actions">
                        <button class="btn-clear-completed" id="clearCompletedBtn">
                            <i class="fas fa-trash"></i> Limpar Concluídas
                        </button>
                    </div>
                </div>
                
                <div class="tasks-list" id="tasksList">
                    <div class="empty-state" id="emptyState">
                        <div class="empty-icon">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <h4>Nenhuma tarefa encontrada</h4>
                        <p>Adicione sua primeira tarefa para começar!</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Help Modal -->
    <div class="modal" id="helpModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-question-circle"></i> Como usar o LTP</h3>
                <button class="modal-close" id="closeHelpModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="help-grid">
                    <div class="help-item">
                        <div class="help-icon">
                            <i class="fas fa-plus-circle"></i>
                        </div>
                        <div class="help-content">
                            <h4>Adicionar Tarefas</h4>
                            <p>Digite sua tarefa no campo de entrada, escolha a dificuldade, data e categoria, depois clique no botão "+".</p>
                        </div>
                    </div>
                    
                    <div class="help-item">
                        <div class="help-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="help-content">
                            <h4>Marcar como Concluída</h4>
                            <p>Clique no círculo ao lado da tarefa para marcá-la como concluída. Tarefas concluídas ficam riscadas.</p>
                        </div>
                    </div>
                    
                    <div class="help-item">
                        <div class="help-icon">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="help-content">
                            <h4>Editar Tarefas</h4>
                            <p>Clique no ícone de lápis para editar uma tarefa existente. Você pode alterar texto, dificuldade e data.</p>
                        </div>
                    </div>
                    
                    <div class="help-item">
                        <div class="help-icon">
                            <i class="fas fa-filter"></i>
                        </div>
                        <div class="help-content">
                            <h4>Filtrar Tarefas</h4>
                            <p>Use as abas de filtro para ver apenas tarefas pendentes, concluídas ou do dia atual.</p>
                        </div>
                    </div>
                    
                    <div class="help-item">
                        <div class="help-icon">
                            <i class="fas fa-calendar"></i>
                        </div>
                        <div class="help-content">
                            <h4>Calendário</h4>
                            <p>Clique no ícone do calendário para ver suas tarefas organizadas por data em uma visualização mensal.</p>
                        </div>
                    </div>
                    
                    <div class="help-item">
                        <div class="help-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="help-content">
                            <h4>Estatísticas</h4>
                            <p>Acompanhe seu progresso com as estatísticas no topo da página: total, concluídas, pendentes e percentual.</p>
                        </div>
                    </div>
                </div>
                
                <div class="tips-section">
                    <h4><i class="fas fa-lightbulb"></i> Dicas Importantes</h4>
                    <ul>
                        <li>🟢 <strong>Fácil:</strong> Tarefas rápidas (5-15 min)</li>
                        <li>🟡 <strong>Médio:</strong> Tarefas moderadas (30-60 min)</li>
                        <li>🔴 <strong>Difícil:</strong> Tarefas complexas (1+ hora)</li>
                        <li>📅 <strong>Data:</strong> Defina prazos para não esquecer</li>
                        <li>🏷️ <strong>Categorias:</strong> Organize por tipo de atividade</li>
                        <li>💾 <strong>Salvamento:</strong> Suas tarefas são salvas automaticamente</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Profile Modal -->
    <div class="modal" id="profileModal">
        <div class="modal-content profile-modal-content">
            <div class="modal-header profile-header">
                <h3><i class="fas fa-user-circle"></i> Meu Perfil</h3>
                <button class="modal-close" id="closeProfileModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body profile-body">
                <!-- Profile Avatar Section -->
                <div class="profile-avatar-section">
                    <div class="avatar-container">
                        <div class="avatar-wrapper">
                            <img id="profileAvatar" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23667eea'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='30' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E" alt="Avatar">
                            <div class="avatar-overlay">
                                <i class="fas fa-camera"></i>
                                <span>Alterar</span>
                            </div>
                        </div>
                        <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                    </div>
                    <div class="profile-info">
                        <h2 id="profileName">Usuário</h2>
                        <p id="profileEmail">usuario@email.com</p>
                        <div class="profile-badges">
                            <span class="badge" id="memberSince">Membro desde Jan 2025</span>
                            <span class="badge" id="taskMaster">Organizador</span>
                        </div>
                    </div>
                </div>

                <!-- Profile Stats -->
                <div class="profile-stats">
                    <div class="stat-item">
                        <div class="stat-circle" data-percentage="75">
                            <div class="stat-number">75%</div>
                            <div class="stat-label">Produtividade</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-circle" data-percentage="60">
                            <div class="stat-number" id="streakDays">12</div>
                            <div class="stat-label">Dias Seguidos</div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-circle" data-percentage="90">
                            <div class="stat-number" id="totalCompleted">45</div>
                            <div class="stat-label">Concluídas</div>
                        </div>
                    </div>
                </div>

                <!-- Profile Tabs -->
                <div class="profile-tabs">
                    <button class="profile-tab active" data-tab="info">
                        <i class="fas fa-user"></i> Informações
                    </button>
                    <button class="profile-tab" data-tab="achievements">
                        <i class="fas fa-trophy"></i> Conquistas
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="profile-tab-content">
                    <!-- Info Tab -->
                    <div class="tab-pane active" id="infoTab">
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Nome Completo</label>
                            <input type="text" id="editName" class="profile-input" placeholder="Seu nome completo">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-envelope"></i> E-mail</label>
                            <input type="email" id="editEmail" class="profile-input" placeholder="seu@email.com">
                        </div>
                        <button class="btn-save-profile">
                            <i class="fas fa-save"></i> Salvar Alterações
                        </button>
                    </div>

                    <!-- Achievements Tab -->
                    <div class="tab-pane" id="achievementsTab">
                        <div class="achievements-grid">
                            <div class="achievement-card locked">
                                <div class="achievement-icon">🏆</div>
                                <h4>Primeira Tarefa</h4>
                                <p>Complete sua primeira tarefa</p>
                            </div>
                            <div class="achievement-card locked">
                                <div class="achievement-icon">⚡</div>
                                <h4>Produtivo</h4>
                                <p>Complete 10 tarefas</p>
                            </div>
                            <div class="achievement-card locked">
                                <div class="achievement-icon">🔥</div>
                                <h4>Em Chamas</h4>
                                <p>Complete tarefas por 7 dias seguidos</p>
                            </div>
                            <div class="achievement-card locked">
                                <div class="achievement-icon">💎</div>
                                <h4>Mestre das Tarefas</h4>
                                <p>Complete 100 tarefas</p>
                            </div>
                            <div class="achievement-card locked">
                                <div class="achievement-icon">🌟</div>
                                <h4>Organizador Supremo</h4>
                                <p>Use todas as categorias</p>
                            </div>
                            <div class="achievement-card locked">
                                <div class="achievement-icon">⏰</div>
                                <h4>Pontual</h4>
                                <p>Complete 20 tarefas no prazo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Calendar Modal -->
    <div class="modal" id="calendarModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-calendar-alt"></i> Calendário de Tarefas</h3>
                <button class="modal-close" id="closeCalendarModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="calendar-container">
                    <div class="calendar-header">
                        <button class="calendar-nav" id="prevMonth">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <h4 id="calendarTitle">Janeiro 2025</h4>
                        <button class="calendar-nav" id="nextMonth">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="calendar-grid" id="calendarGrid">
                        <!-- Calendar will be generated by JavaScript -->
                    </div>
                    <div class="calendar-legend">
                        <div class="legend-item">
                            <div class="legend-color task-today"></div>
                            <span>Hoje</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color task-has-tasks"></div>
                            <span>Com tarefas</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color task-overdue"></div>
                            <span>Atrasadas</span>
                        </div>
                    </div>
                </div>
                <div class="calendar-tasks">
                    <h4 id="selectedDateTitle">Selecione uma data</h4>
                    <div id="selectedDateTasks"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Epic Footer -->
    <footer class="epic-footer">
        <div class="footer-content">
            <!-- Wave Animation Background -->
            <div class="wave-background">
                <svg class="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                </svg>
            </div>

            <!-- Main Footer Content -->
            <div class="footer-main">
                <div class="footer-grid">
                    <!-- Brand Section -->
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <div class="logo-container">
                                <i class="fas fa-tasks logo-icon"></i>
                                <div class="logo-text">
                                    <h2>LTP</h2>
                                    <span>Task Manager</span>
                                </div>
                            </div>
                        </div>
                        <p class="footer-description">
                            A forma mais inteligente e elegante de organizar sua vida. 
                            Transforme sua produtividade com design moderno e funcionalidades avançadas.
                        </p>
                        <!-- Redes sociais removidas conforme solicitação -->
                        <div class="footer-mini-tags" aria-label="Qualidades do app">
                            <span class="mini-tag"><i class="fas fa-bolt"></i><span>Produtivo</span></span>
                            <span class="mini-tag"><i class="fas fa-layer-group"></i><span>Organizado</span></span>
                            <span class="mini-tag"><i class="fas fa-feather-alt"></i><span>Leve</span></span>
                        </div>
                    </div>

                    <!-- Features Section (static, non-clickable) -->
                    <div class="footer-section">
                        <h3><i class="fas fa-rocket"></i> Recursos</h3>
                        <div class="footer-static-list" aria-label="Principais recursos">
                            <div class="feature-item"><i class="fas fa-calendar-alt"></i><span>Calendário Inteligente</span></div>
                            <div class="feature-item"><i class="fas fa-chart-line"></i><span>Estatísticas Avançadas</span></div>
                            <div class="feature-item"><i class="fas fa-trophy"></i><span>Sistema de Conquistas</span></div>
                            <div class="feature-item"><i class="fas fa-mobile-alt"></i><span>Design Responsivo</span></div>
                        </div>
                    </div>

                    <!-- Tools Section (static, non-clickable) -->
                    <div class="footer-section">
                        <h3><i class="fas fa-tools"></i> Ferramentas</h3>
                        <div class="footer-static-list" aria-label="Principais ferramentas">
                            <div class="feature-item"><i class="fas fa-tasks"></i><span>Gerenciador de Tarefas</span></div>
                            <div class="feature-item"><i class="fas fa-filter"></i><span>Filtros Inteligentes</span></div>
                            <div class="feature-item"><i class="fas fa-sort"></i><span>Ordenação Avançada</span></div>
                            <div class="feature-item"><i class="fas fa-magnifying-glass"></i><span>Busca Rápida</span></div>
                        </div>
                    </div>

                    <!-- Stats Section -->
                    <div class="footer-section">
                        <h3><i class="fas fa-chart-bar"></i> Estatísticas</h3>
                        <div class="footer-stats">
                            <div class="stat-item">
                                <div class="stat-number" id="footerTotalTasks">0</div>
                                <div class="stat-label">Tarefas Criadas</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="footerCompletedTasks">0</div>
                                <div class="stat-label">Concluídas</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="footerProductivity">0%</div>
                                <div class="stat-label">Produtividade</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="footer-bottom">
                <div class="footer-bottom-content footer-bottom-centered">
                    <div class="scroll-to-top" id="scrollToTop" title="Voltar ao topo">
                        <i class="fas fa-arrow-up"></i>
                    </div>
                    <div class="copyright">
                        <p>&copy; 2025 LTP Task Manager. Desenvolvido por Enzo Gabriel Menezes, Pedro Henrique Rodrigues e com muita dedicação.</p>
                    </div>
                </div>
            </div>

            <!-- Floating Particles -->
            <div class="floating-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
        </div>
    </footer>

    <script src="assets/js/dashboard.js"></script>
</body>
</html>

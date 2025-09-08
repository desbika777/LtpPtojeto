document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    // Switch between login and register forms
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        
        // Animation
        registerForm.style.opacity = '0';
        registerForm.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            registerForm.style.transition = 'all 0.5s ease';
            registerForm.style.opacity = '1';
            registerForm.style.transform = 'translateX(0)';
        }, 50);
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        
        // Animation
        loginForm.style.opacity = '0';
        loginForm.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            loginForm.style.transition = 'all 0.5s ease';
            loginForm.style.opacity = '1';
            loginForm.style.transform = 'translateX(0)';
        }, 50);
    });

    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form validation and submission
    const loginFormElement = loginForm.querySelector('.auth-form');
    const registerFormElement = registerForm.querySelector('.auth-form');

    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (validateLogin(email, password)) {
            showLoadingButton(this.querySelector('.btn-primary'));
            
            // Simulate API call
            setTimeout(() => {
                // Store user session
                localStorage.setItem('ltpUser', JSON.stringify({
                    email: email,
                    name: 'Usuário',
                    loginTime: new Date().toISOString()
                }));
                
                // Redirect to dashboard (PHP)
                window.location.href = 'dashboard.php';
            }, 1500);
        }
    });

    registerFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
    const mismatchEl = document.getElementById('passwordMismatch');
    mismatchEl.classList.add('hidden');
        
        if (validateRegister(name, email, password, confirmPassword)) {
            showLoadingButton(this.querySelector('.btn-primary'));
            
            // Simulate API call
            setTimeout(() => {
                // Store user data
                const userData = {
                    name: name,
                    email: email,
                    registrationDate: new Date().toISOString(),
                    tasks: []
                };
                
                localStorage.setItem('ltpUser', JSON.stringify(userData));
                
                // Show success message
                showMessage('Conta criada com sucesso! Redirecionando...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.php';
                }, 1000);
            }, 1500);
        }
    });

    // Validation functions
    function validateLogin(email, password) {
        if (!email || !password) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return false;
        }
        
        return true;
    }

    function validateRegister(name, email, password, confirmPassword) {
        if (!name || !email || !password || !confirmPassword) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return false;
        }
        
        if (password.length < 6) {
            showMessage('A senha deve ter pelo menos 6 caracteres.', 'error');
            return false;
        }
        
        if (password !== confirmPassword) {
            const mismatchEl = document.getElementById('passwordMismatch');
            mismatchEl.classList.remove('hidden');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showLoadingButton(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        
        document.querySelector('.auth-container').appendChild(messageDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Add message styles
    const messageStyles = document.createElement('style');
    messageStyles.textContent = `
        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        }
        
        .message.success {
            background: linear-gradient(135deg, #4CAF50, #45a049);
        }
        
        .message.error {
            background: linear-gradient(135deg, #f44336, #d32f2f);
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
    document.head.appendChild(messageStyles);

    // Check if user is already logged in
    const userData = localStorage.getItem('ltpUser');
    if (userData) {
        window.location.href = 'dashboard.php';
    }

    // Add dynamic background effect
    createParticles();

    // --- Password strength + live mismatch feedback ---
    const pwdInput = document.getElementById('registerPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const strengthWrapper = document.getElementById('passwordStrength');
    const barSpan = strengthWrapper ? strengthWrapper.querySelector('.strength-bar span') : null;
    const mismatchEl = document.getElementById('passwordMismatch');

    function assessStrength(pwd) {
        let score = 0;
        if (pwd.length >= 6) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        if (pwd.length >= 10) score++;
        return score; // 0-5
    }

    function updateStrength() {
        if (!barSpan) return;
        const val = pwdInput.value.trim();
        const score = assessStrength(val);
        const percent = [0, 25, 45, 65, 85, 100][score];
        barSpan.style.width = percent + '%';
        strengthWrapper.classList.remove('pwd-weak','pwd-medium','pwd-strong','pwd-very-strong');
        if (!val) {
            barSpan.style.width = '0';
            return;
        }
        if (score <= 1) strengthWrapper.classList.add('pwd-weak');
        else if (score === 2) strengthWrapper.classList.add('pwd-medium');
        else if (score === 3) strengthWrapper.classList.add('pwd-strong');
        else strengthWrapper.classList.add('pwd-very-strong');
    }

    if (pwdInput) {
        pwdInput.addEventListener('input', () => {
            updateStrength();
            if (confirmInput && confirmInput.value) {
                if (pwdInput.value !== confirmInput.value) mismatchEl.classList.remove('hidden');
                else mismatchEl.classList.add('hidden');
            }
        });
    }

    if (confirmInput) {
        confirmInput.addEventListener('input', () => {
            if (!confirmInput.value) {
                mismatchEl.classList.add('hidden');
                return;
            }
            if (pwdInput.value !== confirmInput.value) mismatchEl.classList.remove('hidden');
            else mismatchEl.classList.add('hidden');
        });
    }
});

function createParticles() {
    const container = document.querySelector('.bg-animation');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
    
    // Add particle animation
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes particle-float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyles);
}

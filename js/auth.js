
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const openLogin = document.getElementById('btn-open-login');
const closeLogin = document.getElementById('btn-close-login');
const submitLogin = document.getElementById('btn-submit-login');

const openRegister = document.getElementById('btn-open-register');
const closeRegister = document.getElementById('btn-close-register');
const submitRegister = document.getElementById('btn-submit-register');

const logoutBtn = document.getElementById('btn-logout');

// Open login modal

openLogin?.addEventListener('click', () => {

    loginModal.classList.remove('hidden');
});

// Close login modal

closeLogin?.addEventListener('click', () => {

    loginModal.classList.add('hidden');
});

// Open register modal

openRegister?.addEventListener('click', () => {
    registerModal.classList.remove('hidden');

});

// Close register modal

closeRegister?.addEventListener('click', () => {
    registerModal.classList.add('hidden');
});

// Submit login form

loginForm?.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    // Get the form data
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const base64Credentials = btoa(`${email}:${password}`);

    const userData = await doLogin(base64Credentials);

    if (userData != null) {

        loginModal.classList.add('hidden');

        alert(`Bem vindo ${userData.name}!`)

        localStorage.setItem('LibraryCredential', base64Credentials);

        updateHeader();
    } else {

        setInputError('login-email', 'Verifique seu e-mail.');
        setInputError('login-password', 'Senha Incorreta.');
    }
});

// Touch logoutBtn

logoutBtn?.addEventListener('click', () => {

    doLogout();
});

// Submit register form

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('register-name').value;
    const emailInput = document.getElementById('register-email').value;
    const passwordInput = document.getElementById('register-password').value;

    const request = JSON.stringify({
        name: nameInput,
        email: emailInput,
        password: passwordInput
    });

    const response = await doRegister(request);

    if (response != null) {

        alert('Novo usuário Registrado!');

        registerForm.reset();

        registerModal.classList.add('hidden');
        loginModal.classList.remove('hidden');
    } else {

        setInputError('register-name', 'Nome inválido.');
        setInputError('register-email', 'E-mail inválido.');
        setInputError('register-password', 'Senha inválida.');
    }
});

// Execute Login

async function doLogin(credentials) {

    try {
        const response = await fetch('http://localhost:8080/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${credentials}`
        }});

        if (!response.ok) return null;

        const dados = await response.json();

        return dados;
        
    } catch (error) {
        console.log("Erro! Algo deu errado ao tentar o Login, observe: " + error);
        
        return null;
    }
}

// logout

function doLogout() {

    if (isLoggedIn()) {

        localStorage.removeItem('LibraryCredential');

        window.location.href = 'index.html';
    }
}

// Execute Register

async function doRegister(jsonRequest) {

    try {
        
        const response = await fetch('http://localhost:8080/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonRequest
        });

        if (response.status != 201) return null;

        const dados = await response.json();
        
        return dados;

    } catch (error) {
        console.log("Erro! Registro encontrou algum problema, observe: " + error);

        return null;
    }
}

// Changing Header

function updateHeader() {

    if (isLoggedIn()) {

        window.location.href = 'bookcase.html';
    }
}

// Checks User Credentials

function isLoggedIn() {

    const credential = localStorage.getItem('LibraryCredential');

    return credential != null;
}

// Input Error

function setInputError(id, message) {
    const input = document.getElementById(id);
    const errorText = document.getElementById(`error-${id}`);
    
    // Adiciona borda vermelha e sombra de erro do Tailwind
    input.classList.add('border-red-500', 'ring-2', 'ring-red-200');
    input.classList.remove('border-gray-200', 'focus:ring-blue-900');
    
    if (errorText) {
        errorText.innerText = message;
        errorText.classList.remove('hidden');
    }
}

function clearErrors(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    const errors = form.querySelectorAll('p[id^="error-"]');
    
    inputs.forEach(input => {
        input.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        input.classList.add('border-gray-200');
    });
    
    errors.forEach(error => error.classList.add('hidden'));
}

function setupInputListeners(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearErrors(formId);
        });
    });
}

setupInputListeners('login-form');
setupInputListeners('register-form');

updateHeader();
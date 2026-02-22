
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const openLogin = document.getElementById('btn-open-login');
const closeLogin = document.getElementById('btn-close-login');
const submitLogin = document.getElementById('btn-submit-login');

const openRegister = document.getElementById('btn-open-register');
const closeRegister = document.getElementById('btn-close-register');
const logoutBtn = document.getElementById('btn-logout');
const submitRegister = document.getElementById('btn-submit-register');

// Open login modal

openLogin.addEventListener('click', () => {

    loginModal.classList.remove('hidden');
});

// Close login modal

closeLogin.addEventListener('click', () => {

    loginModal.classList.add('hidden');
});

// Open register modal

openRegister.addEventListener('click', () => {
    registerModal.classList.remove('hidden');

});

// Close register modal

closeRegister.addEventListener('click', () => {
    registerModal.classList.add('hidden');
});

// Changing Header

function updateHeader() {

    if (isLoggedIn()) {

        openLogin.classList.add('hidden');
        openRegister.classList.add('hidden');

        logoutBtn.classList.remove('hidden');
    } else {

        return;
    }
}

// Submit login form

loginForm.addEventListener('submit', async (event) => {
    
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
    }
});

// Touch logoutBtn

logoutBtn.addEventListener('click', () => {

    logout();
});

// Submit register form

registerForm.addEventListener('submit', async (event) => {
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

        if (!response.ok) {

            throw new Error("Credenciais Inválidas.")
        }

        const dados = await response.json();

        return dados;
        
    } catch (error) {
        
        alert(error);
        console.log("Erro! Algo deu errado ao tentar o Login, observe: " + error);
        
        return null;
    }
}

// logoutBtn

function logout() {

    if (isLoggedIn()) {

        localStorage.removeItem('LibraryCredential');

        location.reload();
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

        if (response.status != 201) {

            throw new Error("Informações Inválidas.")
        }

        const dados = await response.json();
        
        return dados;

    } catch (error) {
        
        alert(error);
        console.log("Erro! Registro encontrou algum problema, observe: " + error);

        return null;
    }
}

// Checks User Credentials

function isLoggedIn() {

    const credential = localStorage.getItem('LibraryCredential');

    return credential != null;
}

updateHeader();

const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');

const openLogin = document.getElementById('btn-open-login');
const closeLogin = document.getElementById('btn-close-login');
const submitLogin = document.getElementById('btn-submit-login');

const openRegister = document.getElementById('btn-open-register');
const closeRegister = document.getElementById('btn-close-register');
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
    loginModal.classList.remove('hidden');

});

// Close register modal

closeRegister.addEventListener('click', () => {
    loginModal.classList.add('hidden');
});

// Submit login form

loginForm.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    // Get the form data
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const base64Credentials = btoa(`${email}:${password}`);

    const userData = await doLogin(base64Credentials);
});

// Execute Login

async function doLogin(credentials) {

    fetch('http://localhost:8080/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${credentials}`
        }
    })
    .then(response => {
        
        if (response.ok) {

            return response.json();
        } else {

            throw new Error("Credenciais Inválidas.")
        }
    })
    .catch(error => {
        console.log("Erro, sistema fora do ar.");
    })
}
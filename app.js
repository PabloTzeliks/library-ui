
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

loginForm.addEventListener('submit', (event) => {
    
    event.preventDefault();

    // Get the form data
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
});
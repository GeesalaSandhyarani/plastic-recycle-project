// script.js

// --- Get Elements ---
const loginButton = document.getElementById("loginBtn");
const registerButton = document.getElementById("registerBtn");
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const successMessageContainer = document.getElementById("success-message");
const navMenu = document.getElementById("navMenu");

// --- UI Toggle Functions ---

function hideAllFormsAndMessages() {
    if(loginForm) loginForm.style.display = 'none';
    if(registerForm) registerForm.style.display = 'none';
    if(successMessageContainer) {
        successMessageContainer.classList.remove('show');
        // Use timeout to ensure display:none happens after opacity transition
        setTimeout(() => {
             if(successMessageContainer && !successMessageContainer.classList.contains('show')) {
                 successMessageContainer.style.display = 'none';
             }
        }, 500); // Match CSS transition duration
    }
}

function login() {
    hideAllFormsAndMessages();
    if (loginForm) {
         loginForm.style.display = 'flex'; // Show login form
         // Slight delay before triggering transition
         requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                 loginForm.style.left = "35px";
                 loginForm.style.opacity = 1;
            });
         });
    }
    // Reset register form position
    if(registerForm) {
        registerForm.style.right = "-120%";
        registerForm.style.opacity = 0;
    }
    if (loginButton && registerButton) {
        loginButton.classList.add("white-btn");
        registerButton.classList.remove("white-btn");
    }
}

function register() {
    hideAllFormsAndMessages();
    if (registerForm) {
         registerForm.style.display = 'flex'; // Show register form
         // Slight delay before triggering transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                registerForm.style.right = "35px";
                registerForm.style.opacity = 1;
            });
         });
    }
    // Reset login form position
     if(loginForm) {
         loginForm.style.left = "-120%";
         loginForm.style.opacity = 0;
     }
    if (loginButton && registerButton) {
        loginButton.classList.remove("white-btn");
        registerButton.classList.add("white-btn");
    }
}

// --- Mobile Menu Toggle ---
function myMenuFunction() {
    if (navMenu) {
        navMenu.classList.toggle("responsive");
    } else {
        console.error("Navigation menu element (#navMenu) not found.");
    }
}

// --- Validation Helpers ---

function showError(inputId, errorId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.visibility = 'visible';
    }
    if (inputElement && inputElement.tagName === 'INPUT' && inputElement.type !== 'checkbox') {
         inputElement.classList.add('error');
    }
}

function clearError(inputId, errorId) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(errorId);
     if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.visibility = 'hidden';
     }
    if (inputElement && inputElement.tagName === 'INPUT' && inputElement.type !== 'checkbox') {
         inputElement.classList.remove('error');
     }
}

function isValidEmailRegex(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

// --- Form Validation Functions ---

function validateLogin() {
    let isValid = true;
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailValue = emailInput ? emailInput.value.trim() : '';
    const passwordValue = passwordInput ? passwordInput.value.trim() : '';

    clearError('login-email', 'login-email-error');
    clearError('login-password', 'login-password-error');

    if (!emailInput || emailValue === '') {
        showError('login-email', 'login-email-error', 'Email is required.'); // Changed message
        isValid = false;
    } else if (!isValidEmailRegex(emailValue)) { // MODIFIED: Strict email validation
        showError('login-email', 'login-email-error', 'Please enter a valid email address.');
        isValid = false;
    }

     if (!passwordInput || passwordValue === '') {
        showError('login-password', 'login-password-error', 'Password is required.');
        isValid = false;
    } else if (passwordValue.length < 8) { // Check for minimum length
        showError('login-password', 'login-password-error', 'Password must be at least 8 characters.');
        isValid = false;
    }

    return isValid;
}

function validateRegister() {
     let isValid = true;
     const firstNameInput = document.getElementById('reg-firstname');
     const lastNameInput = document.getElementById('reg-lastname');
     const emailInput = document.getElementById('reg-email');
     const passwordInput = document.getElementById('reg-password');
     const confirmPasswordInput = document.getElementById('reg-password-confirm');
     const termsCheckbox = document.getElementById('reg-terms');

     const firstNameValue = firstNameInput ? firstNameInput.value.trim() : '';
     const lastNameValue = lastNameInput ? lastNameInput.value.trim() : '';
     const emailValue = emailInput ? emailInput.value.trim() : '';
     const passwordValue = passwordInput ? passwordInput.value.trim() : '';
     const confirmPasswordValue = confirmPasswordInput ? confirmPasswordInput.value.trim() : '';
     const termsChecked = termsCheckbox ? termsCheckbox.checked : false;

     clearError('reg-firstname', 'reg-firstname-error');
     clearError('reg-lastname', 'reg-lastname-error');
     clearError('reg-email', 'reg-email-error');
     clearError('reg-password', 'reg-password-error');
     clearError('reg-password-confirm', 'reg-password-confirm-error');
     clearError('reg-terms', 'reg-terms-error'); // Use specific ID

     if (!firstNameInput || firstNameValue === '') { showError('reg-firstname', 'reg-firstname-error', 'First name is required.'); isValid = false; }
     if (!lastNameInput || lastNameValue === '') { showError('reg-lastname', 'reg-lastname-error', 'Last name is required.'); isValid = false; }
     if (!emailInput || emailValue === '') { showError('reg-email', 'reg-email-error', 'Email is required.'); isValid = false; }
     else if (!isValidEmailRegex(emailValue)) { showError('reg-email', 'reg-email-error', 'Please enter a valid email address.'); isValid = false; }
     if (!passwordInput || passwordValue === '') { showError('reg-password', 'reg-password-error', 'Password is required.'); isValid = false; }
     else if (passwordValue.length < 8) { showError('reg-password', 'reg-password-error', 'Password must be at least 8 characters.'); isValid = false; }
     if (!confirmPasswordInput || confirmPasswordValue === '') { showError('reg-password-confirm', 'reg-password-confirm-error', 'Please confirm your password.'); isValid = false; }
     else if (passwordValue && passwordValue !== confirmPasswordValue) { showError('reg-password-confirm', 'reg-password-confirm-error', 'Passwords do not match.'); isValid = false; }
     if (!termsCheckbox || !termsChecked) {
         showError('reg-terms', 'reg-terms-error', 'You must agree to the terms and conditions.');
         isValid = false;
     }
     return isValid;
}

// --- Show Success Message Function ---
function showSuccessMessage(type = "Login") {
    const successHeader = document.getElementById('success-header');
    hideAllFormsAndMessages(); // Hide other forms first

    // Update success message text
    if(successHeader) {
        successHeader.textContent = `${type} Successful!`;
    }

    // Show the success container
    if(successMessageContainer) {
        successMessageContainer.style.display = 'flex'; // Make it display flex
        // Use timeout to allow display change before starting transition
        requestAnimationFrame(() => {
             requestAnimationFrame(() => { // Double request for broader compatibility
                  successMessageContainer.classList.add('show');
             });
        });
    }

    // Redirect after a delay
    setTimeout(goToWebsite, 2500); // Wait 2.5 seconds before redirecting
}


// --- Submit Handlers ---
function handleLoginSubmit() {
    if (validateLogin()) {
        showSuccessMessage("Login");
    }
}
function handleRegisterSubmit() {
     if (validateRegister()) {
        showSuccessMessage("Registration");
     }
}

// --- Navigation ---
function goToWebsite() {
    console.log("Redirecting...");
    // !!! CHANGE THIS to your actual homepage file name !!!
    window.location.href = "index.html";
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    // Ensure success message is hidden initially
    if(successMessageContainer) {
         successMessageContainer.style.display = 'none';
         successMessageContainer.classList.remove('show');
    }
    login(); // Show login form by default
});

// Terms & Conditions Modal Logic (No changes made here, but including for completeness if it were part of script.js)
const termsModal = document.getElementById('termsModal');
const termsLink = document.getElementById('termsLink');
const closeTermsModalBtn = document.getElementById('closeTermsModalBtn');
const termsTextContainer = document.getElementById('termsTextContainer');
const modalTermsAgreeCheckbox = document.getElementById('modalTermsAgreeCheckbox');
const mainRegTermsCheckbox = document.getElementById('reg-terms');

if (termsLink) {
    termsLink.onclick = function(e) {
        e.preventDefault();
        if (termsModal) termsModal.style.display = "block";
        if (modalTermsAgreeCheckbox) modalTermsAgreeCheckbox.checked = false; // Reset modal checkbox
        if (modalTermsAgreeCheckbox) modalTermsAgreeCheckbox.disabled = true; // Disable until scrolled
        if (termsTextContainer) termsTextContainer.scrollTop = 0; // Scroll to top
    }
}

if (closeTermsModalBtn) {
    closeTermsModalBtn.onclick = function() {
        if (termsModal) termsModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == termsModal) {
        if (termsModal) termsModal.style.display = "none";
    }
}

if (termsTextContainer && modalTermsAgreeCheckbox) {
    termsTextContainer.onscroll = function() {
        // Check if scrolled to the bottom (or very close to it)
        if (termsTextContainer.scrollHeight - termsTextContainer.scrollTop <= termsTextContainer.clientHeight + 5) { // +5 for buffer
            modalTermsAgreeCheckbox.disabled = false;
        }
    };
}

if (modalTermsAgreeCheckbox && mainRegTermsCheckbox && termsModal) {
    modalTermsAgreeCheckbox.onchange = function() {
        if (this.checked) {
            mainRegTermsCheckbox.checked = true;
            mainRegTermsCheckbox.disabled = false; // Enable the main form checkbox
            clearError('reg-terms', 'reg-terms-error'); // Clear any error message on the main form
            termsModal.style.display = "none"; // Close modal on agreement
        } else {
            mainRegTermsCheckbox.checked = false;
            // mainRegTermsCheckbox.disabled = true; // Optionally re-disable if unchecked in modal
        }
    };
}
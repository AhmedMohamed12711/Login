var sinEmail = document.getElementById('sinEmail');
var sinPassword = document.getElementById('sinPassword');
var supName = document.getElementById('supName');
var supEmail = document.getElementById('supEmail');
var supPassword = document.getElementById('supPassword');
var correct_register = document.getElementById('correct_register');
var errorLogin = document.getElementById('errorLogin');



var userName = localStorage.getItem('Username');
if (document.getElementById('userName')) {
    if (userName) {
        document.getElementById('userName').innerText = "Welcome " + userName;
    } else {
        location.replace('/index.html');
    }
}


var signUpArray = JSON.parse(localStorage.getItem('users') || '[]');

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}
// !signup
function isSignUpEmpty() {
    return supName.value && supEmail.value && supPassword.value;
}

function isEmailExist() {
    return signUpArray.some(function (user) {
        return user.email.toLowerCase() === supEmail.value.toLowerCase();
    });
}

function signUp() {
    if (!isSignUpEmpty()) {
        correct_register.innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    if (!isValidEmail(supEmail.value.trim())) {
        correct_register.innerHTML = '<span class="text-danger m-3">Invalid email format</span>';
        return;
    }

    if (!isValidPassword(supPassword.value.trim())) {
        correct_register.innerHTML = '<span class="text-danger m-3">Password must be at least 6 characters long and contain uppercase, lowercase, and a number</span>';
        return;
    }

    if (isEmailExist()) {
        correct_register.innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return;
    }
    signUpArray.push({
        name: supName.value,
        email: supEmail.value,
        password: supPassword.value,
    });

    localStorage.setItem('users', JSON.stringify(signUpArray));
    correct_register.innerHTML = '<span class="text-success m-3">Success</span>';
}

// !login
function isLoginEmpty() {
    return sinEmail.value !== "" && sinPassword.value !== "";
}

function Login() {
    if (!isLoginEmpty()) {
        errorLogin.innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    if (!isValidEmail(sinEmail.value.trim())) {
        errorLogin.innerHTML = '<span class="text-danger m-3">Invalid email format</span>';
        return;
    }

    var user = signUpArray.find(function (user) {
        return user.email.toLowerCase() === sinEmail.value.toLowerCase() &&
            user.password === sinPassword.value;
    });

    if (user) {
        localStorage.setItem('Username', user.name);
        location.replace('./home.html');
    } else {
        errorLogin.innerHTML = '<span class="text-danger m-3">Incorrect email or password</span>';
    }
}


function logout() {
    localStorage.removeItem('Username');
    location.replace('./index.html');
}

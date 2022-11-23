const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmpassword = document.querySelector('#confirmpassword');

const form = document.querySelector('#signup');


const checkUsername = () => {

    let valid = false;

    const min = 3,
    max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        ShowError(usernameEl, 'Username cannot be blank.');

    }else if(!isBetween(username,length,min,max)) {
        ShowError(usernameEl, 'Username must be between ${min} and ${max} characters.')
    }else{
        ShowSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if(!isRequired(email)) {
        ShowError(emailEl, 'Email cannot be blank.');

    }else if (!isEmailValid(email)) {
        ShowError(emailEl, 'Email is not valid.')
    }else{
        ShowSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if(!isRequired(password)) {
        ShowError(passwordEl, 'Password is not blank.')
    }else if(!isPasswordSecure(password)){
        ShowError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase'+
        'characters, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');

    }else{
        ShowSuccess(passwordEl);
        valid = true; 
    }
    return valid;
}
const checkConfirmPassword = () => {
    let valid = false;
    //check confirm Password
    const confirmpassword = confirmpasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if(!isRequired(confirmpassword)) {
        ShowError(confirmpasswordEl, 'Please enter the Password again');
    }else if(password !== confirmpassword) {
        ShowError(confirmpasswordEl, 'The Password does not match');
    }else{
        ShowSuccess(confirmpasswordEl);
        valid = true;
    }
    return valid;
}
const isEmailValid = (email) => {

    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);

};

const isPasswordSecure = (password) => {

    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value=== ''? false:true;
const isBetween = (length,min,max) => length < min . length > max ? false : true;
form.addEventListener('submit', function (e) {

    e.preventDefault();

    let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail();
    isPasswordvalid = checkPassword();
    isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
    isEmailValid &&
    isPasswordvalid &&
    isConfirmPasswordValid;

    if(isFormValid) {

    }
});

const ShowError = (input, message ) => {

    const formfield = input.parentElenment;

    formfield.classList.remove('success');
    formfield.classList.add('error');

    const error = formfield.querySelector('small');
    error.textContent = message;

};

const ShowSuccess = (input) => {
    
    const formfield = input.parentElenment;


formfield.classList.remove('error');
formfield.classList.add('success');

const error = formfield.querySelector('small');
error.textContent = '';
}

const debounce = (fn, delay = 1) => {
    let timeoutId;
    return (...args) => {

        if(timeout) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn.apply(null, args)

        }, delay);
    };
};
form.addEventListener('input', debounce(function (e) {
    switch (e,target,id) {
        case 'username' :
            checkUsername();
            break;
        case 'email' :
            checkEmail();
            break;
        case 'password' :
            checkPassword();
            break;
        case 'confirm-email' :
            checkConfirmPassword();
            break;            
    }
}));
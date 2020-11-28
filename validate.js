const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const form = document.getElementById('myForm');

//validation color
const green = '#4caf50';
const red = 'f44336';
//Handleform
form.addEventListener('submit', function (event) {
   //prevent behaviour
   event.preventDefault();
   if (
      validateFirstName &&
      validateLastName() &&
      validatePassword() &&
      validateConfirmPassword() &&
      validateEmail()
   ) {
      const name = firstName.value;
      const container = document.querySelector('div.container');
      const loader = document.createElement('div');
      loader.className = 'progress';
      const loadingBar = document.createElement('div');
      loadingBar.className = 'indeterminate';
      loader.appendChild(loadingBar);
      container.appendChild(loader);

      setTimeout(function() {
         const loaderDiv= document.querySelector('div.progess');
         const panel = document.createElement('div');
         panel.className = 'card-panel green';
         const text = document.createElement('span');
         text.appendChild(document.createTextNode(`Sign up successful,welcome to Animod ${name}`));
         panel.appendChild(text);
         container.replaceChild(panel,loaderDiv)
      }, 1000)
   }
})

function validateFirstName() {
   //check if it is empty
   if (checkIfEmpty(firstName)) return;
   //if itis only letters
   if (!checkIfOnlyLetters(firstName)) return;
   return true;
}
function validateLastName() {
   //check if it is empty
   if (checkIfEmpty(lastName)) return;
   //if itis only letters
   if (!checkIfOnlyLetters(lastName)) return;
   return true;
}
function validatePassword() {
   if (checkIfEmpty(password)) return;
   //lenght must no be lessthan 8
   if (!iflengthIs(password, 4)) return;
   //check password against the character set
   //1-a
   //2-a 1
   //3- A a 1
   //4 A a 1 @
   // if (!containsCharacters(password, 4)) return;
   return true;
}
function validateConfirmPassword() {
   if (password.className !== 'valid') {
      setInvalid(confirmPassword, 'Password must be valid');
      return;
   }
   //if they match
   if (password.value !== confirmPassword.value) {
      setInvalid(confirmPassword, 'Password must match');
      return;
   } else {
      setValid(confirmPassword);
      
   }
   return true;
}
function validateEmail() {
   if (checkIfEmpty(email)) return;
   if (!containsCharacters(email, 5)) return;
   return true;
}
function checkIfEmpty(field) {
   if (isEmpty(field.value.trim())) {
    //set field invalid
      setInvalid(field, `${field.name} must not be empty`);
      return true;
   } else {
      //set field valid
      setValid(field);
      return false;
 }
 
}
function isEmpty(value) {
   if (value === '') return true;
   return false;
}
function setInvalid(field, message) {
   field.className = 'invalid';
   field.nextElementSibling.innerHTML = message;
   field.nextElementSibling.style.color = red;
}
function setValid(field) {
   field.className = 'valid';
   field.nextElementSibling.innerHTML = '';
  // field.nextElementSibling.style.color = green;
}
function checkIfOnlyLetters(field) {
   if (/^[a-zA-z ]+$/.test(field.value)) {
      setValid(field);
      returntrue;
   } else {
      setInvalid(field, `${field.name} must contain only letters`);
      return false;
   }
}
function iflengthIs(field, minLength) {
   if (field.value.length >= minLength) {
      setValid(field);
      return true;
   } else{
      setInvalid(field, `${field.name} must be at least ${minLength} charaters long`);
      return false;
   }
}
function containsCharacters(field, code) {
   let regEx;
   switch (code) {
      case 1:
         //letters
         regEx = /(?=.*[a-zA-z])/;
         return matchwithRegEx(regEx, field, 'must contain at least on letter');
      case 2:
         //letters and numbers
         regEx = /(?=.*\d)(?=.*[a-zA-z])/
         return matchwithRegEx(regEx, field, 'must contain at least one letter and one number');
      case 3:
         //uppercase, lowercase and number
         regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
         return matchwithRegEx(regEx, field, 'must contain at least one uppercase,one lowercase and one letter');
      case 4:
         // uppercase, lowercase, number and special character
         regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
         return matchwithRegEx(regEx, field,'must contain at least one upercase,one lowercase,one number and one special char')
      case 5:
         //Email
         regEx =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         
         return matchwithRegEx(regEx, field, 'must be a valid email address')
      default:
         return false
   }
}
function matchwithRegEx(regEx, field, message) {
   if(field.value.match(regEx)){
      setValid(field);
      return true;
   }else {
      setInvalid(field, message);
         return false;
      
   }
}
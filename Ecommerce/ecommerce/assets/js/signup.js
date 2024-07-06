import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

import app from './config.js'

const database = getDatabase(app)

const auth = getAuth()

const btnReg = document.getElementById('regBtn')

btnReg.addEventListener('click', e => {
    const addUserInputUI = document.getElementsByClassName('form-control')

    let newUser = {}

    if (Array.from(addUserInputUI).some(input => input.value === '')) {
        console.log(addUserInputUI)
        
        return false
    } else {
        for(let i = 0; i < addUserInputUI.length; i++){
            let keyData = addUserInputUI[i].getAttribute('data-key')
            console.log(keyData);

            let value = addUserInputUI[i].value

            newUser[keyData] = value

        
        }

        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            set(ref(database, 'Customers/' + user.uid), newUser)

            setTimeout(() => {
                window.location = 'signin.html'
            }, 1000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
    }
})
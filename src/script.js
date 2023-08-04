// Mostrar mockClients

clients.forEach(client => {
    console.log(client.id, client.password);
});

// Elementos en el header
const header = document.getElementById('header');
const welcome = header.querySelectorAll('h1');

//Elementos en el login box
const userbox = document.querySelector('#userbox');
const userbtn = document.querySelector('#checkUser');
const passbox = document.querySelector('#passwordbox');
const passbtn = document.querySelector('#checkPassword');

//Elementos en el operation container
const operations = document.querySelector('#operations');
const balance = document.querySelector('#amount');
const add = document.querySelector('#add');
const withdraw = document.querySelector('#withdraw');
const request = document.querySelector('#request');
const pay = document.querySelector('#pay');
const send = document.querySelector('#send');
const exit = document.querySelector('#exit');

//Elementos en el transaction container
const movements = document.querySelector('#movements');
const keyboard = movements.querySelectorAll('.m_item');
const o_user = document.querySelector('#o_user');
const o_amount = document.querySelector('#o_amount');



// Login
const userToPass = userbox.querySelector('input');
const passwordToPass = passbox.querySelector('input');

let tempUser = '';
let tempPass = '';

userbtn.addEventListener('click', () => {
    tempUser = userToPass.value;
    userbox.classList.add('hidden');
    passbox.classList.remove('hidden');
});

userToPass.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Call a function or perform an action when Enter is pressed
        tempUser = userToPass.value;
        userbox.classList.add('hidden');
        passbox.classList.remove('hidden');
    }
});

passbtn.addEventListener('click', () => {
    tempPass = passwordToPass.value;
    for (const client of clients) {
        if (client.id === tempUser && client.password === tempPass) {
            passbox.classList.add('hidden');
            operations.classList.remove('hidden');
            welcome[0].textContent = `Bienvenido ${client.name} ${client.lastname}`;
            welcome[1].textContent = `Bienvenido ${client.name} ${client.lastname}`;

            if (window.innerWidth < 768) {
                welcome[1].classList.remove('hidden');
            } else {
                welcome[0].classList.remove('hidden');
            }
        }
    }
});

passwordToPass.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        tempPass = passwordToPass.value;
        for (const client of clients) {
            if (client.id === tempUser && client.password === tempPass) {
                passbox.classList.add('hidden');
                operations.classList.remove('hidden');
                welcome[0].textContent = `Bienvenido ${client.name} ${client.lastname}`;
                welcome[1].textContent = `Bienvenido ${client.name} ${client.lastname}`;

                if (window.innerWidth < 768) {
                    welcome[1].classList.remove('hidden');
                } else {
                    welcome[0].classList.remove('hidden');
                }
            }
        }
    }
});

// Generar nuevo cliente (?)


// Rescata teclado numérico

keyboard.forEach(key => {
    key.addEventListener('click', (e) => {
        console.log(key.firstElementChild.textContent)
        if (key.firstElementChild.textContent.length === 1) {
            o_amount.value += key.firstElementChild.textContent; // Add a character
        } else if (key.firstElementChild.textContent === 'BORRAR') {
            currentValue = o_amount.value
            if (o_amount.value.length > 0) {
                const newValue = currentValue.slice(0, -1); // Remove the last character
                o_amount.value = newValue;
            }
        }
    });
});

// Funcionamiento de botones de operaciones

const o_buttons = [add, withdraw, request, pay, send, exit];

o_buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {

        //Devuelve al inicio al presionar EXIT
        if (btn.id !== 'exit') {
            movements.classList.remove('hidden');
            o_amount.value = '';
        } else {
            operations.classList.add('hidden');
            welcome.classList.add('hidden');
            movements.classList.add('hidden');
            userbox.classList.remove('hidden');
        }
    });
});





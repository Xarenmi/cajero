// Mostrar mockClients
const clients = [
    { 
        id: '12378710', 
        name: 'Margo', 
        lastname: 'Zavala', 
        birthday: '9/DIC/1993', 
        password: 'hi', 
        saldo: 900 
    }, 
    { 
        id: '12368794',
        name: 'Frank', 
        lastname: 'Grimes', 
        birthday: '04/MAY/1997', 
        password: 'password', 
        saldo: 15 
    }, 
    { 
        id: '12345678',
        name: 'Hank', 
        lastname: 'Scorpio', 
        birthday: '3/NOV/1996' ,  
        password: '', 
        saldo: 1200 
    }]

clients.forEach(client => {
    console.log('user: ' + client.id + ', password: ' + client.password);
});

// Elementos en el header
const header = document.getElementById('header');
const welcome = header.querySelector('h1');

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
const reference = movements.querySelector('p');
const confirm = document.getElementById('confirm');



// Login
let tempUser = '';
let tempPass = '';

const userToPass = userbox.querySelector('input');
const passwordToPass = passbox.querySelector('input');

userToPass.value = '';
passwordToPass.value = '';

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


//WHAT IF USER DOESN'T EXIST??

passbtn.addEventListener('click', () => {
    tempPass = passwordToPass.value;
    let counter = 0;
    for (const client of clients) {
        if (client.id === tempUser && client.password === tempPass) {
            balance.textContent = client.saldo.toString();//set Balance
            passbox.classList.add('hidden');
            operations.classList.remove('hidden');
            welcome.textContent = `Bienvenido ${client.name} ${client.lastname}`;
            welcome.classList.remove('hidden');
            counter = 1;
        }
    }
    if (counter == 0) {
        generateUser();
    }
});

passwordToPass.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        tempPass = passwordToPass.value;
        let counter = 0;
        for (const client of clients) {
            if (client.id === tempUser && client.password === tempPass) {
                balance.textContent = client.saldo.toString();
                passbox.classList.add('hidden');
                operations.classList.remove('hidden');
                welcome.textContent = `Bienvenido ${client.name} ${client.lastname}`;
                welcome.classList.remove('hidden');
                counter = 1;
            }
        }
        if (counter == 0) {
            generateUser();
        }
    }
});

// Generar nuevo cliente (?)

function generateUser() {
    passbox.classList.add('hidden');
    userToPass.value = '';
    passwordToPass.value = '';
    const noUser = window.confirm('Cliente no registrado. Desea generar un cliente temporal?');
    if (noUser) {
        console.log('we\'re ready');
    } else {
        location.reload();
    }
}

// Funcionamiento de botones de operaciones

const o_buttons = [add, withdraw, request, pay, send, exit];
let action = '';

o_buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        switch (btn.id) {
            case 'exit':
                location.reload();
                break;
            case 'add':
                action = 'add';
                noRefNeeded();
                break;
            case 'withdraw':
                action = 'subtract';
                noRefNeeded();
                break;
            case 'request':
                action = 'refadd';
                refNeeded();
                break;
            case 'pay':
                action = 'subtract';
                refNeeded();
                break;
            case 'send':
                action = 'refsubtract';
                refNeeded();
                break;
        }
    });
});

const noRefNeeded = () => {
    o_amount.value = '';
    o_user.value = '';
    reference.classList.add('hidden');
    o_user.classList.add('hidden');
    movements.classList.remove('hidden');
    checkScreenWidth();
}

const refNeeded = () => {
    o_amount.value = '';
    o_user.value = '';
    reference.classList.remove('hidden');
    o_user.classList.remove('hidden');
    movements.classList.remove('hidden');
    checkScreenWidth();
}

// Rescata teclado numérico

keyboard.forEach(key => {
    key.addEventListener('click', (e) => {
        if (key.firstElementChild.textContent.length === 1) {
            o_amount.value += key.firstElementChild.textContent; // Add a character
        } else if (key.firstElementChild.textContent === 'BORRAR') {
            currentValue = o_amount.value
            if (o_amount.value.length > 0) {
                const newValue = currentValue.slice(0, -1); // Remove the last character
                o_amount.value = newValue;
            }
        } else if (key.firstElementChild.textContent === 'REGRESAR') {
            if (operations.classList.contains('hidden')) {
                operations.classList.remove('hidden');
            }
            movements.classList.add('hidden');
        }
    });
});

// Actualizar saldo en clientes

confirm.addEventListener('click', () => {

    refUser = clients.findIndex(client => client.id === o_user.value);
    actUser = clients.findIndex(client => client.id === tempUser);

    switch (action) {
        case 'add':
            clients[actUser].saldo += parseInt(o_amount.value);
            balance.textContent = clients[actUser].saldo.toString();
            break;
        case 'subtract':
            clients[actUser].saldo -= parseInt(o_amount.value);
            balance.textContent = clients[actUser].saldo.toString();
            break;
        case 'refadd':
                console.log('saldo: ' + clients[refUser].saldo);
            if (clients[refUser].saldo >= parseInt(o_amount.value)) {
                clients[refUser].saldo -= parseInt(o_amount.value);
                clients[actUser].saldo += parseInt(o_amount.value);
                balance.textContent = clients[actUser].saldo.toString();
                console.log('nuevo saldo: ' + clients[refUser].saldo);
            }
            break;
        case 'refsubtract':
            if (refUser >= 0) {
                console.log('saldo: ' + clients[refUser].saldo);
                clients[refUser].saldo += parseInt(o_amount.value);
                clients[actUser].saldo -= parseInt(o_amount.value);
                balance.textContent = clients[actUser].saldo.toString();
                console.log('nuevo saldo: ' + clients[refUser].saldo);
            } else {
                clients[actUser].saldo -= parseInt(o_amount.value);
                balance.textContent = clients[actUser].saldo.toString();
            }
            break;
    }
});


//'REGRESAR' button function

function checkScreenWidth() {
    if (!movements.classList.contains('hidden') && window.innerWidth < 861) {
        operations.classList.add('hidden');
        keyboard.forEach(key => {
            key.addEventListener('click', (e) => {
                if (key.firstElementChild.textContent === 'REGRESAR') {
                    operations.classList.remove('hidden');
                    movements.classList.add('hidden');
                }
            })
        });
    } else if (!movements.classList.contains('hidden') && window.innerWidth > 860 && operations.classList.contains('hidden')){
        operations.classList.remove('hidden');
    }
}


//si hay cambio de tamaño
window.addEventListener('resize', checkScreenWidth);
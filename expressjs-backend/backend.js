const e = require('express');
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors'); 
const res = require('express/lib/response'); 

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const users = {
    users_list :
    [
        {
            user: 'bj', 
            pass: 'pass424', 
        }, 
    ]
}

app.get('/account/login', (req, res) => {
    res.send(users); 
}); 

app.get('/login/reg/:user', (req, res) => {
    const u = req.params['user']; 
    let result = findUserByUser(u); 
    console.log("u " + u);
    console.log(result); 
    if (result === undefined || result.length === 0){
        res.status(404).send('Resource not found.'); 
    } else{
        result = {users_list: result}; 
        res.send(result); 
    }}); 

app.post('/account/login', (req, res) => {
    const u = req.body; 
    console.log("Post u " + u.user + "\t" + u.pass); 
    let result = findU(u); 
    console.log(result); 
    if (result === undefined || result.length === 0) {
        res.status(404).end(); 
    } else {
        res.status(200).send(result).end(); 
    }
}); 


app.get('/login/reg', (req, res) => {
    res.send(users); 
}); 

app.post('/login/reg', (req, res) => {
    const u = req.body; 
    console.log("u " + u.user + "\t" + u.pass); 
    addUser(u);
    res.status(200).send(u).end(); 
}); 

function addUser(user){
    users['users_list'].push(user); 
}

const findU = (userl) => {
    return users['users_list'].filter((user) => user['user'] === userl.user && user['pass'] === userl.pass); 
}

const findUserByUser = (username) => {
    return users['users_list'].filter((user) => user['user'] === username); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      



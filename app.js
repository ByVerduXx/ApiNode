const express = require('express');
const passport = require('passport');
const usersController = require('./controllers/users')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

usersController.registerUser('bettatech', '1234');
usersController.registerUser('mastermind', '4321');

require('./auth')(passport);

const app = express();
app.use(passport.initialize());
app.use(bodyParser.json());
const port = 3000;


app.get('/', (req, res) => 
    res.status(200).send('Hello World!')
);

app.post('/login', (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Missing username or password'});
    }
    usersController.checkUserCredentials(req.body.username, req.body.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({userId: req.body.username}, 'secretPassword')

        res.status(200).json(
            {token: token}
        )
    })
    
});

app.post('/team/pokemon', (req, res) => {
    res.status(200).send('Hello World!')
})

app.get('/team', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).send('Hello World!')
})

app.delete('/team/pokemon/:pokeid', (req, res) => {
    res.status(200).send('Hello World!')
})

app.put('/team', (req, res) => {
    res.status(200).send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

exports.app = app;
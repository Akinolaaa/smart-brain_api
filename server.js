const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'postgresq',
		database: 'smart-brain'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies', 
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
	// login: [
	// 	{
	// 		id: '987',
	// 		hash: '',
	// 		email: 'john@gmail.com'
	// 	}
	// ]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', 
	(req, res) => { signin.handleSignin(req, res, db, bcrypt)}
)

app.post('/register', 
	(req, res) => { register.handleRegister(req, res, db, bcrypt)}
)

app.get('/profile/:id', 
	(req, res) => { profile.handleProfileGet(req, res, db)}
)

app.put('/image', 
	(req, res) => {image.handleImage(req, res, db)}
)

app.post('/imageurl', 
	(req, res) => {image.handleApiCall(req, res)}
)


app.listen(3000, () => {
	console.log('app running on 3000');
})

	//console.log(req.query);
	//req.body
	//console.log(req.header);
	// req.params
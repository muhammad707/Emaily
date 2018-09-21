const keys = require('./config/keys');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const { User } = require('./models/user');
require('./services/passport');
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const billingRoutes  = require('./routes/billingRoutes');
const { mongoose } = require('./db/mongodb'); // object destructuring that only stores mongoose property
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session()); 

// middleware to authenticate user with google account
app.use(mainRoutes);
app.use(authRoutes);
app.use(billingRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile('../', 'client', 'build', 'index.html');
	});
} 
app.listen(PORT, () => {
	console.log('App is running on 3000');
});
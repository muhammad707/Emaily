const keys = require('./server/config/keys');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path =  require('path');

const { User } = require('./server/models/user');
require('./server/services/passport');
// const mainRoutes = require('./server/routes/mainRoutes');
const authRoutes = require('./server/routes/authRoutes');
const billingRoutes  = require('./server/routes/billingRoutes');
const { mongoose } = require('./server/db/mongodb'); // object destructuring that only stores mongoose property
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
// app.use(mainRoutes);
app.use(authRoutes);
app.use(billingRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
		// console.log(path.join(__dirname, './../client', 'build', 'index.html'));
	});
} 
//console.log(path.join('client', 'build', 'static'));
app.listen(PORT, () => {
	console.log('App is running on 3000');
});
const keys = require('./../config/keys');
/* this file has access to database other files uses this exports */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongodb://<dbuser>:<dbpassword>@ds251632.mlab.com:51632/emaily-prod
mongoose.connect(keys.MONGO_URI, {
	useMongoClient: true
}, () => {
	console.log('Connected to database');
});

// exported so other files can use it
module.exports = {
	mongoose
}
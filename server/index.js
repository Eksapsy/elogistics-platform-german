/**
 * Copyrights Claims Apostolis Anastasiou
 * Email: Apostolos.Anastasiou.Alpha@gmail.com
 * App Version: 0.7.0
 */

const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('./models/FormData');
require('./models/Sender');
require('./services/passport');


const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
	useMongoClient: true
});

app.use(
	cookieSession({
		name: 'session',
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
		secure: true,
		proxy: true
	})
);

app.use(require('cookie-parser')());
// app.use(require('express-session')({
// 	cookie: {
// 		secure: true,
// 		maxAge: 60000
// 	},

// 	secret: 'keyboard cat',
// 	resave: false,
// 	saveUninitialized: true
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

require('./routes/dataRoutes')(app);
require('./routes/storageRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/sendEmail')(app);

if (process.env.NODE_ENV === "production") {
	const path = require('path');

	app.use(express.static(path.resolve(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/build/', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
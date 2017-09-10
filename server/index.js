const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/FormData');


const app = express();
mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());

require('./routes/dataRoutes')(app);

if(process.env.NODE_ENV === "production") {
	const path = require('path');

	app.use(express.static(path.resolve(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/build/', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
const express = require('express');
const app     = express();

app.use('/', (req, res) => {
  res.send('Nothing to see here');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
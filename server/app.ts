const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = express()
    .use(bodyParser.json())
    .get('/ping', (req, res) => {
        res.send('ping');
    });
app.use('/static', express.static('/static'));

const server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port`)
});
const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// we don't use database for storage but use memory, it could be scaled later on. 
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    // identify posts uniquely, id generated of 4 bytes in hex converted
    const title = req.body.title;
    posts[id] = {
        id,
        title,
    };
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log(`Listening at port 4000`);
});
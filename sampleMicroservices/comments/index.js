const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// middleware to parse incoming body into json before sending to handle request.
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    // incase it doesn't exist, we use empty array
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});

// since already we are listening on port 4000 for incoming requests post related
app.listen(3000, (req, res) => {
    console.log(`listening on port 3000`);
});
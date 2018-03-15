
const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
// above are node packages that we installed, making use of each of these in our server

let store = {
    posts: [{
        name: 'What is going on right now in this EdX course?',
        url: 'https://courses.edx.org/courses/course-v1:Microsoft+DEV283x+2T2017/course/',
        // something is wrong here. the imageURL link is not appearing on the local host location.
        imageURL: 'https://vetstreet.brightspotcdn.com/dims4/default/10dae76/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F3a%2F54%2F5ae8bfcc41b381c27a792e0dd891%2FAP-KWDHXS-645sm8113.jpg',
        text: 'As we have already discussed, this course is a little advanced and some of the language and concepts are glossed over because the teacher already assumes basic fluency with server-side programming. That is OK. You will still learn a ton, even if you don\'t understand everything. You are learning to use developer documentation and resources, and we will go over the jargon and concepts in class.',
        comments: [{
                text: 'So many assumptions are being made about what we already know?! This is overwhelming!'
            }, {
                text: 'This is great! At the end of this unit, we\'re going to be able to make our own API.'
            }, {
                text: 'How do we make this live? On a real server?!!'
        }]
    }]
}


let app = express()
// express application is a node library that creates a simple web server
// Middleware: Does stuff to the request and response objects. These things
// get executed each time we query the server.
// Middleware catches errors?
// before routing:
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())
app.use((req, res, next) => {
    //before routing the request, attach the store object to the repsonse.
    req.store = store
    next()
})

// get is to "get somehthing". post is to "push out"
// everytime url has /posts in it... go and execute the "getPost" function.
// mapping route to function getPost, addPost etc
app.get('/posts', routes.posts.getPosts)
app.get('/posts/:postId', routes.posts.getPost)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)


/*
// NOTE: We will worry about comments next week:
app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)
*/

app.listen(3000)

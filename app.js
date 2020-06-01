const express = require('express');
const app = express();
const morgan = require('morgan');
const checkAuth= require('./api/middlewares/checkAuth')


// getting-started  mongoose DB
var mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nodejsexpress-s01vz.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB connected!');
    // we're connected!
});



const articlesRouter = require('./api/routes/articles');
const categoriesRouter = require('./api/routes/categories');
const usersRouter = require('./api/routes/users');


// Show the req  = ' GET / 200 0.699 ms - 25'
app.use(morgan("dev"));

//middlewares - routes fro uploads
app.use('/uploads', express.static('uploads'));

// Add Access-Control-Allow-Origin
app.use((req, res , next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-Wiht, Content-Type , Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH ,DELETE, GET");
        return res.status(200).json({});           
    }
    next();
});


// Get back to message from body
// option 1
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))



// Routes
app.use('/articles',articlesRouter);
app.use('/categories',checkAuth,categoriesRouter);
app.use('/users',usersRouter);


// 404 Error
app.use(((req, res , next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
}));

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message 
        }
    })
});


module.exports= app;
const express = require('express');
const mongoose = require('mongoose')
const session = require("express-session")
const redis = require("redis")
let redisStore = require('connect-redis').default
const { MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    SESSION_SECRET,
    REDIS_PORT,
} = require("./config/config")

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const app = express();
const path = require('path');

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const postRouter = require("./routes/postRoute")
const userRouter = require("./routes/userRoute")
const connectWithRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log("successfully connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        });
};
connectWithRetry();
app.use(session({
    store: new redisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    cookie: {
        secure: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }

}))
//app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, './CSSThing')))
app.use(express.json())
app.get('/', function (req, res) {
    res.send("<h2>hello</h2>")
})
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
app.listen(process.env.PORT || 5000);
console.log(' Server is listening on port //localhost:3000/');
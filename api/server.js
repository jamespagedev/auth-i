/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const dbKnex = require('../data/dbConfig.js');

const server = express();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
const configureMiddleware = require('../middleware/middleware.js');
const sessionConfig = {
  name: 'TutorialDemo', // default is sid
  secret: 'asdfasdasa', // used for cookie
  cookie: {
    maxAge: 1000 * 60, // session will be good for 1 minute (milliseconds)
    secure: false // Only send the cookie over https, Set to true in production 
  },
  httpOnly: true, // js can't touch this cookie
  // read about these two options: set correctly to avoid trouble
  // https://www.npmjs.com/package/express-session
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({ // used to save session if server restarts
    tablename: 'sessions',
    sidfieldname: 'sid', // data inside of your database
    knex: dbKnex, // asks knex if we already have this file
    createtable: true, // creates this table if it does not exist
    clearInterval: 1000 * 60 * 60 // clears sessions every hour from the db
  })
}

server.use(session(sessionConfig)); // pass an object as the arg
configureMiddleware(server);

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
server.get('/', (req, res) => {
  res.send(`Main Server Running...`);
});

const registerRouter = require('./routes/registerRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const logoutRouter = require('./routes/logoutRouter.js');
const usersRouter = require('./routes/usersRouter.js');

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/logout', logoutRouter);
server.use('/api/users', usersRouter);

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = server;
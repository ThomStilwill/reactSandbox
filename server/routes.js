module.exports = function(app) {
  const express    = require('express');
  const jsonServer = require('json-server');
  const compression = require('compression');
  const helmet = require('helmet');
  const path = require('path');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const errorHandler = require('./_helpers/error-handler');

  var virtualDirPath = process.env.virtualDirPath || '/';
	if (!virtualDirPath.startsWith('/', 0)) {
		virtualDirPath = '/' + virtualDirPath;
  }

  var clientPath = process.env.NODE_ENV === 'production' ? './' : '../dist/client' ;
  var webpath = path.join(__dirname, clientPath);
  var dbpath = path.join(__dirname, 'db.json');

  const SECRET_KEY = '123456789'
  const expiresIn = '1h'

  function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
  }

  // Verify the token
  function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
  }

  // Check if the user exists in database
  function isAuthenticated({email, password}){
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  //app.use(compression());
  //app.use(helmet());

  // api routes
  //app.use('/users', require('./users/users.controller'));

  app.use(function timelog(err,req,res,next){
    console.error(new Date().toLocaleTimeString(), req.originalUrl);
    next();
  })

  app.use(function(err,req,res,next){
    console.error(err.stack);
    res.json(500,{ERROR: 'internal server error.'});
  })

  // app.post('/auth/login', (req, res) => {
  //   const {email, password} = req.body
  //   if (isAuthenticated({email, password}) === false) {
  //     const status = 401
  //     const message = 'Incorrect email or password'
  //     res.status(status).json({status, message})
  //     return
  //   }
  //   const access_token = createToken({email, password})
  //   res.status(200).json({access_token})
  // })

  // app.use(/^(?!\/auth).*$/,  (req, res, next) => {
  //   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
  //     const status = 401
  //     const message = 'Bad authorization header'
  //     res.status(status).json({status, message})
  //     return
  //   }
  //   try {
  //      verifyToken(req.headers.authorization.split(' ')[1])
  //      next()
  //   } catch (err) {
  //     const status = 401
  //     const message = 'Error: access_token is not valid'
  //     res.status(status).json({status, message})
  //   }
  // })

  app.use(virtualDirPath + 'api', jsonServer.router(dbpath))

  app.use(express.static(webpath));

  app.get('*', (req,res) => {
    res.sendFile(path.join(webpath,'index.html'));
  })

  // global error handler
  app.use(errorHandler);

  console.log('webpath: ' + webpath);
  console.log('dbpath: ' + dbpath);

}

'use strict';
const bcrypt = require('bcryptjs');
const { parseToken, getUserFromDB } = require('../auth/authHelpers');

function checkAuth(req, res, next){
  const userToken = req.get('authorization');

  if (!userToken) return res.status(401).json({message: 'access denied'});
  if(!userToken.toLowerCase().startsWith('basic ')) return res.status(401).json({message: 'access denied'});
  
  const base64 = userToken.split('Basic ')[1];

  const [ userName, password ] = parseToken(base64);

  if (!userName || !password) return res.status(401).json({message: 'access denied'});

  getUserFromDB(req.app.get('db'), userName)
    .then(user => {
      console.log(user)
      if(!user ){
        return res.status(401).json({message: 'access denied'});
      } 
      return bcrypt.compare(password, user.password)
        .then(passwordsMatch => {
          console.log(password, user.password);
          if (!passwordsMatch) {
            return res.status(401).json({ error: 'Unauthorized request' });
          }
          req.user = user;
          next();
        });
    }) 
    .catch(console.log);
}

module.exports = checkAuth;
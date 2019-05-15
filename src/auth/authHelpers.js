'use strict';
function parseToken(encodedToken) {

  return Buffer.from(encodedToken, 'base64').toString().split(':');
}

function getUserFromDB(db, userName) {
  return db()
    .select('*')
    .from('thingful_users')
    .first()
    .where('user_name', userName);
}


module.exports = {
  parseToken,
  getUserFromDB
};
const bcrypt = require('bcryptjs')


bcrypt.hash('test-string', 1).then(hash => console.log({ hash }))



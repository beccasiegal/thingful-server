const bcrypt = require('bcryptjs')
  const AuthService = require('../auth/auth-service')

...

    AuthService.getUserWithUserName(
      req.app.get('db'),
      tokenUserName
    )
     .then(user => {
     if (!user) {
         return res.status(401).json({ error: 'Unauthorized request' })
       }

   return bcrypt.compare(tokenPassword, user.password)
     .then(passwordsMatch => {
       if (!passwordsMatch) {
          return res.status(401).json({ error: 'Unauthorized request' })
         }
        req.user = user
        next()
     })
     })
     .catch(next)
 }
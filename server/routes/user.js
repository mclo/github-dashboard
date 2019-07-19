let express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken')
   
router.route('/') 
.get(function(req, res, next) {  
    res.json({
        user: {
            username: req.user.username,
            id: req.user.id,
            image_url: req.user.image_url,
            subscriptions: req.user.subscriptions
        }
    })            
})


module.exports = router
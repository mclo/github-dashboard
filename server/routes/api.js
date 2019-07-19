let express = require('express'),
    router = express.Router(),
    model = require('../resources/model').model

router.route('/')
    .get(function(req, res){
        res.send(model)
    })

module.exports = router
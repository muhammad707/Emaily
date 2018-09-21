const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({"message":"Hi there"}); 
}); 

module.exports = router;
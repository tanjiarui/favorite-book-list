// modules required for routing
let express = require('express');
let router = express.Router();

/* GET home page. wildcard */
router.get('/', (req, res) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
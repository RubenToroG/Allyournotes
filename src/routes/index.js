const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
    //res.send('Index');
}); 

router.get('/about', (req, res) => {
    res.render('about'); //no es necesario ponerle el .hbs
});

module.exports = router;
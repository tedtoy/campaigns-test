const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const normalizr = require('normalizr');

const campaignsData = require ('./data/campaigns.json');
const cardsData = require('./data/cards.json');
const filtersData = require('./data/filters.json');


const app = express();
app.use(express.static(path.join(__dirname, 'build')));


var router = express.Router();


router.use(function(req, res, next) {
    next();
});


app.use('/api', router);


router.route('/dashboard')
  .get(function(req, res) {
    return res.send({
      'cards': cardsData,
      'campaigns': campaignsData,
      'filters': filtersData,
    });
  });

router.route('/cards')
  .get(function(req, res) {
    return res.send(cardsData);
  });


router.route('/campaigns')
  .get(function(req, res) {
    return res.send(campaignsData);
  });


router.route('/filters')
  .get(function(req, res) {
    return res.send(filtersData);
  });


app.listen(process.env.PORT || 8080);

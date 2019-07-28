var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var hotDogsController = require("./controllers/hotDogs");
var db = require('./db');
var path = require('path')
var methodOverride = require('method-override');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', hotDogsController.all);

app.get('/new', function (req, res) {
  var params = {
    formAction: '/create',
    formTitle: 'Create Hot Dog', 
    name: '', 
    description: '',
  };
  res.render('edit', { item: params });
});
app.post('/create', hotDogsController.create);

app.get('/edit/:id', hotDogsController.edit);
app.put('/update/:id', hotDogsController.update);

app.delete('/delete/:id', hotDogsController.delete);

db.connect('mongodb+srv://ochornolutskyi:0306manutd!@cluster0-cceuj.mongodb.net/test?retryWrites=true&w=majority', function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});

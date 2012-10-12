
/**
 * Module dependencies.
 */

var express = require('express'),
	app = express.createServer(),
    user = require('./routes/users');



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get("/profile/:id", user.show);
app.get("/edit", user.add);
app.get("/edit/:id", user.edit);
app.post("/save", user.save);
app.post("/delet/:id", user.del);
app.get("/", function(req, res) {
	res.render("index", {title:"Hello world"});
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || '8080';
const bodyParser = require('body-parser');
const route = require('./server/server_routes/server_routes');
const db = require('./server/models');
const jwt = require('jsonwebtoken');
const jsonSecretKey = 'secret';

db.sequelize.sync().then(() => {
    console.log('database was synced');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/forum', route);

function getToken(req) {
	return req.headers.authorization.split(' ')[1]
  }

app.use((req, res, next) => {	
	if(req.url === '/signup' || req.url === '/login' || req.url === '/profile') next()
	else {	  
	  const token = getToken(req)
	  console.log(typeof token)
	  if(token) {
		console.log(token)
		if(jwt.verify(token, jsonSecretKey)) {		  
		  req.decode = jwt.decode(token)
		  next()
		} else {
		  res.status(403).json({ error: 'Not Authorized.' })
		}
	  } else {
		res.status(403).json({ error: 'No token. Unauthorized.' })
	  }
	}
  });
  
  
  

app.listen(port, () => {
    console.log(`Application listen at port ${port}`);
})

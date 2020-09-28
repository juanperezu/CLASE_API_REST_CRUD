const express =require('express');
const path =require('path');
const morgan = require('morgan');
const app=express();

// Middlewares
app.use(morgan('dev')); //MOnitorear las peticiones
app.use(express.json());// peticiones de formato guia


// Routes
app.use('/api/',require('./routes/movies'));// llevar al api del crud con los middleware

app.set("port",4001);
app.listen(app.get("port"),()=>{
console.log('servidor corrien en el puerto ' + app.get("port") );
});

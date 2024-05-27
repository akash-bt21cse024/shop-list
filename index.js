const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const connectDb = require('./config/connectdb');
const {postalldata,getalldata} = require('./controllers/products.controller');
const {signup,login}=require('./controllers/user.controller');
const jwt = require('jsonwebtoken');
const {getwishlist,postwishlist,delewishlist}=require( './controllers/wishlist.controler')
const {postcard,deletcard,getcard}=require('./controllers/card.controller');
const {postaddress,deletaddress,getaddress}=require('./controllers/address.controller');

const cors = require('cors');
app.use(cors());
connectDb();
app.use(express.json());
app.post('/',postalldata );
app.get('/api/products',getalldata)
app.post('/api/auth/signup',signup)
app.post('/api/auth/login',login)
app.post('/api/wishlist',postwishlist)
app.delete('/api/wishlist/:id',delewishlist)
app.get('/api/wishlist',getwishlist)
app.post( '/api/card',postcard)
app.delete('/api/card/:id',deletcard)
app.get('/api/card',getcard)
app.post('/api/address',postaddress)
app.delete('/api/address/:id',deletaddress)
app.get('/api/address',getaddress)


mongoose.connection.once('open',()=>{
   console.log('connected to db');
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
});

const mongoose = require('mongoose');

const connectDb =async()=>{
  try{
    await mongoose.connect('mongodb+srv://bt21cse024:akash@cluster0.8djzi1k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


  }
  catch(err){
    console.log('this is err--',err)
  }
}

module.exports=connectDb;
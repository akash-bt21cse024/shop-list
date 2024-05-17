const Product=require('../model/products_model');
const products=require('../Db/product');


const postalldata = async (req, res) =>{
    try{
      await Product.deleteMany({});
      const data = await Product.insertMany(products.products);

      res.status(201).json({
        status:"success",
        data:data
      })
    }
    catch(err){
      res.status(500).json({
        status:"fail",
        data:{errorMessage: "it is fail to load data from dataBase"}
      })
      console.log('this is err--',err)
    }
  }



const getalldata = async (req,res) => {
  try{
    const data = await Product.find();
    res.status(200).json({
      status:"success",
      data:data
    });
  }
    catch(err){
      res.status(500).json({
        status:"fail",
        data:{errorMessage: "it is fail to load data from dataBase"}
      })
      console.log('this is err--',err)
    }
  
}

module.exports = {postalldata,getalldata}
  
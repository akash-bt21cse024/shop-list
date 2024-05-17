const wislist=require('../model/wishlist.model');

const postwishlist =  async(req,res)=>{
try{
const product = req.body
  const flag = await wislist.findOne({id:product.id});
  if(!flag){
    const data= new wislist(product);
    await data.save();
    res.status(201).json({
      status:"success"
    })
  }else{
    console.log("iteam already in wishlist");
    res.status(400).json({
      status:"fail",
      data:{errorMessage:"it is already in wishlist"}
    })
  }
}catch(err){
  res.status(500).json({
    status:"fail",
    data:{errorMessage: "it is fail to post wishlist"}
  })
  console.log('this is err--',err)
}
  
}



const delewishlist =async(req,res)=>{
  try{
    
    const data = await wislist.findOneAndDelete({id:req.params.id});
    if(!data){
      res.status(400).json({
        status:"fail",
        data:{errorMessage:"it is not in wishlist"}
      })
    }else{
      res.status(200).json({
        status:"success"
      })
    }
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to delete wishlist"}
    })
    console.log('this is err--',err)
  }
}

const getwishlist =async(req,res)=>{
  try{
    const data = await wislist.find();
    res.status(200).json({
      status:"success",
      data:data
    })
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to get wishlist"}
    })
    console.log('this is err--',err)
  }
}


module.exports = {postwishlist,delewishlist,getwishlist};
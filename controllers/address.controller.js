const Address=require('../model/address.model');

const postaddress = async(req,res)=>{
  try{
    const address = req.body;
    const flag = await Address.findOne({id:address.id});
    if(!flag){
      const data = new Address(address);
      await data.save();
      res.status(201).json({
        status:"success"
      })
    }else{
      console.log("it is already in address");
      res.status(400).json({
        status:"fail",
        data:{errorMessage:"it is already in address"}
      })
    }
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to post address"}
    })
    console.log('this is err--',err)
  }
}
const deletaddress =async(req,res)=>{
  try{
    const data = await Address.findOneAndDelete({id:req.params.id});
    if(!data){
      res.status(400).json({
        status:"fail",
        data:{errorMessage:"it is not in address"}
      })
    }else{
      res.status(200).json({
        status:"success"
      })
    }
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to delete address"}
    })
    console.log('this is err--',err)
  }
}
const getaddress = async (req,res)=>{
  try{
    const data = await Address.find();
    res.status(200).json({
      status:"success",
      data:data
    })
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to get address"}
    })
    console.log('this is err--',err)
  }
}
module.exports = {postaddress,deletaddress,getaddress}
const cards=require('../model/card.model');

const postcard = async(req,res)=>{
  try{
    const card = req.body;
    const flag = await cards.findOne({id:card.id});
    if(!flag){
      const data = new cards(card);
      await data.save();
      res.status(201).json({
        status:"success"
      })
    }else{
      console.log("it is already in card");
      res.status(400).json({
        status:"fail",
        data:{errorMessage:"it is already in card"}
      })
    }
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to post card"}
    })
    console.log('this is err--',err)
  }
}

const deletcard =async(req,res)=>{
  try{
    const data = await cards.findOneAndDelete({id:req.params.id});
    if(!data){
      res.status(400).json({
        status:"fail",
        data:{errorMessage:"it is not in card"}
      })
    }else{
      res.status(200).json({
        status:"success"
      })
    }
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to delete card"}
    })
    console.log('this is err--',err)
  }
}

const getcard = async (req,res)=>{
  try{
    const data = await cards.find();
    res.status(200).json({
      status:"success",
      data:data
    })
  }catch(err){
    res.status(500).json({
      status:"fail",
      data:{errorMessage: "it is fail to get card"}
    })
    console.log('this is err--',err)
  }
}

module.exports = {postcard,deletcard,getcard}
const Address=require('../model/address.model');

const postaddress = async(req,res)=>{
  try {
    console.log(req.body)
    const { id: userId,product } = req.body;
     console.log(userId,product)
    const flag = await Address.findOne({ id: userId });
    console.log(flag);
    if (!flag) {
      const newwishlist = new Address({ id: userId, address: [product] });
      await newwishlist.save();
      res.status(201).json({ status: "success", messge: "make new address" });
    } else {
      let array = flag.address;;
      const tempflag= array.some(item => item.pincode === product.pincode);
      if(!tempflag){
      array = [...array, product];}
      await Address.updateOne({ id: userId }, { $set: { address: array } });
      res
        .status(201)
        .json({ status: "success", data: { message: "Added to address" } });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to post address" },
    });
    console.error("Error:", err);
  }
}
const deletaddress =async(req,res)=>{
  const temp=req.params.userid;
  const temp1=temp.split("+");

  const userId=temp1[0];
  const pincode=temp1[1];
  try {
    const flag = await Address.findOne({ id: userId });

    if (flag) {
      const arry = flag.address;

      let newarray = arry.filter((item) => item.pincode !== pincode);
      console.log(newarray);

      await Address.updateOne(
        { id: userId },
        { $set: { address: newarray } },
      );
      res.status(200).json({
        status: "success",
        message: "product removed from address",
      });
    } else {
      res
        .status(400)
        .json({ status: "fail", data: { errorMessage: "user not found" } });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to delete from address" },
    });
    console.error("Error---:", err);
  }
}
const getaddress = async (req,res)=>{
  try {
    const userId=req.params.userid;


    const flag = await Address.findOne({ id: userId });

    if (flag) {
      const data = flag.address;
      res.status(200).json({ status: "success", data: data });
    } else {
      const newwishlist = new Wishlist({ id: userId, wishlist: [] });
      await newwishlist.save();

      res.status(201).json({ status: "create new user", data: [] });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to get wishlist" },
    });
    console.error("Error:", err);
  }
}
module.exports = {postaddress,deletaddress,getaddress}
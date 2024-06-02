const Wishlist = require("../model/wishlist.model");

// POST: Add a product to the wishlist
const postwishlist = async (req, res) => {
  try {
    const { product, userid: userId } = req.body;

    const flag = await Wishlist.findOne({ id: userId });
    console.log(flag);
    if (!flag) {
      const newwishlist = new Wishlist({ id: userId, wishlist: [product] });
      await newwishlist.save();
      res.status(201).json({ status: "success", messge: "make new wishlist" });
    } else {
      let array = flag.wishlist;
      const tempflag= array.some(item => item._id === product._id);
      if(!tempflag){
      array = [...array, product];}
      await Wishlist.updateOne({ id: userId }, { $set: { wishlist: array } });
      res
        .status(201)
        .json({ status: "success", data: { message: "Added to wishlist" } });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to post wishlist" },
    });
    console.error("Error:", err);
  }
};

// DELETE: Remove a product from the wishlist
const delewishlist = async (req, res) => {
const temp=req.params.userid;
  const temp1=temp.split("+");
  
  const userId=temp1[0];
  const productId=temp1[1];
  try {
    const flag = await Wishlist.findOne({ id: userId });

    if (flag) {
      const arry = flag.wishlist;

      let newarray = arry.filter((item) => item._id !== productId);
      console.log(newarray);

      await Wishlist.updateOne(
        { id: userId },
        { $set: { wishlist: newarray } },
      );
      res.status(200).json({
        status: "success",
        message: "product removed from wishlist",
      });
    } else {
      res
        .status(400)
        .json({ status: "fail", data: { errorMessage: "user not found" } });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to delete from wishlist" },
    });
    console.error("Error---:", err);
  }
};

// GET: Retrieve the wishlist for a user
const getwishlist = async (req, res) => {
  try {
    const userId=req.params.userid;
    
  
    const flag = await Wishlist.findOne({ id: userId });

    if (flag) {
      const data = flag.wishlist;
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
};

module.exports = { postwishlist, delewishlist, getwishlist };

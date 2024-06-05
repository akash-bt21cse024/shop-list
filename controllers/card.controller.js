const cards = require("../model/card.model");

const postcard = async (req, res) => {
  try {
    const { product, userid: userId } = req.body;

    const flag = await cards.findOne({ id: userId });

    if (!flag) {
      const newcard = new cards({ id: userId, wishlist: [product] });
      await newcard.save();
      res.status(201).json({ status: "success", messge: "make new card" });
    } else {
      let array = flag.card;
      const tempflag = array.some((item) => item._id === product._id);
      if (!tempflag) {
        array = [...array, product];
      }
      await cards.updateOne({ id: userId }, { $set: { card: array } });
      res
        .status(201)
        .json({ status: "success", data: { message: "Added to card" } });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to post card" },
    });
    console.error("Error:", err);
  }
};

// DELETE: Remove a product from the wishlist
const deletcard = async (req, res) => {
  const temp = req.params.userid;
  const temp1 = temp.split("+");
  
  const userId = temp1[0];
  const productId = temp1[1];
  try {
    const flag = await cards.findOne({ id: userId });

    if (flag) {
      const arry = flag.card;
      if (productId === "99999") {
        
        await cards.updateOne({ id: userId }, { $set: { card: [] } });
      } else {
        let newarray = arry.filter((item) => item._id !== productId);
        console.log(newarray);

        await cards.updateOne({ id: userId }, { $set: { card: newarray } });
      }
      res.status(200).json({
        status: "success",
        message: "product removed from card",
      });
    } else {
      res
        .status(400)
        .json({ status: "fail", data: { errorMessage: "user not found" } });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to delete from card" },
    });
    console.error("Error---:", err);
  }
};

// GET: Retrieve the wishlist for a user
const getcard = async (req, res) => {
  try {
    const userId = req.params.userid;

    const flag = await cards.findOne({ id: userId });

    if (flag) {
      const data = flag.card;
      res.status(200).json({ status: "success", data: data });
    } else {
      const newwishlist = new cards({ id: userId, card: [] });
      await newwishlist.save();

      res.status(201).json({ status: "create new user", data: [] });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: { errorMessage: "Failed to get card" },
    });
    console.error("Error:", err);
  }
};

module.exports = { postcard, deletcard, getcard };

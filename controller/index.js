//@desc     Default welcome route
//@route    GET /
//@access   public
exports.welcome = (req, res) => {
  res.status(200).json({ message: "WELCOME TO GIVEINDIA" });
};
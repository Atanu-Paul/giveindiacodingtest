//making connection to the mongodb atlas cluster

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MONGODB IS UP @ MONGO_ATLAS : " ${conn.connection.host} "`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

//exporting the connectDB function.
module.exports = connectDB;

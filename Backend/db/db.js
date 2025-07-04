import mongoose from "mongoose";
function connectDB() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log(`connected to DB`);
    })
    .catch((err) => console.log(err));
}


export default connectDB; // Exporting the connectDB function for use in other files
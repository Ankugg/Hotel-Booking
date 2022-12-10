import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  price: {
    type: String,
    required: true,
  },
  maxPeople: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  roomNumbers:[{number:Number,unavailabledate:{type:[Date]}}]
 
},{timestamps:true}
);

export default mongoose.model("Room", RoomSchema);

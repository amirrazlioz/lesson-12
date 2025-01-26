
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  userEmail: String,
  products: [String],
  totalPrice: Number,
});

export default mongoose.model('Order', orderSchema);
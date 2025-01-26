
import Express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"

import authRoutes from './routes/sign.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

const port = 3000;

const app = Express();

// connect to MongoDB
mongoose.connect("mongodb+srv://amirrazlioz:vOCjvLEg4EjtEHoY@amir1.xwum8.mongodb.net/amir-test" ) 

app.use(cors());
app.use(bodyParser.json());

app.use('/sign', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.listen(port, () => {
  console.log(`Server running on port :${port}`);
});
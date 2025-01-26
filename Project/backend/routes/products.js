
import Express from "express"
import Product from '../models/product.js'

const router = Express();

router.get('/getProduct', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

router.post('/addProduct', async (req, res) => {
  const { name, price } = req.body;
  const newProduct = new Product({ name, price });
  await newProduct.save();
  res.status(201).send('Product added');
});


router.delete('/delProduct', async (req, res) => {
  const productName = req.body.name; // קבלת שם המוצר מגוף הבקשה

  if (!productName) {
    return res.status(400).send('Product name is required.');
  }

  try {
    const result = await Product.deleteOne({ name: productName });

    if (result.deletedCount === 0) {
      return res.status(404).send('Product not found.');
    }

    res.status(200).send('Product deleted successfully.');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Error deleting product.');
  }
});

export default router;

import Express from "express"
import Order from '../models/order.js'

const router = Express();

router.post('/place', async (req, res) => {
  const { userEmail, products, totalPrice } = req.body;
  const newOrder = new Order({ userEmail, products, totalPrice });
  await newOrder.save();
  res.status(201).send('Order placed');
});

router.get('/all', async (req, res) => {
  const { admin } = req.query;
  if (admin !== 'true') {
    return res.status(400).send('Error');
  }
  const orders = await Order.find();
  res.status(200).json(orders);
});

export default router;
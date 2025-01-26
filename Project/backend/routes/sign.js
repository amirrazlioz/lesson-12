
import Express from "express"
import User from '../models/user.js'

const router = Express();

router.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send('Email already exists');
  }
  const newUser = new User({ email, name, password });
  await newUser.save();
  res.status(201).send('User registered');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }
  res.status(200).send('Login successful');
});

export default router;

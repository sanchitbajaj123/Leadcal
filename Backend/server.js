const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mon = require('mongoose');
const env = require('dotenv');
env.config();

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mon.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('DB Connection Error:', err));

// Define Schema
const userSchema = new mon.Schema({
  email: { type: String, required: true },
  pass: { type: String, required: true },
  products: [{
    name: String,
    price: String,
    image: String,
    cartadded: { type: Boolean, default: false },
    paymentdone: { type: Boolean, default: false },
    mailsent: { type: Boolean, default: false }
  }],
  timespent: String,
  address: String,
  leadpoints: { type: Number, default: 0 },
  leadpointsrecord: [{
    action: { type: String },  // signup, login, addtocart, payment
    points: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
  }]
});

// Model
const User = mon.model('User', userSchema);

// App Setup
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ======================== ROUTES ========================== //

// Signup Route (+5 lead points)
app.post('/signup', async (req, res) => {
  try {
    const { email, pass, address } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const newUser = new User({
      email,
      pass,
      address,
      products: [],
      timespent: '0',
      leadpoints: 5,
      leadpointsrecord: [{
        action: 'signup',
        points: 5,
        timestamp: new Date()
      }]
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully! +5 points awarded', leadpoints: newUser.leadpoints });
  } catch (err) {
    res.status(500).json({ message: 'Error in signup', error: err.message });
  }
});

// Login Route (+1 lead point)
app.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found!' });
    if (user.pass !== pass) return res.status(400).json({ message: 'Incorrect password!' });

    // Update lead points
    user.leadpoints += 1;
    user.leadpointsrecord.push({
      action: 'login',
      points: 1,
      timestamp: new Date()
    });

    // Set mailsent = false for all products
    user.products.forEach(product => {
      product.mailsent = false;
    });

    await user.save();

    res.status(200).json({
      message: 'Login successful +1 point awarded, mailsent reset',
      leadpoints: user.leadpoints,
      user
    });
  } catch (err) {
    res.status(500).json({ message: 'Error in login', error: err.message });
  }
});

// Add Product Route
app.post('/addproduct', async (req, res) => {
  try {
    const { email, name, price, image } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    // Check duplicate
    const exists = user.products.some(p => p.name === name);
    if (exists) return res.status(400).json({ message: 'Product already added!' });

    const newProduct = { name, price, image, cartadded: false, paymentdone: false, mailsent: false };
    user.products.push(newProduct);
    await user.save();

    res.status(200).json({ message: 'Product added!', products: user.products });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

// Add to Cart Route (+3 lead points)
app.post('/addtocart', async (req, res) => {
  try {
    const { email, productName } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    let productFound = false;
    user.products.forEach(product => {
      if (product.name === productName) {
        product.cartadded = true;
        productFound = true;
      }
    });

    if (!productFound) return res.status(404).json({ message: 'Product not found!' });

    user.leadpoints += 3;
    user.leadpointsrecord.push({
      action: 'addtocart',
      points: 3,
      timestamp: new Date()
    });

    await user.save();
    res.status(200).json({ message: 'Product added to cart +3 points awarded', leadpoints: user.leadpoints, products: user.products });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
});

// Payment Route (+10 lead points)
app.post('/payment', async (req, res) => {
  try {
    const { email, productName } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found!' });

    let productFound = false;
    user.products.forEach(product => {
      if (product.name === productName) {
        product.paymentdone = true;
        productFound = true;
      }
    });

    if (!productFound) return res.status(404).json({ message: 'Product not found!' });

    user.leadpoints += 10;
    user.leadpointsrecord.push({
      action: 'payment',
      points: 10,
      timestamp: new Date()
    });

    await user.save();
    res.status(200).json({ message: 'Payment done +10 points awarded', leadpoints: user.leadpoints, products: user.products });
  } catch (err) {
    res.status(500).json({ message: 'Error processing payment', error: err.message });
  }
});
app.get('/getcart', async (req, res) => {
  try {
    const { email } = req.query; // Changed from req.body to req.query
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found!' });

    const cartProducts = user.products.filter(product => product.cartadded === true);

    res.status(200).json({
      message: 'Cart fetched successfully',
      products: cartProducts
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
});
app.post('/removecart', async (req, res) => {
  try {
    const { email, productName } = req.body;
    const user = await User.findOne({ email });
    for(let i=0;i<user.products.length;i++){
      if(user.products[i].name==productName){
        user.products[i].cartadded=false;
      }
    }
  }
    catch (err) {
      res.status(500).json({ message: 'Error removing from cart', error: err.message });
    }
  
  })
      

// Default Route
app.get('/', async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

// Server Start
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

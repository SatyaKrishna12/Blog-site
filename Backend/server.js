const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOveride = require("method-override");
const postRoutes = require('./routes/Post');
const userRoutes = require('./routes/User');
const Posts = require('./models/Posts');
const dotenv = require('dotenv');
dotenv.config(); 

app.use(methodOveride("_method"));
app.use(cors()); 
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL 
let port = 5000; 

//MongoDB Connection
main()
  .then((res) => {
    console.log("connected Successful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}


app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
});

app.use('/api/posts', postRoutes); 
app.use('/api/users', userRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});
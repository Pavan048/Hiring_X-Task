const express = require('express');
const connectDb = require("./config/dbConnnection");
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
connectDb();
const app = express()
const port = process.env.PORT || 5000;



app.use(express.json());
app.use("/api/posts" , require("./routes/postsRoutes"));

// routes for user 

 app.use("/api/user" , require("./routes/userRoutes"));
// error handler middle ware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})


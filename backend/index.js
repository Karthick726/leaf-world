const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

// user contact enquiry router
const userContactenquiry = require("./Route/userContactsenquRouter");
const courselRoute = require("./Route/CourselRouter");
const loginRoute = require("./Route/loginRoute");
const adminadded = require("./Route/AdminContactRouter");
const logoutRoute = require("./Route/logoutRoute");
const products = require("./Route/productRoute");
const userRegister = require("./Route/userRegisterRoute");
const orderRoute = require("./Route/orderRoute");


app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000","https://leaf-world.vercel.app","https://leaf-world-client-frontend.vercel.app"],

  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/usercontactenquiry", userContactenquiry);
app.use("/coursel", courselRoute);
app.use("/admin", loginRoute);
app.use("/contact", adminadded);
app.use("/admins", logoutRoute);
app.use("/products", products);
app.use("/user", userRegister);
app.use("/order",orderRoute)

const mongo_url =
  "mongodb+srv://karthickc726:karthickc726@cluster0.cgkds.mongodb.net/leaftWorld?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("db connect");
    const port = 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("error:" + error);
  });

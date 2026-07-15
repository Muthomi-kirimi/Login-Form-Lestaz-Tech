const express=require("express");
const cors=require("cors");
const supabase=require("./config/supabase");
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/authMiddleware");
require("dotenv").config();

const app=express();


app.use(cors({
    origin: ["https://login-form-lestaz-tech.vercel.app",

        "http://localhost:5177" ],
    credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("Backend is running..");
});

app.get("/api/profile", verifyToken, (req, res) => {

    res.json({
        message: "Welcome to the protected route.",
        user: req.user
    });

});

const PORT=process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

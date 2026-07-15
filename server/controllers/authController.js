const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");
const crypto = require("crypto");
const transporter = require("../config/mailer");

// Register User
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: existingUser } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { error } = await supabase
            .from("users")
            .insert([
                {
                    email,
                    password: hashedPassword
                }
            ]);

        if (error) {
            return res.status(500).json(error);
        }

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (err) {
        res.status(500).json(err);
        
    }
};

//Forgot pasword

const forget = async (req, res) => {

    const { email } = req.body;

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
        return res.status(404).json({
            message: "No account found with that email."
        });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await supabase
        .from("users")
        .update({
            reset_token: token,
            reset_token_expires: expires
        })
        .eq("id", user.id);

    const resetLink =
        `http://localhost:5177/reset-password/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `
            <h2>Password Reset</h2>

            <p>Click the link below to reset your password.</p>

            <a href="${resetLink}">
                Reset Password
            </a>

            <p>This link expires in one hour.</p>
        `
    });

    res.json({
        message: "Password reset email sent."
    });

};

//Reset the pasword
const resetPassword = async (req, res) => {

    const { token } = req.params;

    const { password } = req.body;

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("reset_token", token)
        .single();

    if (error || !user) {
        return res.status(400).json({
            message: "Invalid reset token."
        });
    }

    if (new Date(user.reset_token_expires) < new Date()) {

        return res.status(400).json({
            message: "Reset link has expired."
        });

    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    await supabase
        .from("users")
        .update({

            password: hashedPassword,

            reset_token: null,

            reset_token_expires: null

        })
        .eq("id", user.id);

    res.json({
        message: "Password updated successfully."
    });

};

// Login User
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (err) {


        res.status(500).json({
            message: err.message,
            message: "No account found.Please Register",
    
        });
  console.log(err);
    }

};

module.exports = {
    register,
    login,
    forget,
    resetPassword
};
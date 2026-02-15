import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { inngest } from "../inngest/client.js";

// export const signup = async (req, res) => {
//   try {
//     const { email, password, role, skills = [] } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);

//     // ✅ Ensure skills is an array
//     const skillsArray = Array.isArray(skills)
//       ? skills
//       : typeof skills === "string"
//       ? skills.split(",").map((s) => s.trim()).filter(Boolean)
//       : [];

//     // validate allowed roles
//     const allowedRoles = ["user", "moderator"];
//     const finalRole = allowedRoles.includes(role) ? role : "user";

//     const user = await User.create({ email, password: hashed, role: finalRole, skills: skillsArray });

//     //Fire inngest event

//     await inngest.send({
//       name: "user/signup",
//       data: {
//         email,
//       },
//     });

//     const token = jwt.sign(
//       { _id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET
//     );

//     res.json({ user, token });
//   } catch (error) {
//     res.status(500).json({ error: "Signup failed", details: error.message });
//   }
// };


export const signup = async (req, res) => {
  try {
    // ✅ Normalize email before checking or saving
    const email = req.body.email?.trim().toLowerCase();
    const { password, role, skills = [] } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Check existing user (case-insensitive)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const skillsArray = Array.isArray(skills)
      ? skills.map((s) => s.trim().toLowerCase()).filter(Boolean)
      : typeof skills === "string"
      ? skills
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean)
      : [];

    const allowedRoles = ["user", "moderator"];
    const finalRole = allowedRoles.includes(role) ? role : "user";

    const user = await User.create({
      email,
      password: hashed,
      role: finalRole,
      skills: skillsArray,
    });

    console.log("🔥 Sending Inngest event...");

    await inngest.send({
      name: "user/signup",
      data: { email },
    });

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorzed" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Unauthorized" });
    });
    res.json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ eeor: "Forbidden" });
    }
    const { skills = [], role, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });


    const allowedRoles = ["user", "moderator", "admin"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

     // Normalize skills: accept array or comma separated string
    let normalizedSkills = [];
    if (Array.isArray(skills)) {
      normalizedSkills = skills.map((s) => String(s).trim()).filter(Boolean);
    } else if (typeof skills === "string") {
      normalizedSkills = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Only update fields provided
    if (role) user.role = role;
    if (normalizedSkills.length) user.skills = normalizedSkills;

    await user.save();

    await User.updateOne(
      { email },
      { skills: skills.length ? skills : user.skills, role }
    );
    return res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed", details: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const users = await User.find().select("-password").lean();
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Update failed", details: error.message });
  }
};

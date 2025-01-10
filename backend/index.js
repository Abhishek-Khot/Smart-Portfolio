//start code

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const User = require("./models/User");
const multer = require("multer");
const app = express();
const cors = require('cors');


// Middleware
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //store the photos

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for Authentication

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Configure storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
  },
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf/; // Allow images and PDFs
  const extName = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedFileTypes.test(file.mimetype);
  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF files are allowed!"));
  }
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

//login signup logout

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
  // res.redirect("/");
});

//dashboard

// Render Dashboard Page
app.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.homepage.expertise = user.homepage.expertise.flatMap((item) =>
      item.split(",").map((e) => e.trim())
    );

    // Skillset is already an array, ensure each value is trimmed
    user.about.skillset = user.about.skillset.map((s) => s.trim());

    // Render dashboard with updated data
    res.render("dashboard", { user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//this is for the buttons
// Fetch User Data (JSON for authentication buttons)
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to Render Homepage Form
app.get("/dashboard/homepage", authMiddleware, (req, res) => {
  res.render("home/homepageForm");
});

// Handle Homepage Data Submission
app.post(
  "/dashboard/homepage",
  authMiddleware,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const { portfolioName, userName, expertise } = req.body;
      const profilePhoto = req.file ? req.file.path : null;

      await User.findByIdAndUpdate(req.user.id, {
        homepage: { portfolioName, userName, expertise: expertise.split(",") },
        profilePhoto, // Save the profile photo path
      });

      res.redirect("/dashboard");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Form for Updating "Home"

app.get("/dashboard/home", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("homepage");
    res.render("home/homeUpdateForm", { homepage: user.homepage });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update "Home" Data
app.post("/dashboard/home", authMiddleware, async (req, res) => {
  try {
    const { portfolioName, userName, expertise } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      homepage: { portfolioName, userName, expertise },
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add similar routes for "About", "Projects", "Blogs", "Resume"

// Render About Form
app.get("/dashboard/about", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("about");
    res.render("home/aboutUpdateForm", { about: user.about });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update About Data
app.post("/dashboard/about", authMiddleware, async (req, res) => {
  try {
    const { description, skillset, tools } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      about: {
        description,
        skillset: skillset.split(","),
        tools: tools.split(","),
      },
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// Render Projects Form
app.get("/dashboard/projects", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("projects");
    res.render("home/projectsUpdateForm", { projects: user.projects });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add New Project
app.post(
  "/dashboard/projects",
  authMiddleware,
  upload.single("projectPhoto"),
  async (req, res) => {
    try {
      const { name, description, githubLink } = req.body;
      const photo = req.file?.path;

      // Validate required fields
      if (!photo || !name || !description || !githubLink) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Fetch user and validate required homepage fields
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (!user.homepage.portfolioName || !user.homepage.userName) {
        return res.status(400).json({
          message:
            "User homepage details (portfolioName and userName) are missing. Please update your profile.",
        });
      }

      // Add project to user's projects array
      user.projects.push({ photo, name, description, githubLink });
      await user.save();

      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error adding project:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  }
);

// Render Blogs Form
app.get("/dashboard/blogs", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("blogs");
    res.render("home/blogsUpdateForm", { blogs: user.blogs });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add New Blog
app.post("/dashboard/blogs", authMiddleware, async (req, res) => {
  try {
    const { topic, technology, title, description } = req.body;

    const user = await User.findById(req.user.id);
    user.blogs.push({ topic, technology, title, description });
    await user.save();

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Render Resume Update Form
app.get("/dashboard/resume", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("resume");
    res.render("home/resumeUpdateForm", { resume: user.resume });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Photo
app.post(
  "/dashboard/resume",
  authMiddleware,
  upload.single("resumePhoto"),
  async (req, res) => {
    try {
      // Validate the authenticated user
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Validate the uploaded file
      if (!req.file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }

      // Ensure the uploaded file is an image
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Invalid file type. Only images are allowed." });
      }

      // Construct the file path (ensure this matches your server's file-serving logic)
      const filePath = `/uploads/${req.file.filename}`;

      // Update the user record in the database
      await User.findByIdAndUpdate(req.user.id, {
        "resume.photoPath": filePath, // Update to reflect it's a photoPath
      });

      // Redirect to the dashboard resume page
      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error updating photo:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get('/dashboard/links', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch authenticated user
    const links = user.socialLinks.join(', '); // Convert array to comma-separated string

    // Render the EJS file and pass the socialLinks variable
    res.render('home/linksUpdateForm', { socialLinks: links });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/dashboard/links', authMiddleware, async (req, res) => {
  const { socialLinks } = req.body;

  try {
    const user = await User.findById(req.user.id); // Fetch authenticated user
    user.socialLinks = socialLinks.split(',').map(link => link.trim()); // Convert input to array
    await user.save();

    res.redirect('/dashboard'); // Redirect back to the form
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.get("/sample", authMiddleware, (req, res) => {
  res.render("sample");
});

app.get("/", (req, res) => {
  res.render("mainpage");
});
app.get("/update", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.render("update", { user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});


//frontend apis
app.get('/api/users', async (req, res) => {
  try {
    const { name } = req.query;
    const query = name ? { name: new RegExp(name, 'i') } : {};
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
// API route to fetch About data for a specific user
app.get("/api/users/:userId/about", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("about");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.about);
  } catch (error) {
    console.error("Error fetching About data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user data
    const user = await User.findById(userId).select("name email profilePhoto homepage.expertise");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Normalize profilePhoto
    if (user.profilePhoto && !user.profilePhoto.startsWith("http")) {
      user.profilePhoto = `http://localhost:5000/uploads/${path.basename(user.profilePhoto)}`;
    }

    // Build response object
    const profileData = {
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto,
      expertises: user?.homepage?.expertise || [],
    };

    // console.log("Profile Data:", profileData); // Debugging log
    res.json(profileData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Assuming you have a User model and Blog model
app.get("/api/users/:userId/blogs", async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Fetching the user and their blogs based on userId
    const user = await User.findById(userId).populate("blogs"); // Assuming blogs are referenced in the User model

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user exists, send the blogs as response
    res.json(user.blogs); 
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Assuming you have a User model and a Project model
app.get("/api/users/:userId/projects", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetching the user's projects based on the userId
    const user = await User.findById(userId).populate("projects"); // Assuming 'projects' is a reference in the User model

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's projects
    res.json(user.projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Assuming you have a User model and Resume model

app.get("/api/users/:userId/resume", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user's resume photoPath
    const user = await User.findById(userId).select("resume");

    // Log the original resume photo path for debugging
    console.log("Original resume photoPath:", user?.resume?.photoPath);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Normalize the resume photo path to a proper URL
    if (user.resume?.photoPath && !user.resume.photoPath.startsWith("http")) {
      // Use `path.basename` to ensure only the file name is appended to the URL
      user.resume.photoPath = `http://localhost:5000/uploads/${path.basename(user.resume.photoPath)}`;
    }

    // Log the normalized resume photo path for debugging
    console.log("Normalized resume photoPath:", user.resume?.photoPath);

    res.json({ resume: user.resume?.photoPath }); // Send the normalized resume path in the response
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/api/users/:userId/social-links", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("socialLinks");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send socialLinks directly as an array of strings
    res.json(user.socialLinks);
  } catch (error) {
    console.error("Error fetching social links:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//reputation route
app.post("/api/users/:userId/reputation", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { reputation: 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Reputation incremented", reputation: user.reputation });
  } catch (error) {
    console.error("Error incrementing reputation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

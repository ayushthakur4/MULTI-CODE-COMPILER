const User = require("../models/user.model");
const Project = require("../models/project.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to get startup code based on language
function getStartupCode(language) {
  if (language === 'python') {
    return 'print("Hello World")';
  } else if (language === 'java') {
    return 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }';
  } else if (language === 'javascript') {
    return 'console.log("Hello World");';
  } else if (language === 'cpp') {
    return '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello World" << endl;\n  return 0;\n}';
  } else if (language === 'c') {
    return '#include <stdio.h>\nint main() {\n  printf("Hello World\\n");\n  return 0;\n}';
  } else if (language === 'go') {
    return 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello World")\n}';
  } else if (language === 'bash') {
    return 'echo "Hello World"';
  } else {
    return '// Hello World';
  }
}

// =======================
// SIGN UP
// =======================
exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// SIGN IN (JWT)
// =======================
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// createProject controller
exports.createProject = async (req, res) => {
  try {

    let { name, projLanguage, token, version } = req.body;
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found"
      });
    };

    // Normalize language
    const lang = projLanguage ? projLanguage.toLowerCase() : '';

    let project = await Project.create({
      name: name,
      projectLanguage: lang,
      createdBy: user._id,
      code: getStartupCode(lang),
      version: version
    });


    return res.status(200).json({
      success: true,
      msg: "Project created successfully",
      projectId: project._id
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    })
  }
};

//save the project 
exports.saveProject = async (req, res) => {
  try {
    const { projectId, code, token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to save this project",
      });
    }

    project.code = code;
    await project.save();

    res.status(200).json({
      success: true,
      message: "Project saved successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get the projects
exports.getProjects = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    let projects = await Project.find({ createdBy: user._id });
    return res.status(200).json({
      success: true,
      projects: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}

//get single project
exports.getProject = async (req, res) => {
  try {
    const { projectId, token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to access this project",
      });
    }

    return res.status(200).json({
      success: true,
      project: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}
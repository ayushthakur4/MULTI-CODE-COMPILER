# 🚀 AI-COMP-GEN - Ultimate Online Compiler

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

**AI-COMP-GEN** is a powerful, **multi-language online compiler** designed for developers who value speed, simplicity, and efficiency. Experience a clutter-free coding environment with smooth authentication and robust project management features.

---

## ✨ Key Features

- **🌐 Multi-Language Support**: Write and save code in **Python, Java, JavaScript, C++, C, Go, and Bash**.
- **🚫 Ad-Free Experience**: Focus 100% on your code with zero distractions or annoying pop-ups.
- **🔐 Smooth Authentication**: Secure and seamless **Sign Up** and **Sign In** powered by JWT and bcrypt.
- **💾 Save & Track Projects**: Never lose your progress. Create, save, and manage your coding projects effortlessly.
- **⚡ detailed Startup Templates**: Instantly get started with ready-to-run "Hello World" templates for every supported language.

---

## 🛠️ Tech Stack

This project is built using a modern and robust technology stack:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Runtime environment |
| **Framework** | ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Web framework for Node.js |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | NoSQL database |
| **ODM** | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | Object Data Modeling for MongoDB |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | JSON Web Tokens for secure session management |

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ayushthakur4/AI-COMP-GEN.git
    cd AI-COMP-GEN
    ```

2.  **Navigate to the backend directory**
    ```bash
    cd backend
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Set up Environment Variables**
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5.  **Run the Server**
    ```bash
    # Development mode using nodemon
    npm run dev
    
    # Production mode
    npm start
    ```

    The server will start running on `http://localhost:3000`.

---

## 📡 API Endpoints

### 👤 Authentication

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/signUp` | Register a new user | `fullName`, `email`, `password` |
| `POST` | `/signIn` | Login existing user | `email`, `password` |

### 📂 Projects

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/createProject` | Create a new project | `name`, `projLanguage`, `token`, `version` |
| `POST` | `/saveProject` | Save code to a project | `projectId`, `code`, `token` |

---

## 🌟 Supported Languages

The platform currently supports creating and saving projects in:

*   🐍 **Python**
*   ☕ **Java**
*   📜 **JavaScript**
*   🚀 **C++**
*   💻 **C**
*   🐹 **Go**
*   🐚 **Bash**

---

## 🤝 Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Happy Coding!** 👩‍💻👨‍💻

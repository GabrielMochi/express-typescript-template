# Express TypeScript Template ![express icon](https://img.icons8.com/color/32/express-js.png) ![typescript icon](https://img.icons8.com/color/32/typescript.png)

A minimalist starter template for building scalable Node.js applications with **Express** and **TypeScript**.

## Features 🎯

This template includes the following technologies and libraries:

### Programming Language 💻

- **TypeScript**: Strongly typed JavaScript for better code quality and maintainability.

### Framework ⚡

- **Express**: Lightweight and flexible web framework for creating APIs and web applications.

### Code Linting and Styling 🧹

- **ESLint**: Enforces code quality and style guidelines.
- **Prettier**: Ensures consistent code formatting.

### Code Check Before Commit ✅

- **Husky**: Automates Git hooks for running checks before committing code.
- **Lint-Staged**: Runs linters on staged files to ensure only valid code is committed.

### Hot Reload 🔄

- **Nodemon**: Automatically restarts the server during development.

### Package Manager 📦

- **Yarn**: Fast, reliable, and secure dependency management.

### Environment Configuration 🌐

- **Convict**: Manages environment variables and configuration with validation and default values.

### Logging 📜

- **Pino**: High-performance logging library for structured and efficient logs.

### Security 🛡️

- **Helmet**: Enhances security by setting various HTTP headers.

### Request Validation and Error Handling 🚦

- **Boom**: Simplifies error handling with HTTP-friendly error objects.
- **Class-Validator**: Provides declarative validation for request data.

## Getting Started 🛠️

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Installation 📥

1. Clone the repository:

   ```bash
   git clone https://github.com/GabrielMochi/express-typescript-template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd express-typescript-template
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

### Running the Project 🚀

Start the development server with hot reload:

```bash
yarn dev
```

### Scripts 📜

- **`yarn dev`**: Start the server with hot reload.
- **`yarn lint`**: Run ESLint to check for code quality issues.
- **`yarn format`**: Format the code with Prettier.
- **`yarn build`**: Compile TypeScript into JavaScript.

## License 📄

This project is licensed under the [MIT License](LICENSE).

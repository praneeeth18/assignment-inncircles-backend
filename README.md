# InnCircles Assignment

This repository contains the backend application for the InnCircles Assignment built using Angular.

# System Admin Login

**Admin email**

    ```bash
    sysAdmin@gmail.com
    ```

**Admin password**

    ```bash
    Admin@007
    ```

## Prerequisites

The project is made using:

- Node.js (version 20.8.0)

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/praneeeth18/assignment-inncircles-backend.git

   ```

2. **Navigate to project directory:**

   ```bash
   cd assignment-inncircles-frontend

   ```

3. **Install the dependencies:**

   ```bash
   npm install

   ```

4. **Environment varibles(.env)**

   **DATABASE_URI**
   **LOCAL: You need to have mongodb installed in your local device. For example:**

   ```bash
   DATABASE_URI=mongodb://localhost:27017/Inncircles

   ```

   ATLAS: You need paste the string here. For example:

   ```bash
   DATABASE_URI=mongodb+srv://USERNAME:PASSWORD.gdxi0.mongodb.net/COLLECTIONNAME?retryWrites=true&w=majority&appName=Cluster0

   ```

   **ACCESS_TOKEN_SECRET=my-token**

   **REFRESH_TOKEN_SECRET=my-token**

   **PORT=3500**
   If you want to change the port for the application to run. Please remember I have set my port numbers to 3500 in the services of Angular application.

5. **Start the server**

   ```bash
   npm start
   ```

   **DEVELOPMENT**

   ```bash
   npm run dev
   ```

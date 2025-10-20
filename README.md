🧭 Next.js Admin Dashboard
📖 Overview

This project is a Next.js Admin Dashboard with full authentication system and protected routes.
Users must log in before accessing the dashboard.
If they don’t have an account, they can register, then log in to access the system.

Once logged in, users are redirected to the Admin Dashboard which displays an overview and product management features.

⚙️ Features
🔐 Authentication

Register / Login using API.

Authentication state managed via Redux Toolkit.

Protected Routes to prevent unauthorized access.

Uses localStorage (or can be switched to cookies) for session persistence.

🧭 Dashboard Pages
🏠 Home Page

Displays static overview data (users, sales, orders, and Revenues).

Includes a Chart.js line chart for data visualization.

Data is static due to lack of backend access.

📦 Products Page

Displays all products in a responsive table.

Includes:

Pagination

Filtering (by sold, stock, price)

Exporting options (📄 PDF, 📊 Excel)

Built with TailwindCSS for styling and ShadCN UI components.

🧰 State Management

Implemented using Redux Toolkit with:

authSlice for user authentication

productsSlice for fetching and managing products

⚡ Enhancements:

Add admin role management:

Admins can add, edit, or delete products.

Regular users can only view products.

🧩 Technologies Used
Technology Purpose
Next.js (v15) Framework for React and SSR
TailwindCSS Styling
Redux Toolkit State management
Chart.js Chart visualization
Axios API requests
XLSX & jsPDF Exporting data (Excel & PDF)
Docker Containerization for frontend
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/ibrahimeltbakh/Eyego-dashboard.git
cd dashboard-project

2️⃣ Install Dependencies
npm install

3️⃣ Run the Development Server
npm run dev

Then open:
👉 http://localhost:3000

🐳 Run with Docker
Build the Docker image
docker build -t my-next-dashboard .

Run the container
docker run -p 3000:3000 my-next-dashboard

Then open http://localhost:3000 in your browser.

🔐 Authentication Flow
Step Description
1 User opens the site → redirected to Login Page
2 If no account → redirect to Register Page
3 After registration → redirected back to Login Page
4 After successful login → redirected to Admin Dashboard
5 Protected routes check if a user exists in localStorage (or cookies) before access
🧮 Exports

Export products table to:

PDF

Excel Sheet

📊 Chart Overview

Displays Orders, Users, and Revenue statistics.

Responsive chart that adapts to screen size (mobile-friendly).

👨‍💻 Author

Ibrahim Samir Eltbakh
Frontend Developer — passionate about building clean, responsive dashboards with React & Next.js.


# 🚀 Tech Discovery  

**Tech Discovery** is an innovative platform inspired by **[Product Hunt](https://producthunt.com)**, allowing users to **discover, share, and engage** with the latest **tech products**. From web apps and AI tools to games and mobile applications, users can explore new releases, upvote products, leave reviews, and unlock premium features through subscriptions.  

The platform includes **role-based access control** for **Normal Users, Moderators, and Admins**, ensuring a well-structured and seamless experience.  

---

## 🌍 Live Demo  

🔗 **[Visit Tech Discovery](https://tech-discovery-auth.web.app) 🚀**  

---

## 📖 Project Overview  

Tech Discovery is designed to provide a **feature-rich** and **user-friendly** experience:  

✅ **Browse & Discover** new tech products across various categories.  
✅ **Upvote & Review** products, helping users identify trending innovations.  
✅ **Submit & Manage** products via an intuitive dashboard.  
✅ **Subscription-Based Features** for exclusive content and premium access.  
✅ **Secure Role-Based Access** ensuring proper moderation and user management.  

---

## ✨ Features  

### 👥 **User Roles & Permissions**  
- 🏷 **Normal Users:**  
  - Browse and upvote products.  
  - Submit new products for review.  
  - Post reviews and report inappropriate content.  
- 🛠 **Moderators:**  
  - Approve or reject product submissions.  
  - Manage reported products.  
  - Mark products as **"Featured"**.  
- 🔑 **Admins:**  
  - Manage user roles and permissions.  
  - Monitor platform activity through an analytics dashboard.  

### 🔥 **Core Functionalities**  
- 🔼 **Upvote System** – Users can upvote products (with restrictions based on role).  
- 📝 **Product Submission & Moderation** – A well-structured approval process.  
- ⚠️ **Report System** – Ensure product quality with a reporting feature.  
- 💳 **Membership Subscription** – Unlock premium features via a **payment gateway** integration.  

### 📌 **Interactive Pages**  
- 🏠 **Homepage:**  
  - 🎡 Featured Banner / Carousel  
  - 🌟 Trending Products Section  
  - 📜 Category-Based Product Browsing  
- 🏷 **Product Details Page:**  
  - 🛠️ Full Product Descriptions  
  - 🔼 Upvote & ⚠️ Report Functionality  
  - 💬 Review and Rating System  
- 🛠 **User Dashboard:**  
  - 👤 View & Edit Profile  
  - ➕ Add & Manage Products  
  - 📊 Admin Analytics & Moderation Panel  

### 🔑 **Authentication & Security**  
- 🔐 **JWT-Based Authentication** – Secure login and access control.  
- 🔑 **Firebase Authentication** – Social & email/password login.  
- 🏗 **Private Routes** – Secure access to protected pages and dashboards.  

### 📱 **Responsive Design**  
- **Optimized for Mobile, Tablet, and Desktop**  
- Smooth & modern **UI/UX** powered by **Tailwind CSS + DaisyUI**  

---

## 🛠️ Technology Stack  

| Layer         | Technology |
|--------------|-----------|
| **Frontend** | React.js, Tailwind CSS, DaisyUI |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose ORM) |
| **Authentication** | Firebase Authentication, JSON Web Tokens (JWT) |
| **Payment Integration** | Stripe |

---

## 📦 Notable NPM Packages  

| Package | Purpose |
|---------|---------|
| `axios` | Handle API requests seamlessly |
| `chart.js` & `react-chartjs-2` | Interactive analytics & data visualization |
| `firebase` | Authentication and backend services |
| `react-icons` | Beautiful, customizable icons |
| `react-router-dom` | Smooth page navigation |
| `react-rating` | Implement star-based rating system |
| `react-modal` | Accessible modal components |
| `react-slick` & `slick-carousel` | Advanced sliders and carousels |
| `sweetalert2` | Elegant alert pop-ups and notifications |
| `stripe` | Secure and fast payment processing |
| `jsonwebtoken (JWT)` | User authentication & security |

---

## 🚀 Getting Started  

### 📌 Prerequisites  
Before running the project, make sure you have:  
- 🟢 **Node.js** (v14+ recommended)  
- 📦 **npm** or **yarn** (latest version)  
- 🛢 **MongoDB** (Local setup or MongoDB Atlas)  

### 🏃‍♂️ Run the Project Locally  

#### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-repo-url.git
cd tech-discovery
```  

#### 2️⃣ Install Dependencies  
```bash
npm install
# or
yarn install
```  

#### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory and add:  

```ini
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
VITE_API_KEY=your-firebase-api-key
VITE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_PROJECT_ID=your-firebase-project-id
VITE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_APP_ID=your-firebase-app-id
```
🔐 **Ensure you add `.env` to `.gitignore` to keep credentials secure.**  

#### 4️⃣ Start Backend Server  
```bash
npm run server
```  

#### 5️⃣ Start Frontend Client  
```bash
npm run dev
```  

---

## 📖 API Documentation  

For a detailed guide on API endpoints, authentication flow, and data management, refer to the **[API Docs](#)** (update with actual link).  

---

## ❓ Troubleshooting  

If you encounter any issues:  
- 🔍 Check the **console/logs** for errors.  
- 📄 Ensure **environment variables** are correctly configured.  
- 🔄 Run `npm audit fix` to resolve package dependency issues.  
- 🔌 Ensure MongoDB is running and properly connected.  
- 📩 Reach out for support via **[GitHub Issues](#)**.  

---

## 🔥 Final Notes  

- **Security Best Practices:**  
  - **Never expose API keys** in the frontend.  
  - Use **environment variables** for sensitive information.  
  - Secure authentication with **JWT** and **bcrypt** for password hashing.  
- **Performance Optimization:**  
  - Implement **lazy loading** for images.  
  - Use **React Query** for efficient data fetching.  
  - Minify and compress assets for faster load times.  

---

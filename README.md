# 🚀 Tech Discovery – Explore & Share the Latest Tech Innovations  

**Tech Discovery** is a cutting-edge platform inspired by **[Product Hunt](https://producthunt.com)** that allows users to **discover, upvote, and review** the latest **tech products**. Whether it's AI tools, web apps, software, or games, users can engage with trending technologies, submit their own products, and access exclusive features through subscriptions.  

> **📌 Built with the MERN Stack** (MongoDB, Express.js, React.js, Node.js) and featuring **role-based access control** for **Users, Moderators, and Admins**.  

![Project Screenshot](https://i.ibb.co.com/238znTb9/Banner.png)  

---

## 🌍 Live Demo  

🔗 **[Visit Tech Discovery](https://tech-discovery-auth.web.app) 🚀** 

---

## 📖 Project Overview  

🔹 **Explore & Discover** new tech products in multiple categories.  
🔹 **Upvote & Review** products, helping users identify top-rated tools.  
🔹 **Submit & Manage** products via an intuitive dashboard.  
🔹 **Role-Based Access Control** ensuring moderation and user management.  
🔹 **Subscription-Based Premium Features** for exclusive content.  
🔹 **Secure Authentication & Payment System** integrated for a seamless experience.  


---

## ✨ Features  

### 👥 **User Roles & Permissions**  

#### 🏷 **Normal Users**  
✔ Browse & upvote products.  
✔ Submit new products for review.  
✔ Post reviews and report inappropriate content.  

#### 🛠 **Moderators**  
✔ Approve or reject submitted products.  
✔ Handle reported products.  
✔ Mark products as **"Featured"**.  

#### 🔑 **Admins**  
✔ Manage user roles & permissions.  
✔ Monitor platform activity via an **Admin Dashboard**.  
✔ Handle coupon management and site analytics.  

---

### 🔥 **Core Functionalities**  
✔ **🔼 Upvote System** – Users can upvote products once.  
✔ **📝 Product Submission & Review Process** – Moderators approve or reject.  
✔ **⚠️ Reporting System** – Users can flag inappropriate content.  
✔ **💳 Membership Subscription** – Premium features via **Stripe** integration.  
✔ **📊 Admin Analytics Dashboard** – Pie charts for product stats & user engagement.  

---

## 📌 Interactive Pages  

### 🏠 **Homepage**  
✔ 🎡 **Featured Products Section**  
✔ 🌟 **Trending Products Section** (sorted by vote count)  
✔ 📜 **Category-Based Product Browsing**  
✔ 📰 **Latest Tech News & Product Launches**  
✔ 🛠 **How It Works Section** (Guide for Users)  
✔ ⭐ **User Testimonials & Reviews**  
✔ ❓ **FAQ Section** (Commonly Asked Questions)  
✔ 📢 **Promotional Offers & Discounts**  

![Homepage Screenshot](https://i.ibb.co.com/DPZKf9RH/Home.png)  

---

### 📦 **Explore All Products Page**  
✔ 🔍 **Search & Filter Products by Tags**  
✔ 🏆 **Show Top Rated Products Option**  
✔ 📸 **High-Quality Product Thumbnails & Descriptions**  
✔ 📂 **Pagination for Better Navigation**  
✔ 💡 **Category & Tag Based Sorting**  
✔ 🔗 **Easy Access to Individual Product Pages**  

![All Products Screenshot](https://i.ibb.co.com/fYLK89Lh/All-products.png)  


### 🏷 **Product Details Page**  
✔ 🛠️ **Detailed Product Information**  
✔ 🔼 **Upvote & ⚠️ Report Functionality**  
✔ 💬 **Review & Rating System**  

![Product Details Screenshot](https://i.ibb.co.com/Fqb490pj/Details.png)  

### 🛠 **User Dashboard**  
✔ 👤 **View & Edit Profile**  
✔ ➕ **Add & Manage Products**  
✔ 📊 **Admin Analytics & Moderation Panel**  

![User Dashboard](https://i.ibb.co.com/r21m8jrQ/User-Dashboard.png)  

---

### 🛠 **Admin Dashboard**  
✔ 📊 **View Site Statistics**  
✔ 👥 **Manage Users**  
✔ 🎟 **Manage Coupons**  

![Admin Dashboard](https://i.ibb.co.com/TDsyNGLW/Admin.png)  

---

### 🛠 **Moderator Dashboard**  
✔ 🏷 **Review & Approve Products**  
✔ 🚀 **Feature Top Products**  
✔ ❌ **Reject Inappropriate Submissions**  
✔ 📊 **View Site Statistics**

![Moderator Dashboard](https://i.ibb.co.com/234qY1fZ/Moderator.png)  


---

## 🔑 **Authentication & Security**  

✔ **JWT-Based Authentication** – Secure login & protected routes.  
✔ **Firebase Authentication** – Social & email/password login.  
✔ **Environment Variables** – Hiding Firebase & MongoDB credentials.  

---

## 📱 **Responsive Design**  

✅ Fully optimized for **Mobile, Tablet, and Desktop**  
✅ Built with **Tailwind CSS + DaisyUI** for a modern, clean UI  


---

## 🛠️ Technology Stack  

| Layer         | Technology |
|--------------|-----------|
| **Frontend** | React.js, Tailwind CSS, DaisyUI |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Authentication** | Firebase, JSON Web Tokens (JWT) |
| **Payment Integration** | Stripe |

---

## 📦 Notable NPM Packages  

| Package | Purpose |
|---------|---------|
| `axios` | Handle API requests |
| `firebase` | Authentication & backend services |
| `react-router-dom` | Client-side routing |
| `jsonwebtoken (JWT)` | Secure user authentication |
| `react-icons` | UI enhancements |
| `sweetalert2` | Elegant alert pop-ups |
| `framer-motion` | Smooth animations |
| `chart.js` & `react-chartjs-2` | Admin dashboard analytics |
| `stripe` | Payment gateway integration |

---

## 🚀 Getting Started  

### 📌 Prerequisites  
Before running the project, ensure you have:  
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
Create a `.env` file and add:  

```ini
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
VITE_API_KEY=your-firebase-api-key
VITE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_PROJECT_ID=your-firebase-project-id
VITE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_APP_ID=your-firebase-app-id
```

🔐 **Ensure `.env` is added to `.gitignore` to protect credentials.**  

#### 4️⃣ Start Backend Server  
```bash
npm run server
```  

#### 5️⃣ Start Frontend Client  
```bash
npm run dev
```  

---

## ❓ Troubleshooting  

- 🔍 Check **console/logs** for errors.  
- 📄 Ensure **environment variables** are correctly configured.  
- 🔄 Run `npm audit fix` to resolve package dependency issues.  
- 🔌 Ensure MongoDB is running and properly connected.  
- 📩 Reach out via **[GitHub Issues](#)** for support.  

---

## 🔥 Final Notes  

- **Security Best Practices:**  
  - **Never expose API keys** in the frontend.  
  - Use **JWT & Firebase Authentication** for security.  
  - Implement **role-based access control** for admins & moderators.  
- **Performance Optimization:**  
  - Use **lazy loading** for images.  
  - Implement **pagination** for product listings.  

---
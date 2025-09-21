<h1 align="center">Spotify Clone</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

A full stack Spotify clone with modern features including music playback direct messaging Clerk authentication and Cloudinary storage. This project is open for contributions. If you are passionate about music apps or full stack development fork the repo and send a pull request.  
---

## Features
- User authentication and management with Clerk  
- Music upload and streaming with Cloudinary  
- Real time chat and direct messages between users  
- Spotify like playback controls with responsive UI  
- Admin dashboard for managing content  
- Modern UI with Tailwind CSS and shadcn/ui  

---

## Tech Stack
- **Frontend:** React Vite TypeScript Tailwind CSS shadcn/ui Clerk  
- **Backend:** Node.js Express MongoDB Mongoose Clerk  
- **Storage:** Cloudinary  
- **Other:** React Router Zustand Lucide Icons  

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Lincoln-Madaraka/spotify-clone.git
cd spotify-clone
cd backend
npm install
```
### 2. Create a .env file inside backend/ with:
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
ADMIN_EMAIL=your_admin_email
NODE_ENV=development

CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```
### 3. Run the backend:
```bash
npm run dev
```
### 4. Frontend setup
```bash
cd ../frontend
npm install
```
### 5. Create a .env file inside frontend/ with:
```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
### 6. Run the frontend:
```bash
npm run dev
```
### 7. Contributing
1. Fork the repository
2. Create a feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -m "Add new feature")
4. Push to your branch (git push origin feature-name)
5. Open a Pull Request

## 🔗 Links
- [Check out more on my website](https://hello-lincoln-prime.vercel.app/)  
- [Contact me](mailto:madarakalincoln48@gmail.com)

### License
All rights reserved © 2025

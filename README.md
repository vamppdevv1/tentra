# Tentra 🏕️

A full-stack campground listing and review platform where users can discover, create, and review campgrounds.

> Built while following [Colt Steele's Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) — this is my first full-stack project. I restyled the UI and added small tweaks along the way as I learned.

---

## Features

- **Campground CRUD** — Create, view, edit, and delete campgrounds
- **Image Upload** — Upload multiple images per campground via Cloudinary
- **Interactive Map** — Each campground displays its location on a MapTiler map
- **Reviews & Ratings** — Authenticated users can leave star ratings and reviews
- **Authentication** — Register, login, and logout with Passport.js
- **Authorization** — Only campground/review owners can edit or delete their content
- **Responsive Design** — Mobile-friendly UI built with Bootstrap 5

---

## Tech Stack

**Backend**
- Node.js & Express
- MongoDB & Mongoose
- Passport.js (authentication)
- Cloudinary (image storage)
- Multer (file uploads)
- EJS & ejs-mate (templating)

**Frontend**
- Bootstrap 5
- MapTiler SDK (maps)

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account
- MapTiler account

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/vamppdevv1/tentra.git
   cd tentra
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   MAPTILER_API_KEY=your_maptiler_key
   DB_URL=your_mongodb_url
   SECRET=your_session_secret
   ```

4. Run the app:
   ```bash
   node app.js
   ```

5. Open your browser at `http://localhost:3000`

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary API secret |
| `MAPTILER_API_KEY` | MapTiler API key for maps |
| `DB_URL` | MongoDB connection string |
| `SECRET` | Session secret key |

---

## Deployment

This app is deployed on **Vercel** with MongoDB Atlas as the database.

---

## Notes

This project is based on the **YelpCamp** project from Colt Steele's Web Developer Bootcamp. It has been restyled with a custom UI and small personal tweaks. It's my first full-stack project and a big part of my learning journey — still a work in progress!

---

## License

This project is open source and available under the [MIT License](LICENSE).

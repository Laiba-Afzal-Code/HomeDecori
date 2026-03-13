# Home Decorim

Home Decorim is a modern web application that helps users explore, design, and visualize beautiful home interiors. The platform provides tools for room decoration ideas, AI-assisted design suggestions, and blog content about home decor and interior design trends.

The goal of Home Decorim is to make interior design inspiration and tools accessible for everyone—from homeowners looking for ideas to designers showcasing creative concepts.

---

## Features

### AI Room Design Tool

Users can generate interior design concepts by uploading room images or describing their desired style.

### Image Editing Tools

Built-in image editing features allow users to:

* Convert image formats
* Compress images
* Resize images
* Edit visual elements before downloading

### Blog Platform

The platform includes a blog system where users can write and submit blog posts about:

* Interior design
* Home decoration ideas
* Furniture styling
* Design tips

Submitted blogs are sent to the admin for review before publication.

### Responsive Modern UI

The interface is built with a modern, clean design that works across desktops, tablets, and mobile devices.

### Admin Moderation

Admins can review blog submissions and approve or reject them before they appear publicly.

---

## Tech Stack

### Frontend

* React
* CSS / Modern UI styling
* Axios for API communication

### Backend

* Node.js
* Express.js
* REST API architecture

### Database

* MongoDB

### Additional Tools

* Multer for file uploads
* Nodemailer for email notifications
* Markdown / Rich text blog editor

---

## Project Structure

frontend

* components
* pages
* routes
* styles

backend

* controllers
* routes
* middleware
* uploads
* server.js

---

## Installation

### 1. Clone the repository

git clone https://github.com/Laiba-Afzal-Code/HomeDecori.git

### 2. Install dependencies

Frontend

cd frontend
npm install

Backend

cd backend
npm install

### 3. Start the development servers

Backend

npm run dev

Frontend

npm start

---

## Environment Variables

Create a `.env` file in the backend directory.

Example:

PORT=5000
EMAIL_USER=[your-email@gmail.com](mailto:homedecorimlaiba@gmail.com)
EMAIL_PASS=your-app-password
MONGO_URI=your-mongodb-connection

---

## Future Improvements

* AI powered room layout generator
* 3D interior visualization
* User profiles
* Blog comments and likes
* Saved design collections
* Dark mode interface

---

## Contribution

Contributions are welcome. If you would like to improve Home Decorim, feel free to fork the repository and submit a pull request.

---

## License

This project is open source and available under the MIT License.

---

## Author

Developed by Laiba Afzal.

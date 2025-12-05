# Ayush Khati - Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience as a Full Stack Developer.

## 🚀 Features

- **Hero Section** with animated particle background and gradient effects
- **About Section** with professional profile and statistics
- **Projects Showcase** featuring:
  - Fluentra - Real-time Language Exchange Platform
  - Full Stack Realtime Chat App
  - And more projects
- **Skills Section** displaying technical expertise
- **Contact Form** with functional backend that sends emails
- **Responsive Design** optimized for all devices
- **Modern UI** with glass-morphism effects and smooth animations

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express** - Server framework
- **Nodemailer** - Email handling
- **CORS** - Cross-origin requests
- **Rate Limiting** - API protection

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/AyushkhatiDev/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:8080`

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Add your Gmail App Password to .env
# EMAIL_PASS=your_gmail_app_password

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

## 📧 Contact Form Configuration

To enable the contact form:

1. Generate a Gmail App Password:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Go to https://myaccount.google.com/apppasswords
   - Create an app password for "Mail"

2. Add credentials to `server/.env`:
   ```
   EMAIL_USER=ayushiskhati305@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

## 🚀 Deployment

### Frontend
Can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Render

### Backend
Can be deployed to:
- Render
- Railway
- Heroku
- DigitalOcean

**Important:** Update the API endpoint in `ContactSection.tsx` when deploying to production.

## 📱 Connect With Me

- **Email:** ayushiskhati305@gmail.com
- **Location:** Siliguri, West Bengal
- **Phone:** +91 9134808008
- **GitHub:** [AyushkhatiDev](https://github.com/AyushkhatiDev)

## 👨‍💻 About Me

Currently working as a **Junior Software Developer** at [Udeck IT Services Private Limited](https://www.udeckservices.com/)

Full Stack Developer with 3+ years of experience, passionate about creating beautiful, performant, and user-centric digital experiences.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for performance and user experience.

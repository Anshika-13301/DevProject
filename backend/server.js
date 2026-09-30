const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/user');
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Internship = require('./models/Internship'); 

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/internships', require('./routes/internshipRoutes'));

// Connect to MongoDB & Seed Admin
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully');

    // Admin Account Auto Creation
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword
      });
      console.log('👤 Admin user created successfully');
    }

    // Default Seed Projects if DB is empty
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany([
        {
          title: 'BlogStack — Full-Stack Blogging Platform',
          description: 'Developed a responsive full-stack blogging web app with real-time category filtering, keyword search, and newsletter integration.',
          techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT'],
          liveDemoUrl: 'https://blog-stack-gamma.vercel.app/',
          githubUrl: 'https://github.com/Anshika-13301'
        },
        {
          title: 'NovaStore — Modern MERN E-Commerce',
          description: 'Architected a feature-rich full-stack e-commerce web application with dynamic product cataloging, cart management, and payment processing.',
          techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux Toolkit', 'Tailwind CSS'],
          liveDemoUrl: 'https://ai-code-reviewer-three-phi.vercel.app/',
          githubUrl: 'https://github.com/Anshika-13301'
        }
      ]);
      console.log('📦 Initial projects seeded');
    }
  })
  .catch((err) => console.error('❌ Database Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
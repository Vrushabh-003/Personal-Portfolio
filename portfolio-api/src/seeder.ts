import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import Project from './models/Project';
import User from './models/User';

dotenv.config();

const projectsData = [
    {
        title: "Student Feedback System",
        description: "A web-based platform to collect and manage student feedback on faculty and courses. Built to enhance transparency and streamline institutional improvement through structured data collection and reporting.",
        technologies: ["React.js", "Supabase", "HTML", "CSS", "Bootstrap", "JavaScript", "SQL", "Node.js", "Express.js"],
        liveUrl: "https://siesgstfeedback.netlify.app",
        repoUrl: "#",
        imageUrl: "https://via.placeholder.com/400x250/1a202c/ffffff?text=Feedback+System"
    },
    {
        title: "AI Security System",
        description: "An AI-powered security system featuring real-time facial recognition and automatic number plate recognition (ANPR). Includes visitor/vehicle registration, an admin dashboard, and alert mechanisms using OpenCV and CNNs.",
        technologies: ["SQL", "ANPR", "OpenCV", "CNN", "OCR", "Streamlit"],
        repoUrl: "#",
        imageUrl: "https://via.placeholder.com/400x250/1a202c/ffffff?text=AI+Security"
    },
    {
        title: "FinUp – Invest Smarter, Simpler",
        description: "A mobile-first UI/UX design created for the HeyTheo AI-Native Investing Challenge. Designed for Gen Z users to demystify investing through interactive simulations and real-time AI analysis.",
        technologies: ["Figma", "Notion"],
        liveUrl: "#",
        repoUrl: "#",
        imageUrl: "https://via.placeholder.com/400x250/1a202c/ffffff?text=FinUp+App"
    },
    {
        title: "AccidentLens Dashboard",
        description: "A dynamic Power BI dashboard to visualize and analyze over 300,000 road accident records, uncovering trends in severity, timing, and weather impact. Developed for the IISc CiSTUP Data Analysis Internship challenge.",
        technologies: ["Power BI", "Power Query", "DAX", "Excel"],
        repoUrl: "#",
        imageUrl: "https://via.placeholder.com/400x250/1a202c/ffffff?text=AccidentLens"
    },
    {
        title: "Facial Expression Detection",
        description: "A machine learning model for recognizing human emotions using facial expressions. Utilizes CNNs with TensorFlow and Keras for accurate emotion classification and supports real-time inference.",
        technologies: ["Python", "CNN", "TensorFlow", "Keras"],
        repoUrl: "#",
        imageUrl: "https://via.placeholder.com/400x250/1a202c/ffffff?text=Emotion+AI"
    },
    {
        title: "Home Energy Monitoring System (HEMS)",
        description: "An embedded IoT system for tracking real-time energy consumption in homes. Data collected via Arduino is processed using Python and stored in MySQL with a web interface.",
        technologies: ["Arduino", "C", "Python", "PHP", "MySQL"],
        repoUrl: "#",
        imageUrl: "https://via.placeholder.com/400x250/1a202c/ffffff?text=HEMS"
    }
];

const importData = async () => {
    await connectDB();
    try {
        await Project.deleteMany();
        await User.deleteMany();

        await Project.insertMany(projectsData);
        
        await User.create({
            email: 'your-email@example.com', // Change this to your real email for login
            password: 'yoursecurepassword'   // Change this to a secure password
        });

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

importData();
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-8">
            <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
                <div className="flex justify-center gap-6 mb-4">
                    <a href="#" aria-label="GitHub" className="text-2xl hover:text-primary transition-colors">
                        <FaGithub />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="text-2xl hover:text-primary transition-colors">
                        <FaLinkedin />
                    </a>
                    {/* Add other social links here */}
                </div>
                <p>&copy; {currentYear} Vrushabh Shirke. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
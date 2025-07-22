import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimatedSection from '../common/AnimatedSection';
import ProjectCard from '../common/ProjectCard';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl: string;
}

const ProjectsSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // IMPORTANT: Make sure your backend API is running on localhost:5000
                const { data } = await axios.get('http://localhost:5000/api/projects');
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <AnimatedSection id="projects" className="py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-12">My Work & Projects</h2>
            {loading ? (
                <p className="text-center">Loading Projects...</p>
            ) : (
                <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </AnimatedSection>
    );
};

export default ProjectsSection;
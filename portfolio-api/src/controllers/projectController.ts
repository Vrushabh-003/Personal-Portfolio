// src/controllers/projectController.ts
import { Request, Response } from 'express';
import Project from '../models/Project';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req: Request, res: Response) => {
  const { title, description, technologies, liveUrl, repoUrl, imageUrl } = req.body;
  try {
    const project = new Project({ title, description, technologies, liveUrl, repoUrl, imageUrl });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    console.error('ERROR in createProject:', error) // Added for better logging
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req: Request, res: Response) => {
  const { title, description, technologies, liveUrl, repoUrl, imageUrl } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = title;
      project.description = description;
      project.technologies = technologies;
      project.liveUrl = liveUrl;
      project.repoUrl = repoUrl;
      project.imageUrl = imageUrl;
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
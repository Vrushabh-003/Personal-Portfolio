// portfolio-api/src/controllers/projectController.ts
import { Request, Response } from 'express';
import Project from '../models/Project';

// GET all projects. Supports pagination, but returns ALL projects by default if no limit is set.
export const getProjects = async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 0; // Default to 0 (no limit)
  const page = parseInt(req.query.page as string) || 1;
  
  try {
    const count = await Project.countDocuments();
    let query = Project.find().sort({ displayOrder: 1 });

    // THE FIX: Only apply limit and skip if a limit is provided in the query
    if (limit > 0) {
      query = query.limit(limit).skip(limit * (page - 1));
    }

    const projects = await query;
    res.json({ projects, page, pages: limit > 0 ? Math.ceil(count / limit) : 1 });
  } catch (error) { 
    res.status(500).json({ message: 'Server Error' }); 
  }
};

// GET all projects for admin, sorted by displayOrder
export const getAllProjectsForAdmin = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1 });
    res.json(projects);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// GET a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) { res.json(project); } else { res.status(404).json({ message: 'Project not found' }); }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// CREATE a project, setting initial displayOrder
export const createProject = async (req: Request, res: Response) => {
  try {
    const count = await Project.countDocuments();
    const project = new Project({ ...req.body, displayOrder: count });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error: any) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    res.status(500).json({ message: 'Server Error' });
  }
};

// UPDATE a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      Object.assign(project, req.body);
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else { res.status(404).json({ message: 'Project not found' }); }
  } catch (error: any) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: 'Validation Error', errors: error.errors });
    res.status(500).json({ message: 'Server Error' });
  }
};

// DELETE a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) { await project.deleteOne(); res.json({ message: 'Project removed' }); } else { res.status(404).json({ message: 'Project not found' }); }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// REORDER projects
export const reorderProjects = async (req: Request, res: Response) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id: string, index: number) => ({
      updateOne: { filter: { _id: id }, update: { $set: { displayOrder: index } } },
    }));
    await Project.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Projects reordered successfully' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
// src/controllers/experienceController.ts
import { Request, Response } from 'express';
import Experience from '../models/Experience';

// This file will contain full CRUD logic similar to your other controllers.
// GET all, GET by ID, CREATE, UPDATE, DELETE.
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) res.json(experience);
    else res.status(404).json({ message: 'Experience not found' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const newExperience = new Experience(req.body);
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      Object.assign(experience, req.body);
      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await experience.deleteOne();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
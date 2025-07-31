// src/controllers/experienceController.ts
import { Request, Response } from 'express';
import Experience from '../models/Experience';

// GET all experiences, sorted by displayOrder
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ displayOrder: 1 });
    res.json(experiences);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// GET a single experience by ID
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) res.json(experience);
    else res.status(404).json({ message: 'Experience not found' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// CREATE a new experience, setting initial displayOrder
export const createExperience = async (req: Request, res: Response) => {
  try {
    const count = await Experience.countDocuments();
    const newExperience = new Experience({
      ...req.body,
      displayOrder: count
    });
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// UPDATE an experience
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

// DELETE an experience
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

// REORDER experiences
export const reorderExperiences = async (req: Request, res: Response) => {
    const { orderedIds } = req.body;
    try {
        const bulkOps = orderedIds.map((id: string, index: number) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { displayOrder: index } },
            },
        }));
        await Experience.bulkWrite(bulkOps);
        res.status(200).json({ message: 'Experiences reordered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
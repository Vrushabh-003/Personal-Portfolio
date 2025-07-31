// src/controllers/achievementController.ts
import { Request, Response } from 'express';
import Achievement from '../models/Achievement';

// GET all achievements, sorted by displayOrder
export const getAchievements = async (req: Request, res: Response) => {
    try {
        const achievements = await Achievement.find().sort({ displayOrder: 1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// GET a single achievement by ID
export const getAchievementById = async (req: Request, res: Response) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (achievement) {
            res.json(achievement);
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// CREATE a new achievement, setting initial displayOrder
export const createAchievement = async (req: Request, res: Response) => {
    try {
        const count = await Achievement.countDocuments();
        const newAchievement = new Achievement({
            ...req.body,
            displayOrder: count
        });
        const savedAchievement = await newAchievement.save();
        res.status(201).json(savedAchievement);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// UPDATE an achievement
export const updateAchievement = async (req: Request, res: Response) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (achievement) {
            Object.assign(achievement, req.body);
            const updatedAchievement = await achievement.save();
            res.json(updatedAchievement);
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// DELETE an achievement
export const deleteAchievement = async (req: Request, res: Response) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (achievement) {
            await achievement.deleteOne();
            res.json({ message: 'Achievement removed' });
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// REORDER achievements
export const reorderAchievements = async (req: Request, res: Response) => {
    const { orderedIds } = req.body;
    try {
        const bulkOps = orderedIds.map((id: string, index: number) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { displayOrder: index } },
            },
        }));
        await Achievement.bulkWrite(bulkOps);
        res.status(200).json({ message: 'Achievements reordered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

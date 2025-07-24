// src/controllers/achievementController.ts
import { Request, Response } from 'express';
import Achievement from '../models/Achievement';

export const getAchievements = async (req: Request, res: Response) => {
    try {
        const achievements = await Achievement.find().sort({ date: -1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

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

export const createAchievement = async (req: Request, res: Response) => {
    try {
        const newAchievement = new Achievement(req.body);
        const savedAchievement = await newAchievement.save();
        res.status(201).json(savedAchievement);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

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
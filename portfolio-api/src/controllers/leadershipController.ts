// portfolio-api/src/controllers/leadershipController.ts
import { Request, Response } from 'express';
import Leadership from '../models/Leadership';

// GET all leadership roles, sorted by displayOrder
export const getLeadershipRoles = async (req: Request, res: Response) => {
    try {
        const leadershipRoles = await Leadership.find().sort({ displayOrder: 1 });
        res.json(leadershipRoles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// CREATE a new leadership role
export const createLeadershipRole = async (req: Request, res: Response) => {
    try {
        const count = await Leadership.countDocuments();
        const newLeadershipRole = new Leadership({
            ...req.body,
            displayOrder: count
        });
        const savedLeadershipRole = await newLeadershipRole.save();
        res.status(201).json(savedLeadershipRole);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// GET a single leadership role by ID
export const getLeadershipRoleById = async (req: Request, res: Response) => {
    try {
        const leadershipRole = await Leadership.findById(req.params.id);
        if (leadershipRole) {
            res.json(leadershipRole);
        } else {
            res.status(404).json({ message: 'Leadership role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// UPDATE a leadership role
export const updateLeadershipRole = async (req: Request, res: Response) => {
    try {
        const leadershipRole = await Leadership.findById(req.params.id);
        if (leadershipRole) {
            Object.assign(leadershipRole, req.body);
            const updatedLeadershipRole = await leadershipRole.save();
            res.json(updatedLeadershipRole);
        } else {
            res.status(404).json({ message: 'Leadership role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// DELETE a leadership role
export const deleteLeadershipRole = async (req: Request, res: Response) => {
    try {
        const leadershipRole = await Leadership.findById(req.params.id);
        if (leadershipRole) {
            await leadershipRole.deleteOne();
            res.json({ message: 'Leadership role removed' });
        } else {
            res.status(404).json({ message: 'Leadership role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// REORDER leadership roles
export const reorderLeadershipRoles = async (req: Request, res: Response) => {
    const { orderedIds } = req.body;
    try {
        const bulkOps = orderedIds.map((id: string, index: number) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { displayOrder: index } },
            },
        }));
        await Leadership.bulkWrite(bulkOps);
        res.status(200).json({ message: 'Leadership roles reordered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
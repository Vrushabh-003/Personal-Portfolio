import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      // Call the next middleware
      return next();

    } catch (error) {
      console.error(error);
      // Use return to stop execution after sending the response
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // This part will now only be reached if the 'if' condition is false
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

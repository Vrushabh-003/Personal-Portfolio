// src/controllers/blogController.ts
import { Request, Response } from 'express';
import Blog from '../models/Blog';

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -

// GET all blog posts, sorted by displayOrder
export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ displayOrder: 1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
    
// GET a single blog post by ID (for admin editing)
export const getBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// GET a single blog post by slug
export const getBlogBySlug = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// CREATE a new blog post, setting initial displayOrder
export const createBlog = async (req: Request, res: Response) => {
    const { title, content, imageUrl } = req.body;
    try {
        const count = await Blog.countDocuments();
        const newBlog = new Blog({
            title,
            content,
            imageUrl,
            slug: slugify(title),
            displayOrder: count,
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// UPDATE a blog post
export const updateBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.title = req.body.title || blog.title;
            blog.content = req.body.content || blog.content;
            blog.imageUrl = req.body.imageUrl || blog.imageUrl;
            blog.slug = slugify(req.body.title || blog.title);
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// DELETE a blog post
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await blog.deleteOne();
            res.json({ message: 'Blog post removed' });
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// REORDER blog posts
export const reorderBlogs = async (req: Request, res: Response) => {
    const { orderedIds } = req.body;
    try {
        const bulkOps = orderedIds.map((id: string, index: number) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { displayOrder: index } },
            },
        }));
        await Blog.bulkWrite(bulkOps);
        res.status(200).json({ message: 'Blogs reordered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

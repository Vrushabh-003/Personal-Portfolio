// src/types.ts

// This file defines the "shape" of the data we get from our API.

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
}

export interface Achievement {
  _id:string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}
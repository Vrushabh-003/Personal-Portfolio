// src/types.ts

// This file defines the "shape" of the data we get from our API.

export interface Media {
  url: string;
  type: 'image' | 'video';
  _id?: string; // Mongoose might add an _id to subdocuments
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  media: Media[];
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

export interface Experience {
  _id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
}
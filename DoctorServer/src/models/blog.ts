import mongoose, { Schema, Document } from 'mongoose';
import db from '../config/mongodb';

interface Blog {
    title: string,
    imageUrl: string,
    doctorId: string,
    doctorName: string,
    doctorUrl: string,
    content: string
}

interface BlogDocument extends Blog, Document { }

const BlogSchema = new Schema<BlogDocument>({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorUrl: {
        type: String,
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const BlogModel = db.model<BlogDocument>('Blog', BlogSchema)

export { Blog, BlogDocument, BlogModel }
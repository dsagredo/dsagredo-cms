import { useState } from 'react';
import { Tag } from '../types';

export interface PortfolioFormData {
    title: string;
    content: string;
    coverImage: string;
    demoLink: string;
    githubLink: string;
    selectedTags: Tag[];
    isPublished: boolean;
}

export const usePortfolioForm = (initialData?: Partial<PortfolioFormData>) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [demoLink, setDemoLink] = useState(initialData?.demoLink || '');
    const [githubLink, setGithubLink] = useState(initialData?.githubLink || '');
    const [selectedTags, setSelectedTags] = useState<Tag[]>(initialData?.selectedTags || []);
    const [isPublished, setIsPublished] = useState(initialData?.isPublished || false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const resetForm = () => {
        setTitle('');
        setContent('');
        setCoverImage('');
        setDemoLink('');
        setGithubLink('');
        setSelectedTags([]);
        setIsPublished(false);
    };

    const setFormData = (data: Partial<PortfolioFormData>) => {
        if (data.title !== undefined) setTitle(data.title);
        if (data.content !== undefined) setContent(data.content);
        if (data.coverImage !== undefined) setCoverImage(data.coverImage);
        if (data.demoLink !== undefined) setDemoLink(data.demoLink);
        if (data.githubLink !== undefined) setGithubLink(data.githubLink);
        if (data.selectedTags !== undefined) setSelectedTags(data.selectedTags);
        if (data.isPublished !== undefined) setIsPublished(data.isPublished);
    };

    const getFormData = (): PortfolioFormData => ({
        title,
        content,
        coverImage,
        demoLink,
        githubLink,
        selectedTags,
        isPublished,
    });

    return {
        title,
        setTitle,
        content,
        setContent,
        coverImage,
        setCoverImage,
        demoLink,
        setDemoLink,
        githubLink,
        setGithubLink,
        selectedTags,
        setSelectedTags,
        isPublished,
        setIsPublished,
        isSubmitting,
        setIsSubmitting,
        resetForm,
        setFormData,
        getFormData,
    };
};

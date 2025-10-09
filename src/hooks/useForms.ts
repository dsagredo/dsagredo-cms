import { useState } from 'react';
import { TagsT } from '../types';

export interface PortfolioFormData {
    title: string;
    content: string;
    coverImage: string;
    demoLink: string;
    githubLink: string;
    selectedTags: TagsT[];
    isPublished: boolean;
}

export const useForms = (initialData?: Partial<PortfolioFormData>) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [demoLink, setDemoLink] = useState(initialData?.demoLink || '');
    const [githubLink, setGithubLink] = useState(initialData?.githubLink || '');
    const [selectedTags, setSelectedTags] = useState<TagsT[]>(
        initialData?.selectedTags || []
    );
    const [isPublished, setIsPublished] = useState(
        initialData?.isPublished || false
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setFormData = (data: Partial<PortfolioFormData>): void => {
        if (data.title !== undefined) setTitle(data.title);
        if (data.content !== undefined) setContent(data.content);
        if (data.coverImage !== undefined) setCoverImage(data.coverImage);
        if (data.demoLink !== undefined) setDemoLink(data.demoLink);
        if (data.githubLink !== undefined) setGithubLink(data.githubLink);
        if (data.selectedTags !== undefined) setSelectedTags(data.selectedTags);
        if (data.isPublished !== undefined) setIsPublished(data.isPublished);
    };

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
        setFormData,
    };
};

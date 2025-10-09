import { useState, KeyboardEvent, FC, ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { TagsT } from '../types';

interface TagT {
    selectedTags: TagsT[];
    availableTags: TagsT[];
    onTagsChange: (value: TagsT[]) => void;
    disabled?: boolean;
}

const Tags: FC<TagT> = ({
    selectedTags,
    availableTags,
    onTagsChange,
    disabled = false,
}: TagT): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const unselectedTags = availableTags.filter(
        (tag: TagsT): boolean =>
            !selectedTags.find(
                (selected: TagsT): boolean => selected.id === tag.id
            )
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
            const newTags = selectedTags.slice(0, -1);
            onTagsChange(newTags);
        }
    };

    const handleTagSelect = (tag: TagsT): void => {
        onTagsChange([...selectedTags, tag]);
        setInputValue('');
        setIsDropdownOpen(false);
    };

    const handleTagRemove = (tagToRemove: TagsT): void => {
        const newTags = selectedTags.filter(
            (tag: TagsT): boolean => tag.id !== tagToRemove.id
        );
        onTagsChange(newTags);
    };

    const filteredTags = unselectedTags.filter((tag: TagsT): boolean =>
        tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="relative">
            <div
                className={`flex flex-wrap gap-2 p-2 border rounded-md ${
                    disabled ? 'bg-gray-50' : 'bg-white'
                }`}
            >
                {selectedTags.map(
                    (tag: TagsT): JSX.Element => (
                        <span
                            key={tag.id}
                            className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-sm"
                        >
                            {tag.name}
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={(): void => handleTagRemove(tag)}
                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </span>
                    )
                )}
                {!disabled && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                            setInputValue(e.target.value);
                            setIsDropdownOpen(true);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={(): void => setIsDropdownOpen(true)}
                        placeholder={
                            selectedTags.length === 0 ? 'Add tags...' : ''
                        }
                        className="outline-none border-none bg-transparent flex-1 min-w-[120px]"
                    />
                )}
            </div>

            {isDropdownOpen && inputValue && filteredTags.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-auto">
                    {filteredTags.map(
                        (tag: TagsT): JSX.Element => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={(): void => handleTagSelect(tag)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                            >
                                {tag.name}
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Tags;

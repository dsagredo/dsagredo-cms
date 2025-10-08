import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import Button from './ui/Button';

interface PortfolioFormHeaderProps {
    title: string;
    onSave: () => void;
    isSubmitting: boolean;
    saveButtonText?: string;
}

const PortfolioFormHeader: FC<PortfolioFormHeaderProps> = ({
    title,
    onSave,
    isSubmitting,
    saveButtonText = 'Guardar',
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>

            <div className="flex space-x-3">
                <Button
                    className="bg-white"
                    variant="outline"
                    leftIcon={<X size={16} />}
                    onClick={() => navigate('/portfolio')}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    leftIcon={<Save size={16} />}
                    onClick={onSave}
                    isLoading={isSubmitting}
                >
                    {saveButtonText}
                </Button>
            </div>
        </div>
    );
};

export default PortfolioFormHeader;

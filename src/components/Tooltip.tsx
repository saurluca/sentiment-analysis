import { useState, useRef, useEffect } from "react";

type TooltipProps = {
    content: React.ReactNode;
};

const Tooltip = ({ content }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={tooltipRef}>
            <button 
                onClick={() => setIsVisible(!isVisible)}
                className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-500 hover:text-gray-700 hover:border-gray-600 focus:outline-none"
                aria-label="Show sentiment analysis explanation"
            >
                ?
            </button>
            {isVisible && (
                <div className="absolute z-10 w-80 p-4 mt-2 -right-2 text-sm bg-white rounded-md shadow-lg border border-gray-200">
                    {content}
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        aria-label="Close explanation"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tooltip; 
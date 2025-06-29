import React from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import type { Experience } from '../types/resume';

interface ExperienceSectionProps {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<Experience>) => void;
  onRemove: (id: string) => void;
  onEnhance: (section: string, content: string) => Promise<string>;
  isEnhancing: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onAdd,
  onUpdate,
  onRemove,
  onEnhance,
  isEnhancing
}) => {
  const handleEnhanceDescription = async (id: string, description: string) => {
    if (description) {
      const enhanced = await onEnhance('experience', description);
      onUpdate(id, { description: enhanced });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </button>
      </div>
      
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Experience #{index + 1}
              </h3>
              <button
                onClick={() => onRemove(experience.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => onUpdate(experience.id, { company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) => onUpdate(experience.id, { position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Job title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => onUpdate(experience.id, { startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="space-y-2">
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => onUpdate(experience.id, { endDate: e.target.value })}
                    disabled={experience.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100"
                  />
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) => onUpdate(experience.id, { 
                        current: e.target.checked,
                        endDate: e.target.checked ? '' : experience.endDate
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Current position</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <button
                  onClick={() => handleEnhanceDescription(experience.id, experience.description)}
                  disabled={isEnhancing || !experience.description}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Sparkles className="mr-1 h-4 w-4" />
                  {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                </button>
              </div>
              <textarea
                value={experience.description}
                onChange={(e) => onUpdate(experience.id, { description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Describe your key responsibilities, achievements, and impact in this role..."
              />
            </div>
          </div>
        ))}
        
        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
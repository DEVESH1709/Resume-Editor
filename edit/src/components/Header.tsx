import React from 'react';
import { FileText, Upload, Save, Download, Eye } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
  onSave: () => void;
  onDownload: () => void;
  onLoadSample: () => void;
  isSaving: boolean;
  lastSaved?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onUploadClick,
  onSave,
  onDownload,
  onLoadSample,
  isSaving,
  lastSaved
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onLoadSample}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Eye className="mr-2 h-4 w-4" />
              Load Sample
            </button>
            
            <button
              onClick={onUploadClick}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </button>
            
            <button
              onClick={onSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Resume'}
            </button>
            
            <button
              onClick={onDownload}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Download JSON
            </button>
          </div>
        </div>
        
        {lastSaved && (
          <div className="text-xs text-gray-500 text-center pb-2">
            Last saved: {new Date(lastSaved).toLocaleString()}
          </div>
        )}
      </div>
    </header>
  );
};
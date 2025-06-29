import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { PersonalInfoSection } from './components/PersonallinfoSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { useResume } from './hooks/useResume';

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const {
    resume,
    isSaving,
    isEnhancing,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    enhanceSection,
    saveResume,
    downloadResume,
    loadMockResume,
    setResume
  } = useResume();

  const handleFileUpload = (file: File) => {
    // Mock parsing - in production, this would parse the actual file
    loadMockResume();
    setShowUpload(false);
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        Resume uploaded and parsed successfully!
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const handleSave = async () => {
    const success = await saveResume();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-3 rounded z-50 ${
      success 
        ? 'bg-green-100 border border-green-400 text-green-700' 
        : 'bg-red-100 border border-red-400 text-red-700'
    }`;
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          ${success 
            ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>'
            : '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>'
          }
        </svg>
        ${success ? 'Resume saved successfully!' : 'Failed to save resume. Backend may be offline.'}
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onUploadClick={() => setShowUpload(true)}
        onSave={handleSave}
        onDownload={downloadResume}
        onLoadSample={loadMockResume}
        isSaving={isSaving}
        lastSaved={resume.lastModified}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <PersonalInfoSection
            personalInfo={resume.personalInfo}
            onUpdate={updatePersonalInfo}
            onEnhance={enhanceSection}
            isEnhancing={isEnhancing === 'summary'}
          />
          
          <ExperienceSection
            experiences={resume.experiences}
            onAdd={addExperience}
            onUpdate={updateExperience}
            onRemove={removeExperience}
            onEnhance={enhanceSection}
            isEnhancing={isEnhancing === 'experience'}
          />
          
          <EducationSection
            education={resume.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />
          
          <SkillsSection
            skills={resume.skills}
            onAdd={addSkill}
            onUpdate={updateSkill}
            onRemove={removeSkill}
          />
        </div>
      </main>
      
      {showUpload && (
        <FileUpload
          onFileUpload={handleFileUpload}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}

export default App;
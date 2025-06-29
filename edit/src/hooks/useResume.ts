import { useState, useCallback } from 'react';
import type { Resume, PersonalInfo, Experience, Education, Skill } from '../types/resume';

const initialPersonalInfo: PersonalInfo = {
  name: '',
  email: '',
  phone: '',
  location: '',
  summary: ''
};

const initialResume: Resume = {
  personalInfo: initialPersonalInfo,
  experiences: [],
  education: [],
  skills: [],
  lastModified: new Date().toISOString()
};

export const useResume = () => {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [isSaving, setIsSaving] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
      lastModified: new Date().toISOString()
    }));
  }, []);

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    };
    setResume(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
      lastModified: new Date().toISOString()
    }));
  }, []);

  const updateExperience = useCallback((id: string, updates: Partial<Experience>) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, ...updates } : exp
      ),
      lastModified: new Date().toISOString()
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
      lastModified: new Date().toISOString()
    }));
  }, []);

  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
      lastModified: new Date().toISOString()
    }));
  }, []);

  const updateEducation = useCallback((id: string, updates: Partial<Education>) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...updates } : edu
      ),
      lastModified: new Date().toISOString()
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
      lastModified: new Date().toISOString()
    }));
  }, []);

  const addSkill = useCallback(() => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
      lastModified: new Date().toISOString()
    }));
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...updates } : skill
      ),
      lastModified: new Date().toISOString()
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
      lastModified: new Date().toISOString()
    }));
  }, []);

  const enhanceSection = useCallback(async (section: string, content: string) => {
    setIsEnhancing(section);
    try {
      const response = await fetch('http://localhost:8000/ai-enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to enhance content');
      }
      
      const data = await response.json();
      return data.enhancedContent;
    } catch (error) {
      console.error('Enhancement failed:', error);
      // Fallback mock enhancement
      return `Enhanced: ${content} (AI enhancement temporarily unavailable)`;
    } finally {
      setIsEnhancing(null);
    }
  }, []);

  const saveResume = useCallback(async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:8000/save-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save resume');
      }
      
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [resume]);

  const downloadResume = useCallback(() => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `resume_${resume.personalInfo.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [resume]);

  const loadMockResume = useCallback(() => {
    const mockResume: Resume = {
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        summary: 'Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and mentoring junior developers.'
      },
      experiences: [
        {
          id: '1',
          company: 'Tech Solutions Inc.',
          position: 'Senior Software Developer',
          startDate: '2021-01',
          endDate: '',
          current: true,
          description: 'Lead development of React-based web applications serving 100k+ users. Implemented microservices architecture using Node.js and AWS. Mentored 3 junior developers and reduced deployment time by 40%.'
        },
        {
          id: '2',
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          startDate: '2019-06',
          endDate: '2020-12',
          current: false,
          description: 'Built responsive web applications using React and Express.js. Collaborated with UX team to improve user engagement by 25%. Integrated third-party APIs and payment systems.'
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2015-09',
          endDate: '2019-05',
          gpa: '3.7'
        }
      ],
      skills: [
        { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming' },
        { id: '2', name: 'React', level: 'Expert', category: 'Frontend' },
        { id: '3', name: 'Node.js', level: 'Advanced', category: 'Backend' },
        { id: '4', name: 'AWS', level: 'Intermediate', category: 'Cloud' },
        { id: '5', name: 'MongoDB', level: 'Advanced', category: 'Database' }
      ],
      lastModified: new Date().toISOString()
    };
    setResume(mockResume);
  }, []);

  return {
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
  };
};
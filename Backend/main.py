from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import json
import os
from datetime import datetime

app = FastAPI(title="Resume Editor API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class AIEnhanceResponse(BaseModel):
    enhancedContent: str

class PersonalInfo(BaseModel):
    name: str
    email: str
    phone: str
    location: str
    summary: str

class Experience(BaseModel):
    id: str
    company: str
    position: str
    startDate: str
    endDate: str
    description: str
    current: bool

class Education(BaseModel):
    id: str
    institution: str
    degree: str
    field: str
    startDate: str
    endDate: str
    gpa: Optional[str] = None

class Skill(BaseModel):
    id: str
    name: str
    level: str
    category: str

class Resume(BaseModel):
    personalInfo: PersonalInfo
    experiences: List[Experience]
    education: List[Education]
    skills: List[Skill]
    lastModified: str

# In-memory storage (in production, use a proper database)
stored_resumes: Dict[str, Resume] = {}

@app.get("/")
async def root():
    return {"message": "Resume Editor API is running!"}

@app.post("/ai-enhance", response_model=AIEnhanceResponse)
async def enhance_content(request: AIEnhanceRequest):
    """
    Mock AI enhancement endpoint. In production, this would integrate with
    actual AI services like OpenAI, Anthropic, or similar.
    """
    
    # Mock enhancement based on section type
    enhanced_content = ""
    
    if request.section == "summary":
        enhanced_content = f"""Enhanced Professional Summary: {request.content}

Key improvements made:
• Strengthened action verbs and impact statements
• Added quantifiable achievements where applicable  
• Optimized for ATS (Applicant Tracking Systems)
• Enhanced industry-specific keywords
• Improved overall flow and readability

This enhanced version better showcases your unique value proposition and professional brand."""

    elif request.section == "experience":
        enhanced_content = f"""Enhanced Experience Description:

{request.content}

AI Enhancements Applied:
• Transformed passive descriptions into active accomplishments
• Added specific metrics and quantifiable results
• Incorporated relevant industry keywords
• Emphasized leadership and collaboration skills
• Structured content using the STAR method (Situation, Task, Action, Result)
• Highlighted transferable skills and career progression

This enhanced version better demonstrates your impact and career growth trajectory."""

    else:
        enhanced_content = f"AI-Enhanced Content: {request.content}\n\nThis content has been optimized for impact, clarity, and ATS compatibility. Key improvements include stronger action verbs, quantifiable achievements, and industry-relevant keywords."

    return AIEnhanceResponse(enhancedContent=enhanced_content)

@app.post("/save-resume")
async def save_resume(resume: Resume):
    """
    Save resume to storage. In production, this would save to a database
    with proper user authentication and data persistence.
    """
    
    try:
        # Generate a unique ID based on name and timestamp
        resume_id = f"{resume.personalInfo.name.replace(' ', '_')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Update last modified timestamp
        resume.lastModified = datetime.now().isoformat()
        
        # Store in memory (in production, save to database)
        stored_resumes[resume_id] = resume
        
        # Also save to file for persistence across server restarts
        os.makedirs("data", exist_ok=True)
        with open(f"data/{resume_id}.json", "w") as f:
            json.dump(resume.dict(), f, indent=2)
        
        return {
            "message": "Resume saved successfully",
            "resumeId": resume_id,
            "timestamp": resume.lastModified
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save resume: {str(e)}")

@app.get("/resumes")
async def get_all_resumes():
    """
    Get all stored resumes. In production, this would be paginated
    and filtered by authenticated user.
    """
    return {
        "resumes": list(stored_resumes.keys()),
        "count": len(stored_resumes)
    }

@app.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    """
    Get a specific resume by ID.
    """
    if resume_id not in stored_resumes:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return stored_resumes[resume_id]

@app.delete("/resume/{resume_id}")
async def delete_resume(resume_id: str):
    """
    Delete a specific resume by ID.
    """
    if resume_id not in stored_resumes:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    # Remove from memory
    del stored_resumes[resume_id]
    
    # Remove file if it exists
    file_path = f"data/{resume_id}.json"
    if os.path.exists(file_path):
        os.remove(file_path)
    
    return {"message": "Resume deleted successfully"}

@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "stored_resumes_count": len(stored_resumes)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
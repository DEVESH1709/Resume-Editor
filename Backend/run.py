
"""
Development server runner for the Resume Editor API.
"""

import uvicorn
import os

if __name__ == "__main__":
 
    port = int(os.environ.get("PORT", 8000))
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,  
        log_level="info"
    )
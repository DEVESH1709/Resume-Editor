# Resume Editor

A professional web-based resume editor with AI enhancement capabilities. Built with React, TypeScript, Tailwind CSS, and FastAPI.

## Features

### Frontend (React + TypeScript + Tailwind CSS)
- **Modern File Upload**: Drag-and-drop interface for PDF/DOCX files with visual feedback
- **Comprehensive Resume Editing**: 
  - Personal information management
  - Work experience with current position tracking
  - Education history with GPA support
  - Skills categorization with proficiency levels
- **AI Enhancement**: Improve resume sections with mock AI backend integration
- **Data Persistence**: Save resumes to backend and download as JSON
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Beautiful UI**: Professional design with smooth animations and micro-interactions
- **Real-time Validation**: Form validation with visual feedback

### Backend (Python FastAPI)
- **AI Enhancement API**: Mock AI service to improve resume content with realistic responses
- **Resume Storage**: Save and retrieve resume data with file persistence
- **RESTful API**: Clean, documented API endpoints with automatic OpenAPI docs
- **CORS Support**: Configured for seamless frontend integration
- **Health Monitoring**: Built-in health check endpoints

## 🛠️ Setup Instructions

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Python** (version 3.8 or higher) - [Download here](https://python.org/)
- **npm** (comes with Node.js)

### Frontend Setup

1. **Navigate to the project root directory**
   ```bash
   cd resume-editor
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser and go to: http://localhost:5173
   - The application will automatically reload when you make changes

### Backend Setup

1. **Open a new terminal and navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Create a Python virtual environment** (recommended)
   ```bash
   # On macOS/Linux:
   python3 -m venv venv
   source venv/bin/activate

   # On Windows:
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server**
   ```bash
   python run.py
   ```
   
   **Alternative method using uvicorn directly:**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Verify the backend is running**
   - API: http://localhost:8000
   - Interactive API docs: http://localhost:8000/docs
   - Alternative docs: http://localhost:8000/redoc

## 🔧 Development Commands

### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend Commands
```bash
# Activate virtual environment (if not already active)
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start development server with auto-reload
python run.py

# Start server with uvicorn directly
uvicorn main:app --reload

# Deactivate virtual environment
deactivate
```

## API Endpoints

### AI Enhancement
- **POST** `/ai-enhance`
  - **Description**: Enhance resume section content with AI
  - **Request Body**: 
    ```json
    {
      "section": "summary",
      "content": "Your content here..."
    }
    ```
  - **Response**: 
    ```json
    {
      "enhancedContent": "AI-improved content..."
    }
    ```

### Resume Management  
- **POST** `/save-resume`
  - **Description**: Save complete resume data
  - **Request Body**: Complete resume JSON object
  - **Response**: Success message with resume ID

- **GET** `/resumes`
  - **Description**: List all saved resumes
  - **Response**: Array of resume IDs

- **GET** `/resume/{id}`
  - **Description**: Get specific resume by ID
  - **Response**: Complete resume data

- **DELETE** `/resume/{id}`
  - **Description**: Delete specific resume
  - **Response**: Success confirmation

### Utility Endpoints
- **GET** `/`
  - **Description**: API status check
  
- **GET** `/health`
  - **Description**: Detailed health check with metrics

## How to Use

1. **Start the Application**
   - Follow the setup instructions above
   - Ensure both frontend (port 5173) and backend (port 8000) are running

2. **Load Sample Data**
   - Click "Load Sample" to populate the form with example data
   - This helps you understand the expected data format

3. **Upload Resume** (Mock Feature)
   - Click "Upload Resume" to open the file upload dialog
   - Drag and drop a PDF or DOCX file (parsing is mocked)
   - Sample data will be loaded to simulate file parsing

4. **Edit Resume Sections**
   - **Personal Info**: Fill in name, email, phone, location, and summary
   - **Experience**: Add work history with descriptions
   - **Education**: Add educational background
   - **Skills**: Categorize skills with proficiency levels

5. **AI Enhancement**
   - Click "Enhance with AI" buttons next to summary and experience descriptions
   - The backend will return improved, professional content
   - Review and edit the enhanced content as needed

6. **Save and Download**
   - Click "Save Resume" to store data on the backend
   - Click "Download JSON" to export your resume data
   - Check the browser console for save confirmations

## Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with subtle animations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Loading states, success/error notifications
- **Form Validation**: Real-time validation with helpful error messages

## 🔧 Technical Details

### Frontend Technologies
- **React 18+**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons

### Backend Technologies
- **FastAPI**: Modern, fast Python web framework
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: Lightning-fast ASGI server
- **CORS Middleware**: Cross-origin resource sharing support

### Development Features
- **Hot Reload**: Both frontend and backend support hot reloading
- **Type Safety**: Full TypeScript coverage on frontend
- **API Documentation**: Automatic OpenAPI/Swagger documentation
- **Error Handling**: Comprehensive error handling and user feedback

## Production Deployment

For production deployment, consider these enhancements:

### Frontend
- Build the React app: `npm run build`
- Deploy the `dist` folder to a static hosting service (Netlify, Vercel, etc.)
- Configure environment variables for API endpoints

### Backend
- Use a production ASGI server like Gunicorn with Uvicorn workers
- Implement proper database storage (PostgreSQL, MongoDB)
- Add authentication and authorization
- Set up proper logging and monitoring
- Configure HTTPS and security headers

### Recommended Production Stack
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: AWS EC2, Google Cloud Run, or Heroku
- **Database**: PostgreSQL, MongoDB Atlas
- **Monitoring**: Sentry, DataDog, or New Relic

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## Troubleshooting

### Common Issues

**Frontend won't start:**
- Ensure Node.js version 16+ is installed
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is already in use

**Backend won't start:**
- Ensure Python 3.8+ is installed
- Activate the virtual environment before installing dependencies
- Check if port 8000 is already in use

**CORS errors:**
- Ensure the backend is running on port 8000
- Check that CORS middleware is properly configured
- Verify the frontend is making requests to the correct backend URL

**AI Enhancement not working:**
- Check browser console for error messages
- Ensure the backend `/ai-enhance` endpoint is accessible
- Verify the request format matches the expected schema

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Check the backend terminal for server logs
3. Ensure both servers are running on the correct ports
4. Verify all dependencies are installed correctly

---

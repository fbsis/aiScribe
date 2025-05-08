# Lime Medical - Project Planning

## 1. Database Setup
### Initial Data Seeding
- Seed database with 2-3 sample patients
- Include patient data:
  - Name
  - Date of Birth
  - ID
  - Other relevant information

## 2. Core Features

### 2.1 Note Creation
#### Frontend Form Requirements
- Patient selection from existing records
- Input methods:
  - Audio file upload
  - Free text input
- Submit functionality for:
  - Audio transcription
  - AI summary generation

### 2.2 AI Processing
#### Services Integration
- OpenAI/Whisper integration for:
  - Audio-to-text transcription
  - Optional note structuring (SOAP format)
- Data storage:
  - Raw transcription
  - Processed output

### 2.3 Note Management
#### Listing View
- Display all notes with:
  - Patient name
  - Date/time
  - Note preview
#### Detailed View
- Full transcription/summary
- Patient metadata display
  - Sidebar or adjacent panel layout

## 3. Technical Architecture

### 3.1 Backend
- Technology Stack:
  - Node.js
  - TypeScript
  - Express (or similar framework)
- API Design:
  - REST or GraphQL implementation

### 3.2 Frontend
- Technology Options:
  - React (preferred)
  - Alternative: Plain HTML/CSS + JavaScript
- Minimal UI requirements

### 3.3 Data Storage
- PostgreSQL database for:
  - Patient records
  - Medical notes
  - Related metadata

## 4. Deployment

### 4.1 Development Environment
- Local development setup
- Dockerized configuration (preferred)

### 4.2 Cloud Integration (Optional)
- AWS services:
  - S3 for audio file storage
  - Other cloud services as needed

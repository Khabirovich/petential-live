# PETential - Pet Breed Matching App

A modern web application that helps users find the perfect pet breed match through an intelligent quiz system.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, and Radix UI components
- **Backend**: Flask API with CORS support for cross-origin requests
- **Data**: JSON files for breed information and quiz questions
- **APIs**: Integration with Dog API, Cat API, and OpenAI for breed descriptions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Frontend dependencies
npm install --legacy-peer-deps

# Backend dependencies  
python3 -m pip install -r requirements.txt
```

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API keys:
DOG_API_KEY=your_actual_dog_api_key
CAT_API_KEY=your_actual_cat_api_key
OPENAI_API_KEY=your_actual_openai_api_key
```

### 3. Run the Application

```bash
# Run both frontend and backend together
npm run dev:full

# Or run separately:
# Terminal 1 - Backend (Flask API)
python3 app.py

# Terminal 2 - Frontend (Next.js)
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── quiz/              # Quiz page
│   ├── results/           # Results page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── quiz/             # Quiz-specific components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── data/                 # JSON data files
├── app.py               # Flask backend API
└── requirements.txt     # Python dependencies
```

## 🔌 API Endpoints

### Quiz Endpoints
- `POST /api/quiz/start/{pet_type}` - Start new quiz session
- `GET /api/question/{index}` - Get specific question
- `POST /api/submit_answer` - Submit quiz answer
- `GET /api/results` - Get quiz results

### Breed Information
- `GET /api/breed/{pet_type}/{breed_name}` - Get detailed breed info

### Utility
- `GET /api/health` - Health check
- `POST /api/feedback` - Submit user feedback

## 🛠️ Development

### Frontend Development
The frontend uses modern React patterns with:
- TypeScript for type safety
- Custom hooks for state management
- Radix UI for accessible components
- Tailwind CSS for styling

### Backend Development
The Flask API provides:
- RESTful endpoints
- Session management for quiz state
- Integration with external APIs
- CORS support for frontend communication

## 🔧 Troubleshooting

### Common Issues

1. **Python command not found**
   - Use `python3` instead of `python`
   - Ensure Python 3.11+ is installed

2. **npm install fails**
   - Use `--legacy-peer-deps` flag
   - Clear npm cache: `npm cache clean --force`

3. **API keys not working**
   - Ensure `.env` file is in project root
   - Check API key validity on respective platforms

4. **CORS errors**
   - Ensure Flask backend is running on port 5001
   - Check CORS configuration in `app.py`

## 📝 Features

- ✅ Interactive quiz system for dogs and cats
- ✅ Intelligent breed matching algorithm
- ✅ Real-time breed images from external APIs
- ✅ AI-generated breed descriptions
- ✅ Responsive design for all devices
- ✅ Accessibility-compliant components
- ✅ Session-based quiz state management
- ✅ Admin panel for user data management
- ✅ Contact form and newsletter signup
- ✅ Bilingual support (English/Spanish)

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
```

### Backend (Railway)
```bash
# Procfile already configured for deployment
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

## 🌐 Live Site

Visit **[petential.es](https://petential.es)** to see the live application!

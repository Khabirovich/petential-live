from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json
import os
import pandas as pd
import requests
from dotenv import load_dotenv
import openai
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize Flask app as API only
app = Flask(__name__)
app.secret_key = os.urandom(24)

# Enable CORS for Next.js frontend
allowed_origins = [
    "http://localhost:3000",  # Local development
    "https://petential-live.vercel.app",  # Your Vercel domain
    "https://*.vercel.app",  # Any Vercel subdomain
    "https://petential.es",  # Main domain
    "https://www.petential.es"
]

# Add Railway environment variable for frontend URL if available
frontend_url = os.getenv('FRONTEND_URL')
if frontend_url:
    allowed_origins.append(frontend_url)

CORS(app, origins=allowed_origins, supports_credentials=True)

# API Keys
DOG_API_KEY = os.getenv('DOG_API_KEY')
CAT_API_KEY = os.getenv('CAT_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# OpenRouter API configuration
OPENROUTER_API_KEY = os.getenv('OPENAI_API_KEY')  # Using the same env var for OpenRouter

# Load questions and breed data
def load_data():
    try:
        with open('data/questions.json', 'r', encoding='utf-8') as f:
            dog_questions = json.load(f)
            print(f"Loaded {len(dog_questions)} dog questions")
            
            # All questions should now have proper object format answers
            valid_dog_questions = []
            for q in dog_questions:
                if 'answers' in q and q['answers'] and isinstance(q['answers'], dict):
                    valid_dog_questions.append(q)
                    print(f"✅ Using question: {q['question']}")
                else:
                    print(f"⚠️ Skipping invalid question: {q.get('question', 'Unknown')}")
            
            dog_questions = valid_dog_questions
            print(f"Using {len(dog_questions)} valid dog questions")
            
    except Exception as e:
        print(f"Error loading dog questions: {e}")
        dog_questions = []
    
    try:
        with open('data/questions_cats.json', 'r', encoding='utf-8') as f:
            cat_questions = json.load(f)
            print(f"Loaded {len(cat_questions)} cat questions")
            
            # Filter to only use questions that have proper object format answers
            valid_cat_questions = []
            for q in cat_questions:
                if 'answers' in q and q['answers']:
                    if isinstance(q['answers'], dict):
                        # Already has proper format
                        valid_cat_questions.append(q)
                        print(f"✅ Using cat question with object answers: {q['question']}")
                    elif isinstance(q['answers'], list):
                        # Skip array format questions for now
                        print(f"⚠️ Skipping cat array format question: {q['question']}")
                        continue
                else:
                    print(f"⚠️ Skipping cat question without answers: {q.get('question', 'Unknown')}")
            
            cat_questions = valid_cat_questions
            print(f"Using {len(cat_questions)} valid cat questions")
            
    except Exception as e:
        print(f"Error loading cat questions: {e}")
        cat_questions = []
    
    try:
        with open('data/breeds.json', 'r', encoding='utf-8') as f:
            dog_breeds = json.load(f)
            print(f"Loaded {len(dog_breeds)} dog breeds")
    except Exception as e:
        print(f"Error loading dog breeds: {e}")
        dog_breeds = []
    
    try:
        with open('data/cats_breeds.json', 'r', encoding='utf-8') as f:
            cat_breeds = json.load(f)
            print(f"Loaded {len(cat_breeds)} cat breeds")
    except Exception as e:
        print(f"Error loading cat breeds: {e}")
        cat_breeds = []
    
    try:
        mappings = pd.read_csv('data/Mapping .csv', sep=';')
        print(f"Loaded mappings with {len(mappings)} rows")
    except Exception as e:
        print(f"Error loading mappings: {e}")
        mappings = pd.DataFrame()
    
    return dog_questions, cat_questions, dog_breeds, cat_breeds, mappings

# API Routes
@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Flask API is running! 🐕🐱"}), 200

@app.route('/api/debug/data')
def debug_data():
    """Debug endpoint to check data loading"""
    dog_questions, cat_questions, dog_breeds, cat_breeds, mappings = load_data()
    
    return jsonify({
        'dog_questions_count': len(dog_questions),
        'cat_questions_count': len(cat_questions),
        'dog_breeds_count': len(dog_breeds),
        'cat_breeds_count': len(cat_breeds),
        'mappings_count': len(mappings) if not mappings.empty else 0,
        'sample_dog_question': dog_questions[0] if dog_questions else None,
        'sample_cat_question': cat_questions[0] if cat_questions else None,
        'sample_dog_breed': dog_breeds[0] if dog_breeds else None,
        'sample_cat_breed': cat_breeds[0] if cat_breeds else None
    }), 200

@app.route('/api/debug/images')
def debug_images():
    """Debug endpoint to test image fetching"""
    # Test dog image
    dog_image = get_dog_image("Golden Retriever")
    cat_image = get_cat_image("Persian")
    
    return jsonify({
        'dog_api_key_set': bool(DOG_API_KEY),
        'cat_api_key_set': bool(CAT_API_KEY),
        'test_dog_image': dog_image,
        'test_cat_image': cat_image
    }), 200

@app.route('/api/debug/breed/<pet_type>/<breed_name>')
def debug_breed_data(pet_type, breed_name):
    """Debug endpoint to see raw breed data"""
    language = request.args.get('lang', 'en')
    
    # Get breed data
    _, _, dog_breeds, cat_breeds, _ = load_data()
    breeds = dog_breeds if pet_type == 'dog' else cat_breeds
    breed_key = 'Dog Breeds' if pet_type == 'dog' else 'Cat Breeds'
    breed_data = next((b for b in breeds if b.get(breed_key) == breed_name), None)
    
    if not breed_data:
        return jsonify({'error': 'Breed not found'}), 404
    
    # Show original and translated data
    original_data = breed_data.copy()
    translated_data = translate_breed_characteristics(breed_data) if language == 'es' else breed_data
    
    return jsonify({
        'pet_type': pet_type,
        'breed_name': breed_name,
        'language': language,
        'original_keys': list(original_data.keys()),
        'translated_keys': list(translated_data.keys()) if language == 'es' else 'Not translated (English)',
        'original_data': original_data,
        'translated_data': translated_data if language == 'es' else 'Not translated'
    }), 200

@app.route('/api/debug/openai')
def debug_openai():
    """Debug endpoint to test OpenRouter connection"""
    try:
        print(f"Testing OpenRouter with API key: {OPENROUTER_API_KEY[:20]}...")
        
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "PETential - Pet Breed Matcher",
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "model": "openai/gpt-4o",
                "messages": [
                    {"role": "user", "content": "Say hello in one sentence."}
                ],
                "max_tokens": 50
            })
        )
        
        if response.status_code == 200:
            result = response.json()
            return jsonify({
                'openrouter_api_key_set': bool(OPENROUTER_API_KEY),
                'test_response': result['choices'][0]['message']['content'].strip(),
                'status': 'success'
            }), 200
        else:
            return jsonify({
                'openrouter_api_key_set': bool(OPENROUTER_API_KEY),
                'error': f"HTTP {response.status_code}: {response.text}",
                'status': 'error'
            }), 500
        
    except Exception as e:
        print(f"OpenRouter test error: {e}")
        return jsonify({
            'openrouter_api_key_set': bool(OPENROUTER_API_KEY),
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/breed-image/<pet_type>/<breed_name>', methods=['GET'])
def get_breed_image(pet_type, breed_name):
    """Get a single breed image"""
    if pet_type not in ['dog', 'cat']:
        return jsonify({'error': 'Invalid pet type'}), 400
    
    try:
        if pet_type == 'dog':
            image_url = get_dog_image(breed_name)
        else:
            image_url = get_cat_image(breed_name)
        
        return jsonify({'image': image_url}), 200
    except Exception as e:
        print(f"Error getting {pet_type} image for {breed_name}: {e}")
        fallback_image = (
            'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=face'
            if pet_type == 'dog' else
            'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=face'
        )
        return jsonify({'image': fallback_image}), 200

@app.route('/api/quiz/start/<pet_type>', methods=['POST'])
def start_quiz(pet_type):
    """Start a new quiz session"""
    if pet_type not in ['dog', 'cat']:
        return jsonify({'error': 'Invalid pet type'}), 400
    
    session['pet_type'] = pet_type
    session['current_question'] = 0
    session['answers'] = []
    
    # Load appropriate questions
    dog_questions, cat_questions, _, _, _ = load_data()
    questions = dog_questions if pet_type == 'dog' else cat_questions
    
    if not questions:
        return jsonify({'error': 'No questions available'}), 500
    
    print(f"Starting {pet_type} quiz with {len(questions)} questions")
    print(f"First question: {questions[0]}")
    
    return jsonify({
        'pet_type': pet_type,
        'total_questions': len(questions),
        'first_question': questions[0]
    }), 200

@app.route('/api/question/<int:question_index>', methods=['GET'])
def get_question(question_index):
    pet_type = session.get('pet_type')
    
    # Load appropriate questions
    dog_questions, cat_questions, _, _, _ = load_data()
    questions = dog_questions if pet_type == 'dog' else cat_questions
    
    if question_index >= len(questions) or question_index < 0:
        return jsonify({'error': 'Question index out of range'})
    
    # Get the question
    question = questions[question_index].copy()  # Make a copy to avoid modifying original
    print(f"Loading question {question_index}: {question}")
    
    # Ensure the question has proper answers format
    if 'answers' not in question or not question['answers']:
        print(f"Question {question_index} missing answers, adding defaults")
        question['answers'] = {
            "Very Low": 1, 
            "Low": 2, 
            "Average": 3, 
            "High": 4, 
            "Very High": 5
        }
    else:
        # If answers is an array, convert to object with sequential weights
        if isinstance(question['answers'], list):
            print(f"Converting array answers to object for question {question_index}")
            answers_array = question['answers']
            question['answers'] = {answer: index + 1 for index, answer in enumerate(answers_array)}
    
    print(f"Final question data: {question}")
    
    return jsonify({
        'question': question,
        'current_question': question_index,
        'total_questions': len(questions)
    })

@app.route('/api/submit_answer', methods=['POST'])
def submit_answer():
    data = request.json
    print(f"Received answer: {data}")  # Debug print
    session['answers'].append(data)
    
    # Update current question index
    current_question = session.get('current_question', 0) + 1
    session['current_question'] = current_question
    
    # Check if quiz is complete
    pet_type = session.get('pet_type')
    dog_questions, cat_questions, _, _, _ = load_data()
    questions = dog_questions if pet_type == 'dog' else cat_questions
    
    if current_question >= len(questions):
        # Quiz complete, redirect to results
        return jsonify({'status': 'complete'})
    
    return jsonify({'status': 'next', 'next_question': current_question})

@app.route('/api/results', methods=['GET'])
def get_results():
    """Get quiz results"""
    # Get user answers and pet type
    pet_type = session.get('pet_type')
    answers = session.get('answers', [])
    
    if not pet_type or not answers:
        return jsonify({'error': 'No quiz session found'}), 400
    
    # Load data
    dog_questions, cat_questions, dog_breeds, cat_breeds, mappings = load_data()
    
    # Process answers and calculate breed scores
    breed_scores = calculate_breed_scores(pet_type, answers, dog_breeds, cat_breeds, mappings)
    
    # Sort breeds by score in descending order
    breed_scores.sort(key=lambda x: x['score'], reverse=True)
    
    # Take only top 9 breeds
    breed_scores = breed_scores[:9]
    
    # Get breed images
    for breed in breed_scores:
        if pet_type == 'dog':
            breed['image'] = get_dog_image(breed['name'])
        else:
            breed['image'] = get_cat_image(breed['name'])
    
    return jsonify({
        'pet_type': pet_type,
        'breeds': breed_scores,
        'high_match': breed_scores[:3],
        'medium_match': breed_scores[3:6],
        'low_match': breed_scores[6:9]
    }), 200

@app.route('/api/breed/<pet_type>/<breed_name>', methods=['GET'])
def get_breed_details(pet_type, breed_name):
    """Get detailed breed information"""
    # Get language from query parameter or header
    language = request.args.get('lang', 'en')  # Default to English
    print(f"🌐 API Request - Pet: {pet_type}, Breed: {breed_name}, Language: {language}")
    print(f"📋 Query params: {dict(request.args)}")
    
    # Get breed data
    _, _, dog_breeds, cat_breeds, _ = load_data()
    
    breeds = dog_breeds if pet_type == 'dog' else cat_breeds
    breed_data = next((b for b in breeds if b.get('Dog Breeds' if pet_type == 'dog' else 'Cat Breeds') == breed_name), None)
    
    if not breed_data:
        return jsonify({'error': 'Breed not found'}), 404
    
    # Get breed image (1 image for display)
    if pet_type == 'dog':
        image = get_dog_image(breed_name)
    else:
        image = get_cat_image(breed_name)
    
    images = [image]  # Keep as array for compatibility
    
    # Generate breed description using OpenAI with language support
    description = generate_breed_description(breed_name, pet_type, language)
    
    # Translate breed characteristics if Spanish
    if language == 'es':
        print(f"🔄 Translating breed characteristics to Spanish")
        print(f"📋 All original keys: {list(breed_data.keys())}")
        breed_data = translate_breed_characteristics(breed_data)
        print(f"📋 All translated keys: {list(breed_data.keys())}")
        
        # Debug: Show numeric characteristics that would be displayed
        numeric_chars = {k: v for k, v in breed_data.items() if isinstance(v, (int, float)) and k not in ['Dog Breeds', 'Cat Breeds']}
        print(f"🔢 Numeric characteristics for display: {list(numeric_chars.keys())}")
    else:
        print(f"🔄 Keeping breed characteristics in English (language={language})")
        # Debug: Show numeric characteristics that would be displayed
        numeric_chars = {k: v for k, v in breed_data.items() if isinstance(v, (int, float)) and k not in ['Dog Breeds', 'Cat Breeds']}
        print(f"🔢 Numeric characteristics for display: {list(numeric_chars.keys())}")
    
    return jsonify({
        'pet_type': pet_type,
        'breed_name': breed_name,
        'breed_data': breed_data,
        'images': images,
        'description': description,
        'language': language
    }), 200

# Helper functions
def calculate_breed_scores(pet_type, answers, dog_breeds, cat_breeds, mappings):
    breeds = dog_breeds if pet_type == 'dog' else cat_breeds
    breed_key = 'Dog Breeds' if pet_type == 'dog' else 'Cat Breeds'
    
    # Initialize scores and question count tracking
    scores = {breed[breed_key]: 0 for breed in breeds}
    questions_used = {breed[breed_key]: 0 for breed in breeds}
    
    # Define characteristic importance weights (higher = more important for matching)
    characteristic_weights = {
        'Exercise Needs': 1.5,      # Very important for lifestyle match
        'Dog Size': 1.3,            # Important for living situation
        'Owner Experience': 1.2,    # Important for success
        'Kid-Friendly': 1.4,        # Critical for families
        'Dog Friendly': 1.1,        # Important for socialization
        'Tolerates Being Alone': 1.3, # Important for work schedules
        'Training Level': 1.1,      # Moderate importance
        'Grooming Level': 1.0,      # Standard importance
        'Drooling Level': 0.8,      # Less critical
        'Tendency To Bark Or Howl': 1.0, # Standard importance
        'Walk Activity': 1.2,       # Important for exercise needs
        'Guarding Level': 0.9,      # Less critical unless specifically wanted
        'Hyperalergic (1 - no, 2 - yes)': 1.6  # Critical for allergies
    }
    
    # Map user answers to characteristics and weight
    for answer_data in answers:
        question = answer_data.get('question')
        answer = answer_data.get('answer')
        characteristic = answer_data.get('characteristic')
        
        # Use the weight directly from questions.json (single source of truth)
        answer_weight = answer_data.get('answer_weight')
        if answer_weight is not None:
            try:
                weight = int(answer_weight)
                print(f"Using weight for '{answer}': {weight}")
            except (ValueError, TypeError):
                print(f"Invalid weight format: {answer_weight}, skipping answer")
                continue
        else:
            print(f"No weight found for answer: {answer_data}")
            continue
        
        # Update score for each breed based on characteristic and weight
        for breed in breeds:
            if characteristic in breed:
                breed_value = breed[characteristic]
                breed_name = breed[breed_key]
                
                # Improved scoring formula with nuanced compatibility calculation
                difference = abs(breed_value - weight)
                
                # Nuanced scoring: rewards closer matches more significantly
                if difference == 0:
                    # Perfect match
                    compatibility_score = 10.0
                elif difference == 1:
                    # Very close match
                    compatibility_score = 8.5
                elif difference == 2:
                    # Good match
                    compatibility_score = 6.0
                elif difference == 3:
                    # Fair match
                    compatibility_score = 3.0
                elif difference == 4:
                    # Poor match
                    compatibility_score = 1.0
                else:
                    # Very poor match
                    compatibility_score = 0.0
                
                # Apply characteristic importance weight
                importance_weight = characteristic_weights.get(characteristic, 1.0)
                final_score = compatibility_score * importance_weight
                
                scores[breed_name] += final_score
                questions_used[breed_name] += 1
    
    # Normalize scores to percentages with improved calculation
    # Use all questions that were actually processed for each breed
    normalized_scores = {}
    for breed_name in scores:
        if questions_used[breed_name] > 0:
            # Calculate max possible score for this breed based on questions used
            max_possible = questions_used[breed_name] * 10.0 * 1.6  # 10 max score * max weight (1.6)
            raw_score = scores[breed_name]
            normalized_score = (raw_score / max_possible) * 100
            
            # Apply bonus for having more questions answered (encourages complete profiles)
            question_completeness_bonus = min(questions_used[breed_name] / len(answers), 1.0) * 5
            final_score = min(normalized_score + question_completeness_bonus, 100.0)
            
            normalized_scores[breed_name] = final_score
        else:
            normalized_scores[breed_name] = 0.0
    
    # Convert to list of dicts and sort by score, then by name for consistent tiebreaking
    result = [{'name': breed, 'score': normalized_scores[breed]} for breed in normalized_scores]
    result.sort(key=lambda x: (-x['score'], x['name']))  # Sort by score desc, then name asc
    
    # Return top 9 breeds
    return result[:9]

def get_dog_image(breed_name):
    try:
        print(f"Fetching dog image for breed: {breed_name}")
        
        # Clean breed name for API search
        clean_breed_name = breed_name.replace(' ', '%20')
        
        response = requests.get(
            f"https://api.thedogapi.com/v1/breeds/search?q={clean_breed_name}",
            headers={"x-api-key": DOG_API_KEY}
        )
        
        print(f"Dog API search response status: {response.status_code}")
        
        if response.status_code == 200:
            breeds = response.json()
            print(f"Found {len(breeds)} breeds for '{breed_name}'")
            
            if breeds:
                breed_id = breeds[0]['id']
                print(f"Using breed ID: {breed_id}")
                
                # Get image for breed with size limit
                image_response = requests.get(
                    f"https://api.thedogapi.com/v1/images/search?breed_id={breed_id}&size=med&limit=1",
                    headers={"x-api-key": DOG_API_KEY}
                )
                
                print(f"Dog image API response status: {image_response.status_code}")
                
                if image_response.status_code == 200:
                    images = image_response.json()
                    if images and len(images) > 0:
                        image_url = images[0]['url']
                        print(f"Successfully got dog image: {image_url}")
                        return image_url
        
        # Fallback to a generic dog image from a reliable source
        print(f"Using fallback image for dog breed: {breed_name}")
        return "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=face"
    
    except Exception as e:
        print(f"Error fetching dog image for {breed_name}: {e}")
        return "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=face"

def get_cat_image(breed_name):
    try:
        print(f"Fetching cat image for breed: {breed_name}")
        
        # Clean breed name for API search
        clean_breed_name = breed_name.replace(' ', '%20')
        
        response = requests.get(
            f"https://api.thecatapi.com/v1/breeds/search?q={clean_breed_name}",
            headers={"x-api-key": CAT_API_KEY}
        )
        
        print(f"Cat API search response status: {response.status_code}")
        
        if response.status_code == 200:
            breeds = response.json()
            print(f"Found {len(breeds)} breeds for '{breed_name}'")
            
            if breeds:
                breed_id = breeds[0]['id']
                print(f"Using breed ID: {breed_id}")
                
                # Получить изображение для породы с ��граничением размера
                # Get image for breed with size limit
                image_response = requests.get(
                    f"https://api.thecatapi.com/v1/images/search?breed_id={breed_id}&size=med&limit=1",
                    headers={"x-api-key": CAT_API_KEY}
                )
                
                print(f"Cat image API response status: {image_response.status_code}")
                
                if image_response.status_code == 200:
                    images = image_response.json()
                    if images and len(images) > 0:
                        image_url = images[0]['url']
                        print(f"Successfully got cat image: {image_url}")
                        return image_url
        
        # Fallback to a generic cat image from a reliable source
        print(f"Using fallback image for cat breed: {breed_name}")
        return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=face"
    
    except Exception as e:
        print(f"Error fetching cat image for {breed_name}: {e}")
        return "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=face"

def generate_breed_description(breed_name, pet_type, language='en'):
    try:
        print(f"Generating description for {breed_name} {pet_type} in {language} using OpenRouter...")
        print(f"API Key available: {bool(OPENROUTER_API_KEY)}")
        print(f"API Key prefix: {OPENROUTER_API_KEY[:20] if OPENROUTER_API_KEY else 'None'}")
        
        # Check if API key is available
        if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == 'your_openrouter_api_key_here':
            print("❌ No valid OpenRouter API key found - using fallback")
            return generate_fallback_description(breed_name, pet_type, language)
        
        # Create language-specific prompt
        if language == 'es':
            prompt = f"Escribe una descripción concisa de la raza {breed_name} de {pet_type} en máximo 800 caracteres. Incluye información clave sobre tamaño, temperamento, necesidades de cuidado y requisitos de ejercicio. Formatea usando solo párrafos HTML (<p>) y un encabezado (<h3>) - sin DOCTYPE, html, head, o body tags. Sé breve e informativo. Responde completamente en español."
            system_message = "Eres un experto en mascotas que proporciona información concisa sobre razas. Mantén las respuestas bajo 800 caracteres en total. Responde siempre en español."
        else:
            prompt = f"Write a concise description of the {breed_name} {pet_type} breed in maximum 800 characters. Include key information about size, temperament, care needs, and exercise requirements. Format using only HTML paragraphs (<p>) and one heading (<h3>) - no DOCTYPE, html, head, or body tags. Be brief and informative."
            system_message = "You are a pet expert providing concise breed information. Keep responses under 800 characters total."
        
        print("Making OpenRouter API request...")
        
        # Use OpenRouter API
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "HTTP-Referer": "http://localhost:3000",  # Your site URL
                "X-Title": "PETential - Pet Breed Matcher",  # Your site name
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "model": "openai/gpt-4o",
                "messages": [
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": 200,
                "temperature": 0.7
            }),
            timeout=30
        )
        
        print(f"OpenRouter response status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            description = result['choices'][0]['message']['content'].strip()
            
            # Ensure description doesn't exceed 1000 characters
            if len(description) > 1000:
                print(f"⚠️ Description too long ({len(description)} chars), truncating...")
                # Find the last complete sentence within 1000 chars
                truncated = description[:997]
                last_period = truncated.rfind('.')
                if last_period > 500:  # Only truncate at sentence if it's not too short
                    description = truncated[:last_period + 1]
                else:
                    description = truncated + "..."
            
            print(f"✅ Successfully generated description for {breed_name}")
            print(f"Final description length: {len(description)} characters")
            return description
        else:
            print(f"❌ OpenRouter API error: {response.status_code}")
            print(f"Response: {response.text}")
            return generate_fallback_description(breed_name, pet_type, language)
        
    except Exception as e:
        print(f"❌ Error generating description for {breed_name}: {e}")
        import traceback
        traceback.print_exc()
        return generate_fallback_description(breed_name, pet_type, language)

def translate_breed_characteristics(breed_data):
    """Translate breed characteristic labels to Spanish"""
    translations = {
        # Actual characteristics from your data
        'Dog Friendly': 'Amigable con Perros',
        'Dog Size': 'Tamaño del Perro',
        'Grooming Level': 'Nivel de Aseo',
        'Guarding Level': 'Nivel de Guardia',
        'Hypoallergenic': 'Hipoalergénico',
        'Hyperalergic (1 - no, 2 - yes)': 'Hipoalergénico',
        'Kid-Friendly': 'Amigable con Niños',
        'Kid- Friendly': 'Amigable con Niños',
        'Kid Friendly': 'Amigable con Niños',
        'Owner Experience': 'Experiencia del Propietario',
        'Tendency To Bark Or Howl': 'Tendencia a Ladrar o Aullar',
        'Tolerates Being Alone': 'Tolera Estar Solo',
        'Training Level': 'Nivel de Entrenamiento',
        'Walk Activity': 'Actividad de Paseo',
        
        # Additional common characteristics
        'Size': 'Tamaño',
        'Weight': 'Peso',
        'Height': 'Altura',
        'Energy Level': 'Nivel de Energía',
        'Exercise Needs': 'Necesidades de Ejercicio',
        'Playfulness': 'Juguetón',
        'Affection Level': 'Nivel de Afecto',
        'Friendliness': 'Amigabilidad',
        'Pet Friendly': 'Amigable con Mascotas',
        'Stranger Friendly': 'Amigable con Extraños',
        'Grooming Needs': 'Necesidades de Aseo',
        'Shedding Level': 'Nivel de Muda',
        'Drooling Level': 'Nivel de Babeo',
        'Health Issues': 'Problemas de Salud',
        'Trainability': 'Facilidad de Entrenamiento',
        'Intelligence': 'Inteligencia',
        'Barking Level': 'Nivel de Ladrido',
        'Watchdog Ability': 'Habilidad de Guardián',
        'Adaptability': 'Adaptabilidad',
        'Apartment Living': 'Vida en Apartamento',
        'Cold Weather': 'Clima Frío',
        'Hot Weather': 'Clima Caluroso',
        
        # More specific characteristics that might be in your data
        'Good With Children': 'Bueno con Niños',
        'Good With Dogs': 'Bueno con Perros',
        'Good With Cats': 'Bueno con Gatos',
        'Exercise Requirements': 'Requisitos de Ejercicio',
        'Mental Stimulation': 'Estimulación Mental',
        'Coat Type': 'Tipo de Pelaje',
        'Coat Length': 'Longitud del Pelaje',
        'Life Span': 'Esperanza de Vida',
        'Common Health Issues': 'Problemas de Salud Comunes',
        
        # Cat specific
        'Independence': 'Independencia',
        'Vocalization': 'Vocalización',
        'Activity Level': 'Nivel de Actividad',
        'Cat Friendly': 'Amigable con Gatos'
    }
    
    # Value translations
    value_translations = {
        'No': 'No',
        'Yes': 'Sí',
        'Low': 'Bajo',
        'Medium': 'Medio',
        'High': 'Alto',
        'Very High': 'Muy Alto',
        'Very Low': 'Muy Bajo'
    }
    
    # Create a new dictionary with translated keys and values
    translated_data = {}
    untranslated_keys = []
    
    for key, value in breed_data.items():
        translated_key = translations.get(key, key)  # Use translation if available, otherwise keep original
        
        # Translate values if they are strings
        if isinstance(value, str):
            translated_value = value_translations.get(value, value)
        else:
            translated_value = value
            
        translated_data[translated_key] = translated_value
        
        # Track untranslated keys for debugging
        if translated_key == key and key not in ['Dog Breeds', 'Cat Breeds']:  # Ignore breed name keys
            untranslated_keys.append(key)
    
    if untranslated_keys:
        print(f"⚠️ Untranslated characteristics: {untranslated_keys}")
    
    print(f"✅ Translated {len(breed_data)} characteristics")
    return translated_data

def generate_fallback_description(breed_name, pet_type, language='en'):
    """Generate a more detailed fallback description when OpenRouter is not available"""
    
    if language == 'es':
        # Spanish fallback descriptions
        if pet_type == 'dog':
            return f"""
            <h3>Acerca del {breed_name}</h3>
            <p>El {breed_name} es una raza de perro con características únicas que lo hacen especial. Cada raza ha sido desarrollada para propósitos específicos y tiene rasgos distintivos que los posibles propietarios deben entender.</p>
            
            <h4>Consideraciones Importantes</h4>
            <p>Antes de elegir cualquier raza de perro, es importante investigar sus necesidades específicas, temperamento, requisitos de ejercicio, necesidades de aseo y posibles problemas de salud. Considera tu estilo de vida, situación de vivienda y nivel de experiencia.</p>
            
            <h4>Cuidado General</h4>
            <p>Todos los perros requieren nutrición adecuada, atención veterinaria regular, ejercicio apropiado y socialización. Los requisitos específicos varían significativamente entre razas.</p>
            
            <p><em>Nota: Para información detallada generada por IA, por favor configura tu clave API de OpenRouter en la configuración del sistema.</em></p>
            """
        else:
            return f"""
            <h3>Acerca del {breed_name}</h3>
            <p>El {breed_name} es una raza de gato con características únicas que lo hacen especial. Cada raza ha sido desarrollada para propósitos específicos y tiene rasgos distintivos que los posibles propietarios deben entender.</p>
            
            <h4>Consideraciones Importantes</h4>
            <p>Antes de elegir cualquier raza de gato, es importante investigar sus necesidades específicas, temperamento, requisitos de ejercicio, necesidades de aseo y posibles problemas de salud. Considera tu estilo de vida, situación de vivienda y nivel de experiencia.</p>
            
            <h4>Cuidado General</h4>
            <p>Todos los gatos requieren nutrición adecuada, atención veterinaria regular, ejercicio apropiado y socialización. Los requisitos específicos varían significativamente entre razas.</p>
            
            <p><em>Nota: Para información detallada generada por IA, por favor configura tu clave API de OpenRouter en la configuración del sistema.</em></p>
            """
    
    # English fallback descriptions (existing code)
    # Basic breed information based on common knowledge
    if pet_type == 'dog':
        if 'Husky' in breed_name:
            return f"""
            <h3>About the {breed_name}</h3>
            <p>The {breed_name} is a medium to large working dog breed originally from Siberia. Known for their striking blue eyes, thick double coat, and incredible endurance, Huskies were bred by the Chukchi people for sledding across vast frozen landscapes.</p>
            
            <h4>Physical Characteristics</h4>
            <p>Huskies typically weigh 35-60 pounds and stand 20-24 inches tall. They have a distinctive appearance with erect triangular ears, a bushy tail that curves over their back, and a thick double coat that comes in various colors including black, gray, red, and white.</p>
            
            <h4>Temperament</h4>
            <p>Huskies are known for being friendly, outgoing, and alert. They are pack animals with a strong prey drive and high energy levels. They can be escape artists and are known for their distinctive howling rather than barking.</p>
            
            <h4>Exercise & Care</h4>
            <p>This breed requires significant daily exercise and mental stimulation. They thrive in cooler climates and need regular grooming, especially during shedding seasons. Huskies are not typically good guard dogs as they tend to be friendly with strangers.</p>
            
            <p><em>Note: For AI-generated detailed breed information, please configure your OpenRouter API key.</em></p>
            """
        elif 'Golden Retriever' in breed_name:
            return f"""
            <h3>About the {breed_name}</h3>
            <p>The Golden Retriever is a large, friendly dog breed that originated in Scotland. They are known for their intelligence, loyalty, and gentle temperament, making them excellent family pets and working dogs.</p>
            
            <h4>Physical Characteristics</h4>
            <p>Golden Retrievers typically weigh 55-75 pounds and stand 21-24 inches tall. They have a dense, water-repellent outer coat with a thick undercoat, ranging from light to dark golden colors.</p>
            
            <h4>Temperament</h4>
            <p>These dogs are known for being reliable, trustworthy, and eager to please. They are excellent with children and other pets, making them ideal family companions. They are also highly trainable and often used as service dogs.</p>
            
            <h4>Exercise & Care</h4>
            <p>Golden Retrievers need regular exercise and mental stimulation. They require regular brushing to manage shedding and should be bathed as needed. They thrive on human interaction and don't do well when left alone for long periods.</p>
            
            <p><em>Note: For AI-generated detailed breed information, please configure your OpenRouter API key.</em></p>
            """
    
    # Generic fallback for other breeds
    return f"""
    <h3>About the {breed_name}</h3>
    <p>The {breed_name} is a {pet_type} breed with unique characteristics that make it special. Each breed has been developed for specific purposes and has distinct traits that potential owners should understand.</p>
    
    <h4>Important Considerations</h4>
    <p>Before choosing any {pet_type} breed, it's important to research their specific needs, temperament, exercise requirements, grooming needs, and potential health issues. Consider your lifestyle, living situation, and experience level.</p>
    
    <h4>General Care</h4>
    <p>All {pet_type}s require proper nutrition, regular veterinary care, appropriate exercise, and socialization. The specific requirements vary significantly between breeds.</p>
    
    <p><em>Note: For detailed AI-generated breed information, please configure your OpenRouter API key in the system settings.</em></p>
    """

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    """Handle feedback form submission"""
    try:
        data = request.json
        
        # Save feedback data to JSON file
        feedback_data = {
            'name': data.get('name', ''),
            'email': data.get('email', ''),
            'feedback_type': data.get('feedback_type', ''),
            'rating': data.get('rating', ''),
            'features_used': data.get('features_used', []),
            'message': data.get('message', ''),
            'suggestions': data.get('suggestions', ''),
            'allow_follow_up': data.get('allow_follow_up', False),
            'newsletter_signup': data.get('newsletter_signup', False),
            'timestamp': datetime.now().isoformat(),
            'id': str(int(datetime.now().timestamp() * 1000))  # Simple ID generation
        }
        
        # Save to JSON file
        save_feedback_to_file(feedback_data)
        
        # Return success response
        return jsonify({
            'status': 'success',
            'message': 'Thank you for your feedback!'
        }), 200
        
    except Exception as e:
        print(f"Error processing feedback: {e}")
        return jsonify({
            'status': 'error',
            'message': 'Sorry, there was an error processing your feedback. Please try again.'
        }), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submission"""
    try:
        data = request.json
        
        # Validate required fields
        if not data.get('email') or not data.get('message'):
            return jsonify({
                'status': 'error',
                'message': 'Email and message are required'
            }), 400
        
        # Save contact data
        contact_data = {
            'name': data.get('name', ''),
            'email': data.get('email', ''),
            'subject': data.get('subject', ''),
            'message': data.get('message', ''),
            'timestamp': datetime.now().isoformat(),
            'id': str(int(datetime.now().timestamp() * 1000))
        }
        
        save_user_data(contact_data, 'contacts')
        
        return jsonify({
            'status': 'success',
            'message': 'Thank you for your message! We will get back to you soon.',
            'id': contact_data['id']
        }), 200
        
    except Exception as e:
        print(f"Error processing contact form: {e}")
        return jsonify({
            'status': 'error',
            'message': 'Sorry, there was an error sending your message. Please try again.'
        }), 500

@app.route('/api/newsletter', methods=['POST'])
def submit_newsletter():
    """Handle newsletter subscription"""
    try:
        data = request.json
        
        # Validate email
        email = data.get('email', '').strip()
        if not email:
            return jsonify({
                'status': 'error',
                'message': 'Email is required'
            }), 400
        
        # Basic email validation
        import re
        email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_regex, email):
            return jsonify({
                'status': 'error',
                'message': 'Please enter a valid email address'
            }), 400
        
        # Check if already subscribed
        existing_data = load_user_data()
        for subscription in existing_data.get('newsletters', []):
            if subscription.get('email') == email:
                return jsonify({
                    'status': 'success',
                    'message': 'You are already subscribed to our newsletter.',
                    'id': subscription.get('id')
                }), 200
        
        # Save newsletter subscription
        newsletter_data = {
            'email': email,
            'timestamp': datetime.now().isoformat(),
            'id': str(int(datetime.now().timestamp() * 1000))
        }
        
        save_user_data(newsletter_data, 'newsletters')
        
        return jsonify({
            'status': 'success',
            'message': 'Thank you for subscribing! You will receive our latest updates.',
            'id': newsletter_data['id']
        }), 200
        
    except Exception as e:
        print(f"Error processing newsletter subscription: {e}")
        return jsonify({
            'status': 'error',
            'message': 'Sorry, there was an error with your subscription. Please try again.'
        }), 500

def load_user_data():
    """Load user data from JSON file"""
    import json
    import os
    
    data_dir = os.path.join(os.getcwd(), 'data')
    user_data_file = os.path.join(data_dir, 'user-data.json')
    
    try:
        if os.path.exists(user_data_file):
            with open(user_data_file, 'r') as f:
                return json.load(f)
        else:
            return {'contacts': [], 'newsletters': [], 'feedback': []}
    except:
        return {'contacts': [], 'newsletters': [], 'feedback': []}

def save_user_data(data, data_type):
    """Save user data to JSON file"""
    import json
    import os
    
    # Ensure data directory exists
    data_dir = os.path.join(os.getcwd(), 'data')
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
    
    user_data_file = os.path.join(data_dir, 'user-data.json')
    
    # Load existing data
    user_data = load_user_data()
    
    # Add new data
    if data_type not in user_data:
        user_data[data_type] = []
    
    user_data[data_type].insert(0, data)  # Add to beginning
    
    # Save back to file
    with open(user_data_file, 'w') as f:
        json.dump(user_data, f, indent=2)

def save_feedback_to_file(feedback_data):
    """Save feedback data to JSON file (legacy function)"""
    save_user_data(feedback_data, 'feedback')

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('RAILWAY_ENVIRONMENT') != 'production'
    print(f"Starting Flask app on port {port}")
    app.run(debug=debug, port=port, host='0.0.0.0')

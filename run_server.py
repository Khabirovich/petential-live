#!/usr/bin/env python3
"""
Simple server runner for debugging PETential app
"""
import os
import sys

# Add the app directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    print("🐕 Starting PETential server...")
    print("📁 Current directory:", os.getcwd())
    print("🐍 Python version:", sys.version)
    
    # Check if required files exist
    required_files = [
        'app.py',
        'app/templates/index.html', 
        'app/templates/layout.html',
        'app/static/css/styles.css',
        'app/static/css/design-system.css'
    ]
    
    print("\n📋 Checking required files:")
    for file in required_files:
        exists = os.path.exists(file)
        status = "✅" if exists else "❌"
        print(f"{status} {file}")
        if not exists:
            print(f"   Missing: {file}")
    
    # Check data files
    data_files = [
        'data/questions.json',
        'data/questions_cats.json', 
        'data/breeds.json',
        'data/cats_breeds.json'
    ]
    
    print("\n📊 Checking data files:")
    for file in data_files:
        exists = os.path.exists(file)
        status = "✅" if exists else "❌"
        print(f"{status} {file}")
    
    # Try to import and run the app
    print("\n🚀 Attempting to start Flask app...")
    from app import app
    
    print("✅ Flask app imported successfully!")
    print("🌐 Starting server on http://localhost:5001")
    print("📝 Available routes:")
    for rule in app.url_map.iter_rules():
        print(f"   - {rule.endpoint}: {rule.rule}")
    
    app.run(debug=True, port=5001, host='0.0.0.0')
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("💡 Try installing requirements: pip install -r requirements.txt")
except Exception as e:
    print(f"❌ Error starting server: {e}")
    import traceback
    traceback.print_exc()

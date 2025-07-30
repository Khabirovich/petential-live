#!/usr/bin/env python3

import json
import pandas as pd

def test_data_loading():
    print("=== Testing Data Loading ===")
    
    # Test dog questions
    try:
        with open('data/questions.json', 'r', encoding='utf-8') as f:
            dog_questions = json.load(f)
            print(f"✅ Loaded {len(dog_questions)} dog questions")
            print(f"First dog question: {dog_questions[0]}")
            print(f"Answer format: {type(dog_questions[0].get('answers'))}")
    except Exception as e:
        print(f"❌ Error loading dog questions: {e}")
    
    # Test cat questions  
    try:
        with open('data/questions_cats.json', 'r', encoding='utf-8') as f:
            cat_questions = json.load(f)
            print(f"✅ Loaded {len(cat_questions)} cat questions")
            print(f"First cat question: {cat_questions[0]}")
            print(f"Answer format: {type(cat_questions[0].get('answers'))}")
    except Exception as e:
        print(f"❌ Error loading cat questions: {e}")
    
    # Test dog breeds
    try:
        with open('data/breeds.json', 'r', encoding='utf-8') as f:
            dog_breeds = json.load(f)
            print(f"✅ Loaded {len(dog_breeds)} dog breeds")
            print(f"First dog breed: {dog_breeds[0]}")
    except Exception as e:
        print(f"❌ Error loading dog breeds: {e}")
    
    # Test cat breeds
    try:
        with open('data/cats_breeds.json', 'r', encoding='utf-8') as f:
            cat_breeds = json.load(f)
            print(f"✅ Loaded {len(cat_breeds)} cat breeds")
            print(f"First cat breed: {cat_breeds[0]}")
    except Exception as e:
        print(f"❌ Error loading cat breeds: {e}")
    
    # Test mappings
    try:
        mappings = pd.read_csv('data/Mapping .csv', sep=';')
        print(f"✅ Loaded mappings with {len(mappings)} rows")
        print(f"Mapping columns: {list(mappings.columns)}")
        if len(mappings) > 0:
            print(f"First mapping: {mappings.iloc[0].to_dict()}")
    except Exception as e:
        print(f"❌ Error loading mappings: {e}")

if __name__ == "__main__":
    test_data_loading()
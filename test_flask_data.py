#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import load_data

def test_flask_data_loading():
    print("=== Testing Flask Data Loading ===")
    
    dog_questions, cat_questions, dog_breeds, cat_breeds, mappings = load_data()
    
    print(f"\nDog Questions: {len(dog_questions)}")
    for i, q in enumerate(dog_questions[:3]):
        print(f"  {i+1}. {q['question']}")
        print(f"     Characteristic: {q.get('characteristic')}")
        print(f"     Answers: {q.get('answers')}")
        print()
    
    print(f"\nCat Questions: {len(cat_questions)}")
    for i, q in enumerate(cat_questions[:3]):
        print(f"  {i+1}. {q['question']}")
        print(f"     Characteristic: {q.get('characteristic')}")
        print(f"     Answers: {q.get('answers')}")
        print()

if __name__ == "__main__":
    test_flask_data_loading()
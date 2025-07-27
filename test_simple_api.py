#!/usr/bin/env python3

import requests
import json

def test_api():
    base_url = "http://localhost:5003/api"
    
    print("=== Testing Flask API ===")
    
    # Test health
    try:
        response = requests.get(f"{base_url}/health")
        print(f"Health check: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
    
    # Test debug data
    try:
        response = requests.get(f"{base_url}/debug/data")
        print(f"Debug data: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Dog questions: {data['dog_questions_count']}")
            print(f"Cat questions: {data['cat_questions_count']}")
            print(f"Sample dog question: {data['sample_dog_question']}")
    except Exception as e:
        print(f"Debug data failed: {e}")
    
    # Test start quiz
    try:
        session = requests.Session()
        response = session.post(f"{base_url}/quiz/start/dog")
        print(f"Start quiz: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Total questions: {data['total_questions']}")
            print(f"First question: {data['first_question']['question']}")
            print(f"First question answers: {data['first_question']['answers']}")
    except Exception as e:
        print(f"Start quiz failed: {e}")

if __name__ == "__main__":
    test_api()
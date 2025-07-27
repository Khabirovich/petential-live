// Test API connection from frontend
const API_BASE_URL = 'http://localhost:5001/api';

async function testApiConnection() {
  console.log('Testing API connection...');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed:', healthData);
    } else {
      console.log('❌ Health check failed:', healthResponse.status);
      return;
    }
    
    // Test debug data endpoint
    console.log('2. Testing debug data endpoint...');
    const debugResponse = await fetch(`${API_BASE_URL}/debug/data`);
    if (debugResponse.ok) {
      const debugData = await debugResponse.json();
      console.log('✅ Debug data:', debugData);
    } else {
      console.log('❌ Debug data failed:', debugResponse.status);
    }
    
    // Test starting a dog quiz
    console.log('3. Testing start dog quiz...');
    const startResponse = await fetch(`${API_BASE_URL}/quiz/start/dog`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (startResponse.ok) {
      const startData = await startResponse.json();
      console.log('✅ Start quiz response:', startData);
      
      // Test getting first question
      console.log('4. Testing get question...');
      const questionResponse = await fetch(`${API_BASE_URL}/question/0`, {
        credentials: 'include',
      });
      
      if (questionResponse.ok) {
        const questionData = await questionResponse.json();
        console.log('✅ Question data:', questionData);
      } else {
        console.log('❌ Get question failed:', questionResponse.status);
      }
    } else {
      console.log('❌ Start quiz failed:', startResponse.status);
    }
    
  } catch (error) {
    console.error('❌ API connection error:', error);
  }
}

// Run the test
testApiConnection();
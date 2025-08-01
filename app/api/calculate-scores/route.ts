import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Proxy the request to the Flask backend
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
        const response = await fetch(`${backendUrl}/api/calculate-scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error proxying to backend:', error);
        return NextResponse.json(
            { error: 'Failed to calculate scores' },
            { status: 500 }
        );
    }
}
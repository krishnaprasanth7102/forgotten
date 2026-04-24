import { NextResponse } from 'next/server';
// import { blueprintFlow } from '@/ai/blueprint-flow';

export async function GET(req: Request) {
  try {
    return NextResponse.json({ test: "bypass blueprintFlow" }, { status: 200 });
  } catch (error: any) {
    console.error('Test Blueprint Generation Error:', error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 200 });
  }
}


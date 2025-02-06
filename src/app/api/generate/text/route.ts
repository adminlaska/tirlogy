import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await hf.textGeneration({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      inputs: prompt,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15
      }
    });

    return NextResponse.json({ result: response.generated_text });
  } catch (error) {
    console.error('Text Generation Error:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Textgenerierung' },
      { status: 500 }
    );
  }
} 
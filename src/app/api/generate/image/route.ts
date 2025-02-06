import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await hf.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        negative_prompt: "blurry, bad quality, distorted",
        num_inference_steps: 30,
        guidance_scale: 7.5
      }
    });

    // Konvertiere das Blob in eine Base64-URL
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({ result: imageUrl });
  } catch (error) {
    console.error('Image Generation Error:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Bildgenerierung' },
      { status: 500 }
    );
  }
} 
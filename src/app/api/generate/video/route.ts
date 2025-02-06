import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await hf.textToVideo({
      model: "damo-vilab/text-to-video-ms-1.7b",
      inputs: prompt,
      parameters: {
        num_inference_steps: 50,
        fps: 8,
        num_frames: 24
      }
    });

    // Konvertiere das Blob in eine Base64-URL
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const videoUrl = `data:video/mp4;base64,${base64}`;

    return NextResponse.json({ result: videoUrl });
  } catch (error) {
    console.error('Video Generation Error:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Videogenerierung' },
      { status: 500 }
    );
  }
} 
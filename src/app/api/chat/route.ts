import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const SYSTEM_PROMPT = `WICHTIGE REGELN FÜR DEINE ANTWORTEN:

1. FORMAT:
- KEINE Begrüßungen oder Floskeln
- KEINE "Hallo", "Guten Tag" oder ähnliche Einleitungen
- Beginne DIREKT mit der relevanten Antwort
- Bleibe sachlich und präzise

2. ANTWORTQUALITÄT:
- Beantworte NUR die konkrete Frage
- Keine Ausschweifungen oder Zusatzinformationen
- Gib spezifische, praktische Lösungen
- Verwende kurze, klare Sätze

3. SPRACHE:
- Ausschließlich Deutsch
- Fachbegriffe nur wenn nötig
- Verständliche Formulierungen
- Dem Niveau des Nutzers angepasst

4. KONTEXT:
- Beziehe dich nur auf relevante vorherige Nachrichten
- Ignoriere irrelevante Vorgeschichte
- Fokussiere auf das aktuelle Problem

VERHALTENSMUSTER:
❌ NICHT: "Hallo! Ich helfe Ihnen gerne bei..."
❌ NICHT: "Guten Tag, zu Ihrer Frage..."
❌ NICHT: "Danke für Ihre Frage..."
✅ DIREKT: "Die Lösung ist..."
✅ DIREKT: "Um das Problem zu beheben..."
✅ DIREKT: "Folgende Schritte sind notwendig..."`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Extrahiere nur relevante Nachrichten für den Kontext
    const relevantMessages = messages.slice(-3); // Nur die letzten 3 Nachrichten
    const conversationContext = relevantMessages
      .map((msg: ChatMessage) => `${msg.role === 'user' ? 'F' : 'A'}: ${msg.content}`)
      .join('\n');

    try {
      const response = await hf.textGeneration({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        inputs: `<s>[INST] 
${SYSTEM_PROMPT}

LETZTE NACHRICHTEN:
${conversationContext}

ANWEISUNGEN:
1. Lies die letzte Frage
2. Antworte DIREKT ohne Begrüßung
3. Bleib KONKRET beim Thema
4. Gib eine PRÄZISE Lösung

Deine direkte deutsche Antwort (ohne Begrüßung): [/INST]`,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.5, // Reduziert für konsistentere Antworten
          top_p: 0.85, // Reduziert für fokussiertere Antworten
          repetition_penalty: 1.2,
          do_sample: true,
          return_full_text: false,
        }
      });

      let cleanedResponse = response.generated_text
        .trim()
        .replace(/^[Hh]allo\s*/g, '')
        .replace(/^[Gg]uten\s+(?:Tag|Morgen|Abend)\s*/g, '')
        .replace(/^[Ss]ehr\s+geehrte[r]?\s+(?:Damen\s+und\s+Herren|Frau|Herr)\s*/g, '')
        .replace(/^assistant:\s*/i, '')
        .replace(/^assistent:\s*/i, '')
        .replace(/^assistant:\s*/i, '')
        .replace(/^ai:\s*/i, '')
        .replace(/\[\/INST\]\s*/g, '')
        .replace(/^antwort:\s*/i, '')
        .replace(/^([A-Za-z]:\s*)/i, '')
        .replace(/^(Hier\s+ist\s+(?:die|meine)\s+Antwort:?\s*)/i, '')
        .replace(/^(Ich\s+(?:kann|möchte|würde|werde)\s+(?:Ihnen\s+)?(?:gerne\s+)?(?:dabei\s+)?(?:helfen|erklären|antworten)[:.]\s*)/i, '')
        .replace(/^(Zu\s+Ihrer\s+Frage[:.]\s*)/i, '');

      // Entferne mehrere Leerzeilen
      cleanedResponse = cleanedResponse.replace(/\n{3,}/g, '\n\n');

      // Verbesserte Deutschprüfung
      if (!cleanedResponse.match(/[\wäöüßÄÖÜ]/)) {
        return NextResponse.json({
          role: 'assistant',
          content: 'Ein technischer Fehler ist aufgetreten. Bitte wiederholen Sie Ihre Frage.'
        });
      }

      return NextResponse.json({
        role: 'assistant',
        content: cleanedResponse
      });

    } catch (error) {
      console.error('Primärmodell-Fehler:', error);

      // Fallback zu einem anderen Modell
      const fallbackResponse = await hf.textGeneration({
        model: 'google/flan-t5-xxl',
        inputs: `Aufgabe: Gib eine DIREKTE deutsche Antwort OHNE Begrüßung.

${SYSTEM_PROMPT}

LETZTE FRAGE:
${messages[messages.length - 1].content}

Direkte Antwort (ohne Begrüßung):`,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.5,
          top_p: 0.85,
          repetition_penalty: 1.2,
          do_sample: true,
          return_full_text: false,
        }
      });

      let cleanedFallbackResponse = fallbackResponse.generated_text
        .trim()
        .replace(/^[Hh]allo\s*/g, '')
        .replace(/^[Gg]uten\s+(?:Tag|Morgen|Abend)\s*/g, '')
        .replace(/^assistant:\s*/i, '')
        .replace(/^assistent:\s*/i, '')
        .replace(/^assistant:\s*/i, '')
        .replace(/^ai:\s*/i, '')
        .replace(/^antwort:\s*/i, '')
        .replace(/^([A-Za-z]:\s*)/i, '')
        .replace(/^(Hier\s+ist\s+(?:die|meine)\s+Antwort:?\s*)/i, '')
        .replace(/^(Ich\s+(?:kann|möchte|würde|werde)\s+(?:Ihnen\s+)?(?:gerne\s+)?(?:dabei\s+)?(?:helfen|erklären|antworten)[:.]\s*)/i, '')
        .replace(/^(Zu\s+Ihrer\s+Frage[:.]\s*)/i, '');

      // Entferne mehrere Leerzeilen
      cleanedFallbackResponse = cleanedFallbackResponse.replace(/\n{3,}/g, '\n\n');

      return NextResponse.json({
        role: 'assistant',
        content: cleanedFallbackResponse
      });
    }

  } catch (error) {
    console.error('Chat-Fehler:', error);
    return NextResponse.json({
      role: 'assistant',
      content: 'Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    }, { status: 500 });
  }
} 
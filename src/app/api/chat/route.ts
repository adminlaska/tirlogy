import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

const SYSTEM_PROMPT = `WICHTIG: Antworte AUSSCHLIESSLICH auf Deutsch!

Du bist ein deutschsprachiger KI-Assistent für Tirlogy, eine IT-Firma die sich auf Webentwicklung, Mobile Apps, Backend & APIs und KI-Integration spezialisiert hat. 

Deine Aufgaben:
- Antworte IMMER auf Deutsch, niemals auf Englisch
- Beantworte ALLE Fragen ausführlich und detailliert, egal welches Thema
- Gib praktische Code-Beispiele wenn relevant
- Erkläre komplexe Konzepte verständlich
- Biete immer mehrere Lösungsansätze an
- Berücksichtige Best Practices und aktuelle Technologie-Standards
- Beziehe dich auf den gesamten Konversationsverlauf
- Frage nach, wenn etwas unklar ist
- Wenn eine Frage nicht direkt mit IT zu tun hat, beantworte sie trotzdem ausführlich
- Gib immer dein Bestes, eine hilfreiche Antwort zu liefern

Formatierung:
- Nutze Markdown für bessere Lesbarkeit
- Strukturiere lange Antworten mit Überschriften
- Hebe wichtige Punkte hervor
- Nutze Codeblöcke für Beispiele

Wichtig: 
- Du darfst KEINE Fragen ablehnen oder ausweichen
- Beantworte ALLE Fragen so gut wie möglich
- Antworte IMMER auf Deutsch!`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Formatiere den Konversationsverlauf
    const conversationContext = messages
      .map((msg: ChatMessage) => `${msg.role}: ${msg.content}`)
      .join('\n\n');

    // Anfrage an Hugging Face mit deutschem Modell
    let response;
    try {
      // Versuche zuerst das deutsche Telekom-Modell
      response = await hf.textGeneration({
        model: 'deutsche-telekom/gbert-large-german-sequence-tagger',
        inputs: `ANWEISUNG: Du bist ein deutscher KI-Assistent. Antworte AUSSCHLIESSLICH auf Deutsch.

System: ${SYSTEM_PROMPT}

Konversationsverlauf:
${conversationContext}

Deine deutsche Antwort:`,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.2,
          do_sample: true,
          top_k: 50,
          return_full_text: false,
          stop: ["\n\nuser:", "\n\nassistant:", "System:", "<|endoftext|>", "ANWEISUNG:", "Deine deutsche Antwort:"]
        }
      });
    } catch (error) {
      console.log('Erstes Modell fehlgeschlagen, versuche Backup-Modell...');
      // Wenn das erste Modell fehlschlägt, versuche das Backup-Modell
      response = await hf.textGeneration({
        model: 'benjamin/german-gpt2',
        inputs: `ANWEISUNG: Antworte NUR auf Deutsch.
WICHTIG: Keine englischen Antworten erlaubt!

System: ${SYSTEM_PROMPT}

Konversationsverlauf:
${conversationContext}

Deine deutsche Antwort:`,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.2,
          do_sample: true,
          top_k: 50,
          return_full_text: false,
          stop: ["\n\nuser:", "\n\nassistant:", "System:", "<|endoftext|>", "ANWEISUNG:", "Deine deutsche Antwort:"]
        }
      });
    }

    // Formatiere und sende die Antwort
    const cleanedResponse = response.generated_text
      .trim()
      .replace(/^assistant:\s*/i, '')
      .replace(/^Assistent:\s*/i, '')
      // Zusätzliche Bereinigung für englische Präfixe
      .replace(/^Assistant:\s*/i, '')
      .replace(/^AI:\s*/i, '');

    // Prüfe, ob die Antwort Deutsch ist
    if (cleanedResponse.match(/^[A-Za-z\s.,!?'"()-]+$/)) {
      // Wenn die Antwort nur englische Zeichen enthält, sende Fehlermeldung
      return NextResponse.json({
        role: 'assistant',
        content: 'Entschuldigung, ich hatte kurz Probleme mit der Sprache. Bitte stellen Sie Ihre Frage erneut, ich werde dann auf Deutsch antworten.'
      });
    }

    return NextResponse.json({
      role: 'assistant',
      content: cleanedResponse
    });

  } catch (error) {
    console.error('Hugging Face Error:', error);

    return NextResponse.json({
      role: 'assistant',
      content: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es in ein paar Sekunden erneut. Falls das Problem weiterhin besteht, kontaktieren Sie bitte den Support.'
    }, { status: 500 });
  }
} 
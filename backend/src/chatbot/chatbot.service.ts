import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatMessage } from './dto/chatbot-message.dto';

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private openai: OpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
      this.logger.log('OpenAI Service configured.');
    } else {
      this.logger.warn('OpenAI API Key is missing. Falling back to high-fidelity mock chatbot service.');
    }
  }

  async getResponse(message: string, history: ChatMessage[] = []): Promise<string> {
    const systemPrompt = `You are an assistant for Ink Theory Tattoo Studio. Help users with tattoo questions and encourage consultation booking.
We specialize in premium, custom luxury tattoos (Realism, Anime, Minimal, Traditional, Blackwork, Geometric).
Keep responses detailed, engaging, professional, and invite them to book a consultation.`;

    if (this.openai) {
      try {
        const messages: any[] = [{ role: 'system', content: systemPrompt }];
        const recentHistory = history.slice(-10);
        for (const msg of recentHistory) {
          messages.push({ role: msg.role, content: msg.content });
        }
        messages.push({ role: 'user', content: message });

        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: 400,
          temperature: 0.7,
        });

        return response.choices[0]?.message?.content || 'I apologize, I could not generate a response. How else can I assist you?';
      } catch (err) {
        this.logger.error('Error contacting OpenAI API, falling back to mock response:', err);
      }
    }

    return this.generateMockResponse(message);
  }

  private generateMockResponse(message: string): string {
    const query = message.toLowerCase();

    if (query.includes('price') || query.includes('cost') || query.includes('how much') || query.includes('minimum')) {
      return "Tattoo pricing at Ink Theory starts at our studio minimum of $100. The final cost depends on the size, complexity, placement, and your chosen artist's hourly rate (typically $150 to $200 per hour). For custom sleeves or large realism pieces, we offer full-day session rates. I highly recommend booking a free consultation through our Booking Page so we can discuss details and provide you with an exact estimate!";
    }

    if (query.includes('pain') || query.includes('hurt') || query.includes('sensitive') || query.includes('numb')) {
      return "Getting a tattoo definitely involves some discomfort, but most clients find it completely manageable—often described as a hot scratching sensation. Placements directly over bone (like the ribs, spine, collarbone, or ankles) or thin skin (like inner arms) are generally more sensitive. Fleshy areas like outer arms, thighs, or calves are easier. Our artists work at your comfort level, offer breaks, and can discuss numbing options if you have low pain tolerance. Ready to take the plunge? Let's book a consultation!";
    }

    if (query.includes('heal') || query.includes('aftercare') || query.includes('care') || query.includes('clean') || query.includes('wash') || query.includes('peel')) {
      return "Proper aftercare is crucial for a beautiful tattoo. Here is our golden protocol:\n\n1. Keep the protective film (Saniderm) on for 2-5 days, or as instructed by your artist.\n2. Once removed, gently wash the tattoo with lukewarm water and mild, unscented soap. Pat dry with a clean paper towel.\n3. Apply a very thin layer of Aquaphor or a tattoo-specific aftercare ointment for the first 3 days, then switch to a light unscented daily lotion (like Lubriderm or Cetaphil).\n4. Do NOT scratch or pick at scabs or peeling skin.\n5. Avoid swimming pools, hot tubs, ocean water, and direct sunlight for at least 2-3 weeks. If you have any concerns during healing, you can contact us directly!";
    }

    if (query.includes('book') || query.includes('consultation') || query.includes('appointment') || query.includes('reserve')) {
      return "Booking a consultation at Ink Theory is simple! Just head over to our Booking Page and fill out the form. You'll input your contact details, describe your concept, select placement and size, set your budget, select your preferred artist, and upload any reference photos. Once submitted, our manager will review it and get back to you within 24-48 hours to confirm your session!";
    }

    if (query.includes('rules') || query.includes('age') || query.includes('18') || query.includes('minor') || query.includes('id')) {
      return "At Ink Theory, we maintain strict safety standards:\n\n1. You MUST be 18 years or older. We require a valid government-issued photo ID (driver's license, passport) before starting.\n2. We cannot tattoo anyone who is pregnant, nursing, or under the influence of alcohol or drugs.\n3. We recommend getting a good night's sleep, eating a solid meal, and staying hydrated before your session. You are welcome to bring snacks and a water bottle!";
    }

    if (query.includes('artist') || query.includes('who works') || query.includes('specializes') || query.includes('style')) {
      return "We host some of the finest resident artists, each specializing in different disciplines. Our specialties include Color Realism, Black & Grey Realism, Anime/Manga illustrative, Fine Line Minimal, Traditional American, heavy Blackwork, and complex Geometric patterns. Check out our 'Artists' page to view their professional portfolios and find the best match for your project!";
    }

    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('greetings')) {
      return "Hello! Welcome to Ink Theory Tattoo Studio. I'm your AI tattoo assistant. I can help answer questions about our pricing, pain levels, healing and aftercare protocols, studio rules, or guide you on how to book a consultation. How can I help you today?";
    }

    return "That is an interesting question! At Ink Theory, we prioritize custom experiences. To give you the most accurate advice or design suggestions, we recommend setting up a consultation. You can submit your idea through our Booking Page. Is there anything else I can answer about our aftercare, rules, or pricing?";
  }
}

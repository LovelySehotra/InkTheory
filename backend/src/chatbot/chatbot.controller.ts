import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotMessageDto } from './dto/chatbot-message.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('message')
  async sendMessage(@Body() chatbotMessageDto: ChatbotMessageDto) {
    const response = await this.chatbotService.getResponse(
      chatbotMessageDto.message,
      chatbotMessageDto.history,
    );
    return { response };
  }
}

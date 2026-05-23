import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatMessage {
  @IsString()
  @IsNotEmpty()
  role: 'user' | 'assistant' | 'system';

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class ChatbotMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ChatMessage)
  history?: ChatMessage[];
}

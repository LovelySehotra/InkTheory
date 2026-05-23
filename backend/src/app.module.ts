import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { ArtistsModule } from './artists/artists.module';
import { BookingsModule } from './bookings/bookings.module';
import { GalleryModule } from './gallery/gallery.module';
import { ContactModule } from './contact/contact.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UploadModule,
    ArtistsModule,
    BookingsModule,
    GalleryModule,
    ContactModule,
    ChatbotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

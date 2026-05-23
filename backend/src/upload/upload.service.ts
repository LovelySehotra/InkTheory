import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private useCloudinary = false;

  constructor(private configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
      this.useCloudinary = true;
      this.logger.log('Cloudinary successfully configured.');
    } else {
      this.logger.warn('Cloudinary credentials missing. Falling back to local file storage.');
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (this.useCloudinary) {
      try {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'ink_theory' },
            (error, result) => {
              if (error || !result) {
                this.logger.error('Cloudinary upload error:', error);
                reject(error || new Error('Upload failed'));
              } else {
                resolve(result.secure_url);
              }
            },
          );
          uploadStream.end(file.buffer);
        });
      } catch (err) {
        this.logger.error('Error during Cloudinary upload stream creation:', err);
      }
    }

    // Local Fallback Storage
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, file.buffer);
    const port = this.configService.get<string>('PORT') || '5001';
    
    return `http://localhost:${port}/uploads/${filename}`;
  }
}

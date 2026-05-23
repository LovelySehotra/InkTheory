import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { Gallery } from '../generated/client/client';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string): Promise<Gallery[]> {
    if (category) {
      return this.prisma.gallery.findMany({
        where: { category },
        orderBy: { createdAt: 'desc' },
      });
    }
    return this.prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    return this.prisma.gallery.create({
      data: createGalleryDto,
    });
  }
}

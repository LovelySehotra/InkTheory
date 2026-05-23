import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from '../generated/client/client';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from '../generated/client/client';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    return this.prisma.contact.create({
      data: createContactDto,
    });
  }

  async findAll(): Promise<Contact[]> {
    return this.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingStatus } from '../generated/client/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.prisma.booking.create({
      data: {
        ...createBookingDto,
        preferredDate: new Date(createBookingDto.preferredDate),
      },
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }
}

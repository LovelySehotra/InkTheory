import { IsEnum, IsNotEmpty } from 'class-validator';
import { BookingStatus } from '../../generated/client/client';

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status: BookingStatus;
}

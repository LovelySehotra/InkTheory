import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  tattooIdea: string;

  @IsString()
  @IsNotEmpty()
  placement: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  budget: string;

  @IsDateString()
  @IsNotEmpty()
  preferredDate: string;

  @IsString()
  @IsNotEmpty()
  preferredArtist: string;

  @IsString()
  @IsOptional()
  referenceImage?: string;
}

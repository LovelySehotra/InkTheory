import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  specialty: string[];

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  image: string; // URL path of the artist's profile picture
}

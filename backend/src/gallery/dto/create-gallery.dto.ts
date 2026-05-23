import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

const CATEGORIES = ['Realism', 'Anime', 'Minimal', 'Traditional', 'Blackwork', 'Geometric'];

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  image: string; // URL path of the tattoo photo

  @IsString()
  @IsNotEmpty()
  @IsIn(CATEGORIES, {
    message: `category must be one of: ${CATEGORIES.join(', ')}`,
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  artistId?: string;
}

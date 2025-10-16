import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DestinationsCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Playa Paraiso',
    description: 'Nombre del destino',
    type: String,
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Una hermosa playa con aguas cristalinas y arena blanca.',
    description: 'Descripción del destino',
    type: String,
    required: true,
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Cancún, México',
    description: 'Ubicación del destino',
    type: String,
    required: true,
  })
  location: string;

  @IsNumber()
  @ApiProperty({
    example: 21.1619,
    description: 'Latitud del destino',
    type: Number,
    required: true,
  })
  latitude: number;

  @IsNumber()
  @ApiProperty({
    example: -86.8515,
    description: 'Longitud del destino',
    type: Number,
    required: true,
  })
  longitude: number;

  @IsNumber()
  @ApiProperty({
    example: 100.10,
    description: 'PRECIO DEL DESTINO',
    type: Number,
    required: true,
  })
  precio: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'playa',
    description: 'Categoría del destino (ejemplo: playa, hotel, restaurante, etc.)',
    type: String,
    required: true,
  })
  category: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Estado del destino',
    type: Boolean,
    required: true,
  })
  status: boolean;
}
 

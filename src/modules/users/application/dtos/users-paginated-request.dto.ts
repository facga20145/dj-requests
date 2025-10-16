import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UsersPaginatedRequestDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
    description: 'Número de página',
    type: Number,
    required: false,
    default: 1,
  })
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    example: 10,
    description: 'Cantidad de elementos por página',
    type: Number,
    required: false,
    default: 10,
  })
  limit?: number = 10;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'name',
    description: 'Campo por el cual ordenar',
    type: String,
    required: false,
  })
  orderBy?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'asc',
    description: 'Dirección de ordenamiento (asc o desc)',
    type: String,
    required: false,
    enum: ['asc', 'desc'],
    default: 'asc',
  })
  orderDirection?: 'asc' | 'desc' = 'asc';

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Juan',
    description: 'Término de búsqueda para filtrar usuarios',
    type: String,
    required: false,
  })
  search?: string;
}
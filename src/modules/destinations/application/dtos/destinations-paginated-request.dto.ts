import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class DestinationsPaginatedRequestDto {
  @ApiPropertyOptional({ example: 1, description: 'Número de página (1-based)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  index = 1;

  @ApiPropertyOptional({ example: 10, description: 'Cantidad de items por página' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({ example: 'cusco', description: 'Filtro por nombre o ubicación' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'playa', description: 'Filtro por categoría' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 100.10, description: 'Filtro por precio' })
  @IsOptional()
  @Type(() => Number)
  precio?: number;
}

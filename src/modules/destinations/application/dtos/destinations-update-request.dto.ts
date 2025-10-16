import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class DestinationsUpdateRequestDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Playa Paraíso', description: 'Nombre del destino' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Descripción actualizada', description: 'Descripción' })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Cancún, MX', description: 'Ubicación' })
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiPropertyOptional({ example: 21.1619, description: 'Latitud' })
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiPropertyOptional({ example: -86.8515, description: 'Longitud' })
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 100.10, description: 'Precio del destino' })
  precio?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'playa', description: 'Categoría (playa, hotel...)' })
  category?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Activo/desactivado' })
  status?: boolean;
}


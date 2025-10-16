import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UsersCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
    type: String,
    required: true,
  })
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
    type: String,
    required: false,
  })
  email?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID del rol del usuario (1: CLIENT, 2: DJ, 3: ADMIN, etc.)',
    type: Number,
    required: true,
  })
  roleId: number;
}
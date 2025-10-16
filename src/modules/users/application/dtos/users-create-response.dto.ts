import { ApiProperty } from '@nestjs/swagger';

export class UsersCreateResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID único del usuario',
  })
  id: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  name: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del usuario',
  })
  email?: string;

  @ApiProperty({
    example: 1,
    description: 'ID del rol del usuario',
  })
  roleId: number;

  @ApiProperty({
    example: '2023-10-25T15:30:45.123Z',
    description: 'Fecha de creación del usuario',
  })
  createdAt: Date;
}
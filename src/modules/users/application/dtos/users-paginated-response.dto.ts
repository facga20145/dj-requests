import { ApiProperty } from '@nestjs/swagger';
import { UsersCreateResponseDto } from './users-create-response.dto';

export class UsersPaginatedResponseDto {
  @ApiProperty({
    type: [UsersCreateResponseDto],
    description: 'Lista de usuarios',
  })
  data: UsersCreateResponseDto[];

  @ApiProperty({
    example: 1,
    description: 'Página actual',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Cantidad de elementos por página',
  })
  limit: number;

  @ApiProperty({
    example: 100,
    description: 'Total de elementos',
  })
  total: number;

  @ApiProperty({
    example: 10,
    description: 'Total de páginas',
  })
  totalPages: number;
}
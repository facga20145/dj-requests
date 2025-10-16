import { ApiProperty } from '@nestjs/swagger';
import { DestinationsCreateResponseDto } from './destinations-create-response.dto';

export class DestinationsPaginatedResponseDto {
  @ApiProperty({ type: [DestinationsCreateResponseDto] })
  items: DestinationsCreateResponseDto[];

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  totalPages: number;

  @ApiProperty({ example: 100 })
  totalItems: number;
}

import { DestinationsCreateRequestDto } from 'src/modules/destinations/application/dtos/destinations-create-request.dto';
import { DestinationsCreateResponseDto } from 'src/modules/destinations/application/dtos/destinations-create-response.dto';
import { DestinationsPaginatedRequestDto } from 'src/modules/destinations/application/dtos/destinations-paginated-request.dto';
import { DestinationsPaginatedResponseDto } from 'src/modules/destinations/application/dtos/destinations-paginated-response.dto';
import { DestinationsUpdateRequestDto } from 'src/modules/destinations/application/dtos/destinations-update-request.dto';
import { DestinationsUpdateResponseDto } from 'src/modules/destinations/application/dtos/destinations-update-response.dto';

export abstract class DestinationsRepositoryPort {
  abstract create(
    request: DestinationsCreateRequestDto,
  ): Promise<DestinationsCreateResponseDto>;
  
  abstract findAll(): Promise<DestinationsCreateResponseDto[]>;
  abstract findOne(id: string): Promise<DestinationsUpdateResponseDto>;
  abstract findByCategory(category: string): Promise<DestinationsCreateResponseDto[]>;

  abstract findPaginated(
    dto: DestinationsPaginatedRequestDto,
  ): Promise<DestinationsPaginatedResponseDto>;
  abstract update(
    id: string,
    request: DestinationsUpdateRequestDto,
  ): Promise<DestinationsUpdateResponseDto>;
  abstract updateStatus(
    id: string,
    status: boolean,
  ): Promise<DestinationsUpdateResponseDto>;
}

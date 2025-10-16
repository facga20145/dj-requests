import { Inject, Injectable } from "@nestjs/common";
import { DestinationsPaginatedRequestDto } from "src/modules/destinations/application/dtos/destinations-paginated-request.dto";
import { DestinationsPaginatedResponseDto } from "src/modules/destinations/application/dtos/destinations-paginated-response.dto";
import { DestinationsRepositoryPort } from "src/modules/destinations/infrastructure/adapters/ports/destinations-repository.port";

@Injectable()
export class DestinationsFindPaginatedService {
  constructor(
    @Inject('DestinationsRepository')
    private repo: DestinationsRepositoryPort,
  ) {}

  findPaginated(dto: DestinationsPaginatedRequestDto) : Promise<DestinationsPaginatedResponseDto> {
    return this.repo.findPaginated(dto);
  }
}
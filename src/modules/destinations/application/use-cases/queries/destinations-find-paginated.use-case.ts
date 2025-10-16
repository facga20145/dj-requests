import { Inject, Injectable } from "@nestjs/common";
import { DestinationsPaginatedResponseDto } from "../../dtos/destinations-paginated-response.dto";
import { DestinationsFindPaginatedService } from "src/modules/destinations/domain/services/queries/destinations-find-paginated.service";
import { DestinationsPaginatedRequestDto } from "../../dtos/destinations-paginated-request.dto";

@Injectable()
export class DestinationsFindPaginatedUseCase {
  constructor(
    @Inject('IFindPaginatedDestinations')
    private readonly destinationsFindPaginatedService: DestinationsFindPaginatedService
  ) {}
  async execute(dto: DestinationsPaginatedRequestDto): Promise<DestinationsPaginatedResponseDto> {

    return this.destinationsFindPaginatedService.findPaginated(dto);
  }
}

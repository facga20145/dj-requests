import { Inject, Injectable } from '@nestjs/common';
import { DestinationsUpdateStatusService } from 'src/modules/destinations/domain/services/commands/destinations-update-status.service';
import { DestinationsUpdateResponseDto } from '../../dtos/destinations-update-response.dto';


@Injectable()
export class DestinationsUpdateStatusUseCase {
  constructor(
    @Inject('IUpdateStatusDestination')
    private readonly destinationsUpdateStatusService: DestinationsUpdateStatusService
  ) {}

  async execute(id: string, status: boolean): Promise<DestinationsUpdateResponseDto> {
    return this.destinationsUpdateStatusService.updateStatus(id, status);
  }
}
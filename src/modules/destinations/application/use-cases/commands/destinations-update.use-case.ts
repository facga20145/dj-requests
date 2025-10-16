import { Inject, Injectable } from '@nestjs/common';
import { DestinationsUpdateService } from 'src/modules/destinations/domain/services/commands/destinations-update.service';
import { DestinationsUpdateRequestDto } from '../../dtos/destinations-update-request.dto';
import { DestinationsUpdateResponseDto } from '../../dtos/destinations-update-response.dto';

@Injectable()
export class DestinationsUpdateUseCase {
  constructor(
    @Inject('IUpdateDestination')
    private readonly service: DestinationsUpdateService,
  ) {}

  run(id: string, dto: DestinationsUpdateRequestDto): Promise<DestinationsUpdateResponseDto> {
    return this.service.update(id, dto);
  }
}

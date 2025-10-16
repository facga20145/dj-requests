import { Inject, Injectable } from '@nestjs/common';
import { DestinationsUpdateResponseDto } from 'src/modules/destinations/application/dtos/destinations-update-response.dto';
import { DestinationsRepositoryPort } from 'src/modules/destinations/infrastructure/adapters/ports/destinations-repository.port';

@Injectable()
export class DestinationsUpdateStatusService {
  constructor(
    @Inject('DestinationsRepository')
    private repo: DestinationsRepositoryPort,
  ) {}

  updateStatus(
    id: string,
    status: boolean,
  ): Promise<DestinationsUpdateResponseDto> {
    return this.repo.updateStatus(id, status);
  }
}

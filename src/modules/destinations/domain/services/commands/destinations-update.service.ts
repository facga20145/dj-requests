import { Inject, Injectable } from '@nestjs/common';
import { DestinationsUpdateRequestDto } from 'src/modules/destinations/application/dtos/destinations-update-request.dto';
import { DestinationsUpdateResponseDto } from 'src/modules/destinations/application/dtos/destinations-update-response.dto';
import { DestinationsRepositoryPort } from 'src/modules/destinations/infrastructure/adapters/ports/destinations-repository.port';

@Injectable()
export class DestinationsUpdateService {
  constructor(
    @Inject('DestinationsRepository')
    private readonly repo: DestinationsRepositoryPort,
  ) {}

  update(id: string, dto: DestinationsUpdateRequestDto): Promise<DestinationsUpdateResponseDto> {
    return this.repo.update(id, dto);
  }
}

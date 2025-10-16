import { Inject, Injectable } from '@nestjs/common';
import { DestinationsCreateResponseDto } from 'src/modules/destinations/application/dtos/destinations-create-response.dto';
import { DestinationsRepositoryPort } from 'src/modules/destinations/infrastructure/adapters/ports/destinations-repository.port';
  
@Injectable()
export class DestinationsFindAllService {
    constructor(
        @Inject('DestinationsRepository')
        private repo: DestinationsRepositoryPort,
    ) {}
      findAll(): Promise<DestinationsCreateResponseDto[]> {
    return this.repo.findAll();
  }
}
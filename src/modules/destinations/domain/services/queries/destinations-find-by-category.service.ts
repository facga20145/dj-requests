import { Inject, Injectable } from '@nestjs/common';
import { DestinationsCreateResponseDto } from 'src/modules/destinations/application/dtos/destinations-create-response.dto';
import { DestinationsRepositoryPort } from 'src/modules/destinations/infrastructure/adapters/ports/destinations-repository.port';

export interface IDestinationsFindByCategory {
  findByCategory(category: string): Promise<DestinationsCreateResponseDto[]>;
}

@Injectable()
export class DestinationsFindByCategoryService implements IDestinationsFindByCategory {
  constructor(
    @Inject('DestinationsRepository')
    private repo: DestinationsRepositoryPort,
  ) {}

  async findByCategory(category: string): Promise<DestinationsCreateResponseDto[]> {
    return this.repo.findByCategory(category);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { DestinationsFindByCategoryService } from 'src/modules/destinations/domain/services/queries/destinations-find-by-category.service';
import { DestinationsCreateResponseDto } from '../../dtos/destinations-create-response.dto';

@Injectable()
export class DestinationsFindByCategoryUseCase {
  constructor(
    @Inject('IFindByCategoryDestination')
    private readonly destinationsFindByCategoryService: DestinationsFindByCategoryService,
  ) {}

  async execute(category: string): Promise<DestinationsCreateResponseDto[]> {
    return this.destinationsFindByCategoryService.findByCategory(category);
  }
}

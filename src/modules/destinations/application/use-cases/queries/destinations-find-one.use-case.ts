import { Inject, Injectable } from '@nestjs/common';
import { DestinationsFindOneService } from 'src/modules/destinations/domain/services/queries/destinations-find-one.service';

@Injectable()
export class DestinationsFindOneUseCase {
  constructor(
    @Inject('IFindOneDestination')
    private readonly destinationsFindOneService: DestinationsFindOneService,
  ) {}

  async execute(id: string): Promise<any> {
    return this.destinationsFindOneService.findOne(id);
  }
}
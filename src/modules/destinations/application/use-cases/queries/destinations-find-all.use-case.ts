import { Inject, Injectable } from '@nestjs/common';
import { DestinationsFindAllService } from 'src/modules/destinations/domain/services/queries/destinations-find-all.service';
import { DestinationsCreateResponseDto } from '../../dtos/destinations-create-response.dto';
  
@Injectable()
export class DestinationsFindAllUseCase {
    constructor(
        @Inject('IFindAllDestinations')
        private readonly destinationsFindAllService: DestinationsFindAllService
    ) {}
    async execute(): Promise<DestinationsCreateResponseDto[]> {
        return this.destinationsFindAllService.findAll();
    }
}
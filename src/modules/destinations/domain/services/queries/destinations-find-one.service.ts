import { Inject, Injectable } from '@nestjs/common';
import { DestinationsUpdateResponseDto } from 'src/modules/destinations/application/dtos/destinations-update-response.dto';
import { DestinationsRepositoryPort } from 'src/modules/destinations/infrastructure/adapters/ports/destinations-repository.port';
 
export interface IDestinationsFindOne {
    findOne(id: string): Promise<DestinationsUpdateResponseDto>;
}
@Injectable()
export class DestinationsFindOneService implements IDestinationsFindOne {
    constructor(
        @Inject('DestinationsRepository')
        private repo: DestinationsRepositoryPort,
    ) {}

    async findOne(id: string): Promise<DestinationsUpdateResponseDto> {
        return this.repo.findOne(id);
    }
}
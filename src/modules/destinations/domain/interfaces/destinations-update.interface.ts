import { DestinationsUpdateRequestDto } from '../../application/dtos/destinations-update-request.dto';
import { DestinationsUpdateResponseDto } from '../../application/dtos/destinations-update-response.dto';

export interface IDestinationsUpdate {
  update(
    id: string,
    request: DestinationsUpdateRequestDto,
  ): Promise<DestinationsUpdateResponseDto>;
}

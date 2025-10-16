import { ApiProperty } from "@nestjs/swagger";

export class DestinationsUpdateResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() description: string;
  @ApiProperty() location: string;
  @ApiProperty() latitude: number;
  @ApiProperty() longitude: number;
  @ApiProperty() precio: number;
  @ApiProperty() category: string;
  @ApiProperty() status: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty({ type: Date, required: false, nullable: true }) updatedAt?: Date | null;
  @ApiProperty() status_code: number;
}

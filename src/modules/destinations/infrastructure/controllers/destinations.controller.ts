import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { DestinationsCreateUseCase } from '../../application/use-cases/commands/destinations-create.use-case';
import { DestinationsCreateRequestDto } from '../../application/dtos/destinations-create-request.dto';
import { DestinationsCreateResponseDto } from '../../application/dtos/destinations-create-response.dto';

import { DestinationsFindAllUseCase } from '../../application/use-cases/queries/destinations-find-all.use-case';
import { DestinationsFindOneUseCase } from '../../application/use-cases/queries/destinations-find-one.use-case';
import { DestinationsFindPaginatedUseCase } from '../../application/use-cases/queries/destinations-find-paginated.use-case';
import { DestinationsFindByCategoryUseCase } from '../../application/use-cases/queries/destinations-find-by-category.use-case';
import { DestinationsPaginatedResponseDto } from '../../application/dtos/destinations-paginated-response.dto';

import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';
import { DestinationsUpdateRequestDto } from '../../application/dtos/destinations-update-request.dto';
import { DestinationsUpdateResponseDto } from '../../application/dtos/destinations-update-response.dto';
import { DestinationsUpdateUseCase } from '../../application/use-cases/commands/destinations-update.use-case';
import { DestinationsUpdateStatusUseCase } from '../../application/use-cases/commands/destinations-update-status.use.case';
import { DestinationsPaginatedRequestDto } from '../../application/dtos/destinations-paginated-request.dto';

@Controller('destinations')
export class DestinationsController {
  constructor(
    private readonly createUseCase: DestinationsCreateUseCase,
    private readonly findAllUseCase: DestinationsFindAllUseCase,
    private readonly findOneUseCase: DestinationsFindOneUseCase,
    private readonly findPaginatedUseCase: DestinationsFindPaginatedUseCase,
    private readonly findByCategoryUseCase: DestinationsFindByCategoryUseCase,
    private readonly updateUseCase: DestinationsUpdateUseCase,
    private readonly updateStatusUseCase: DestinationsUpdateStatusUseCase,
  ) {}

  // POST /api/destinations
  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo destino',
    description: 'Crea un nuevo destino con la información proporcionada.',
  })
  @ApiSuccessResponse(
    HttpStatus.CREATED,
    'Destino creado exitosamente',
    DestinationsCreateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.FORBIDDEN,
    HttpStatus.CONFLICT,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async create(@Body() request: DestinationsCreateRequestDto) {
    return this.createUseCase.run(request);
  }

  // GET /api/destinations
  @Get()
  @ApiOperation({ summary: 'Listar todos los destinos' })
  @ApiResponse({ status: 200, type: [DestinationsCreateResponseDto] })
  async findAll(): Promise<DestinationsCreateResponseDto[]> {
    return this.findAllUseCase.execute();
  }

  // GET /api/destinations/category/:category
  @Get('category/:category')
  @ApiOperation({ summary: 'Obtener destinos por categoría' })
  @ApiResponse({ status: 200, type: [DestinationsCreateResponseDto] })
  async findByCategory(
    @Param('category') category: string,
  ): Promise<DestinationsCreateResponseDto[]> {
    return this.findByCategoryUseCase.execute(category);
  }

  // GET /api/destinations/:id
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un destino por ID' })
  @ApiResponse({ status: 200, type: DestinationsCreateResponseDto })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<DestinationsCreateResponseDto> {
    return this.findOneUseCase.execute(id);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Listar destinos paginados' })
  @ApiResponse({ status: 200, type: DestinationsPaginatedResponseDto })
  @ApiQuery({
    name: 'index',
    required: false,
    type: Number,
    example: 1,
    description: 'Número de página (1-based)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Cantidad de items por página',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'cusco',
    description: 'Filtro por nombre o ubicación',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
    example: 'playa',
    description: 'Filtro por categoría (playa, hotel, restaurante, etc.)',
  })
  @ApiQuery({
    name: 'precio',
    required: false,
    type: Boolean,
    example: true,
    description: 'Filtro por destinos con precio',
  })
  async findPaginated(@Query() query: DestinationsPaginatedRequestDto) {
    return this.findPaginatedUseCase.execute(query);
  }
  // PUT /api/destinations/:id
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un destino por id (UUID)' })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Destino actualizado',
    DestinationsUpdateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: DestinationsUpdateRequestDto,
  ): Promise<DestinationsUpdateResponseDto> {
    return this.updateUseCase.run(id, body);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de un destino' })
  @ApiResponse({ status: 200, type: DestinationsUpdateResponseDto })
  async updateStatus(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body('status') status: boolean,
  ): Promise<DestinationsUpdateResponseDto> {
    return this.updateStatusUseCase.execute(id, status);
  }
}

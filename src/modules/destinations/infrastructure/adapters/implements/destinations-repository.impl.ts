import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { DestinationsRepositoryPort } from '../ports/destinations-repository.port';
import { DestinationsUpdateRequestDto } from 'src/modules/destinations/application/dtos/destinations-update-request.dto';
import { DestinationsUpdateResponseDto } from 'src/modules/destinations/application/dtos/destinations-update-response.dto';
import { DestinationsCreateRequestDto } from 'src/modules/destinations/application/dtos/destinations-create-request.dto';
import { DestinationsCreateResponseDto } from 'src/modules/destinations/application/dtos/destinations-create-response.dto';
import { DestinationsPaginatedResponseDto } from 'src/modules/destinations/application/dtos/destinations-paginated-response.dto';
import { DestinationsPaginatedRequestDto } from 'src/modules/destinations/application/dtos/destinations-paginated-request.dto';

@Injectable()
export class DestinationsRepositoryImpl implements DestinationsRepositoryPort {
  constructor(private readonly prisma: PrismaService) { }

  async create(
    request: DestinationsCreateRequestDto,
  ): Promise<DestinationsCreateResponseDto> {
    try {
      const destination = await this.prisma.destinations.create({
        data: {
          name: request.name,
          description: request.description,
          location: request.location,
          latitude: request.latitude,
          longitude: request.longitude,
          precio: request.precio,
          category: request.category,
          status: request.status,
          updatedAt: null,
        },
      });
      return {
        id: destination.id,
        name: destination.name,
        description: destination.description,
        location: destination.location,
        latitude: destination.latitude?.toNumber(),
        longitude: destination.longitude?.toNumber(),
        precio: destination.precio.toNumber(),
        category: destination.category,
        status: destination.status,
        createdAt: destination.createdAt,
        updatedAt: destination.updatedAt || null,
        status_code: HttpStatus.CREATED,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('Duplicate value');
      }
      throw new BadRequestException('Could not create destination');
    }
  }

  async findOne(id: string): Promise<DestinationsCreateResponseDto> {
    const d = await this.prisma.destinations.findUnique({ where: { id } });
    if (!d) throw new NotFoundException('Destination not found');
    return {
      id: d.id,
      name: d.name,
      description: d.description,
      location: d.location,
      latitude: d.latitude?.toNumber(),
      longitude: d.longitude?.toNumber(),
      precio: d.precio.toNumber(),
      category: d.category,
      status: d.status,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt ?? null,
      status_code: HttpStatus.OK,
    };
  }

  async findAll(): Promise<DestinationsCreateResponseDto[]> {
    const destinations = await this.prisma.destinations.findMany();
    return destinations.map((destination) => ({
      id: destination.id,
      name: destination.name,
      description: destination.description,
      location: destination.location,
      latitude: destination.latitude?.toNumber(),
      longitude: destination.longitude?.toNumber(),
      precio: destination.precio.toNumber(),
      category: destination.category,
      status: destination.status,
      createdAt: destination.createdAt,
      updatedAt: destination.updatedAt || null,
      status_code: HttpStatus.OK,
      message: 'Destinations found successfully',
    }));
  }

  async findByCategory(category: string): Promise<DestinationsCreateResponseDto[]> {
    const destinations = await this.prisma.destinations.findMany({
      where: { category },
    });
    return destinations.map((destination) => ({
      id: destination.id,
      name: destination.name,
      description: destination.description,
      location: destination.location,
      latitude: destination.latitude?.toNumber(),
      longitude: destination.longitude?.toNumber(),
      precio: destination.precio.toNumber(),
      category: destination.category,
      status: destination.status,
      createdAt: destination.createdAt,
      updatedAt: destination.updatedAt || null,
      status_code: HttpStatus.OK,
      message: `Destinations found successfully for category: ${category}`,
    }));
  }

  async findPaginated(
    params: DestinationsPaginatedRequestDto,
  ): Promise<DestinationsPaginatedResponseDto> {
    const page = Math.max(1, Number(params.index ?? 1));
    const limit = Math.max(1, Math.min(100, Number(params.limit ?? 10)));
    const skip = (page - 1) * limit;

    const where: Prisma.DestinationsWhereInput = {
      ...(params.search
        ? {
          OR: [
            { name: { contains: params.search, mode: Prisma.QueryMode.insensitive } },
            { location: { contains: params.search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
        : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.precio !== undefined ? { precio: params.precio } : {}),
    };

    const [items, totalItems] = await this.prisma.$transaction([
      this.prisma.destinations.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.destinations.count({ where }),
    ]);

    return {
      items: items.map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        location: d.location,
        latitude: d.latitude?.toNumber(),
        longitude: d.longitude?.toNumber(),
        precio: d.precio.toNumber(),
        category: d.category,
        status: d.status,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt ?? null,
        status_code: HttpStatus.OK,
        message: 'Destination found successfully',
      })),
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    };
  }

  async update(
    id: string,
    dto: DestinationsUpdateRequestDto,
  ): Promise<DestinationsUpdateResponseDto> {
    const data: Prisma.DestinationsUpdateInput = {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      ...(dto.location !== undefined ? { location: dto.location } : {}),
      ...(dto.latitude !== undefined ? { latitude: dto.latitude } : {}),
      ...(dto.longitude !== undefined ? { longitude: dto.longitude } : {}),
      ...(dto.precio !== undefined ? { precio: dto.precio } : {}),
      ...(dto.category !== undefined ? { category: dto.category } : {}),
      ...(dto.status !== undefined ? { status: dto.status } : {}),
      updatedAt: new Date(),
    };
    try {
      const updatedDestination = await this.prisma.destinations.update({
        where: { id },
        data,
      });
      return {
        id: updatedDestination.id,
        name: updatedDestination.name,
        description: updatedDestination.description,
        location: updatedDestination.location,
        latitude: updatedDestination.latitude?.toNumber(),
        longitude: updatedDestination.longitude?.toNumber(),
        precio: updatedDestination.precio.toNumber(),
        category: updatedDestination.category,
        status: updatedDestination.status,
        createdAt: updatedDestination.createdAt,
        updatedAt: updatedDestination.updatedAt,
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') throw new NotFoundException('Destination not found');
      }
      throw new BadRequestException('Could not update destination');
    }
  }

  async updateStatus(
    id: string,
    status: boolean,
  ): Promise<DestinationsUpdateResponseDto> {
    try {
      const updatedDestination = await this.prisma.destinations.update({
        where: { id },
        data: { status, updatedAt: new Date() },
      });
      return {
        id: updatedDestination.id,
        name: updatedDestination.name,
        description: updatedDestination.description,
        location: updatedDestination.location,
        latitude: updatedDestination.latitude?.toNumber(),
        longitude: updatedDestination.longitude?.toNumber(),
        precio: updatedDestination.precio.toNumber(),
        category: updatedDestination.category,
        status: updatedDestination.status,
        createdAt: updatedDestination.createdAt,
        updatedAt: updatedDestination.updatedAt,
        status_code: HttpStatus.OK,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException('Destination not found');
      }
      throw new BadRequestException('Could not update destination status');
    }
  }
}

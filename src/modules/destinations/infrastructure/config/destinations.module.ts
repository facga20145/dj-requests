import { Module } from '@nestjs/common';
import { DestinationsController } from '../controllers/destinations.controller';
import { PrismaService } from 'prisma/prisma.service';
import { DestinationsCreateService } from '../../domain/services/commands/destinations-create.service';
import { DestinationsCreateUseCase } from '../../application/use-cases/commands/destinations-create.use-case';
import { DestinationsRepositoryImpl } from '../adapters/implements/destinations-repository.impl';
import { DestinationsFindPaginatedUseCase } from '../../application/use-cases/queries/destinations-find-paginated.use-case';
import { DestinationsFindAllUseCase } from '../../application/use-cases/queries/destinations-find-all.use-case';
import { DestinationsFindOneUseCase } from '../../application/use-cases/queries/destinations-find-one.use-case';
import { DestinationsFindByCategoryUseCase } from '../../application/use-cases/queries/destinations-find-by-category.use-case';
import { DestinationsFindPaginatedService } from '../../domain/services/queries/destinations-find-paginated.service';
import { DestinationsFindAllService } from '../../domain/services/queries/destinations-find-all.service';
import { DestinationsFindOneService } from '../../domain/services/queries/destinations-find-one.service';
import { DestinationsFindByCategoryService } from '../../domain/services/queries/destinations-find-by-category.service';
import { DestinationsUpdateService } from '../../domain/services/commands/destinations-update.service';
import { DestinationsUpdateUseCase } from '../../application/use-cases/commands/destinations-update.use-case';
import { DestinationsUpdateStatusService } from '../../domain/services/commands/destinations-update-status.service';
import { DestinationsUpdateStatusUseCase } from '../../application/use-cases/commands/destinations-update-status.use.case';

@Module({
  imports: [],
  controllers: [DestinationsController],
  providers: [
    // Core services
    PrismaService,
    
    // Repository
    {
      provide: 'DestinationsRepository',
      useClass: DestinationsRepositoryImpl,
    },

    // Domain services
    {
      provide: 'ICreateDestination',
      useClass: DestinationsCreateService,
    },
    {
      provide: 'IFindAllDestinations',
      useClass: DestinationsFindAllService,
    },
    {
      provide: 'IFindOneDestination',
      useClass: DestinationsFindOneService,
    },
    {
      provide: 'IFindByCategoryDestination',
      useClass: DestinationsFindByCategoryService,
    },
    {
      provide: 'IFindPaginatedDestinations',
      useClass: DestinationsFindPaginatedService,
    },
    {
      provide: 'IUpdateDestination',
      useClass: DestinationsUpdateService,
    },
    {
      provide: 'IUpdateStatusDestination',
      useClass: DestinationsUpdateStatusService,
    },

    // Use cases
    DestinationsCreateUseCase,
    DestinationsFindAllUseCase,
    DestinationsFindOneUseCase,
    DestinationsFindByCategoryUseCase,
    DestinationsFindPaginatedUseCase,
    DestinationsUpdateUseCase,
    DestinationsUpdateStatusUseCase,
  ],
})
export class DestinationsModule {}

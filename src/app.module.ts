import { UsersModule } from './modules/users/config/users.module';
import { RequestsModule } from './modules/requests/config/requests.module';
import { UserRolesModule } from './modules/user-roles/config/user-roles.module';
import { RequestStatusModule } from './modules/request-status/config/request-status.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RequestStatusModule, UserRolesModule, RequestsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

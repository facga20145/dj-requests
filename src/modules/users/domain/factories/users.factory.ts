import { UsersEntity } from '../entities/users.entity';
import { IUsersCreate } from '../interfaces/users-create.interface';
import { IUsersUpdate } from '../interfaces/users-update.interface';

export class UsersFactory {
  static create(params: IUsersCreate): Omit<UsersEntity, 'id' | 'createdAt'> {
    return {
      name: params.name,
      email: params.email,
      roleId: params.roleId,
    };
  }

  static update(params: IUsersUpdate): Partial<Omit<UsersEntity, 'id' | 'createdAt'>> {
    return {
      ...(params.name && { name: params.name }),
      ...(params.email && { email: params.email }),
      ...(params.roleId && { roleId: params.roleId }),
    };
  }

  static toEntity(data: any): UsersEntity {
    return new UsersEntity({
      id: data.id,
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      createdAt: data.createdAt,
    });
  }
}
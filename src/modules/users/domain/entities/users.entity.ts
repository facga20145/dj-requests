export class UsersEntity {
  id: string;
  name: string;
  email?: string;
  roleId: number;
  createdAt: Date;

  constructor(params: {
    id: string;
    name: string;
    email?: string;
    roleId: number;
    createdAt: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.roleId = params.roleId;
    this.createdAt = params.createdAt;
  }
}
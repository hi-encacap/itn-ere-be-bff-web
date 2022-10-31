import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleMappingEntity } from '../entities/user-role-mapping.entity';

export class UserRoleMappingService {
  constructor(
    @InjectRepository(UserRoleMappingEntity)
    private readonly userRoleMappingRepository: Repository<UserRoleMappingEntity>,
  ) {}

  create(userId: number, roleIds: number[]) {
    const userRoleMappings = roleIds.map((roleId) => ({
      userId,
      roleId,
    }));
    return this.userRoleMappingRepository.save(userRoleMappings);
  }
}

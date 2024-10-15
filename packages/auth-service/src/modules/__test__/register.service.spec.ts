import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from '../services/register.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@shared/entities/user.entity';
import { UserState } from '@shared/entities/user_state.entity';
import { PlayerDTO } from '@shared/DTOs/player.dto';
import { ValidationService } from '../services/validation.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let userRepository: Repository<User>;
  let userStateRepository: Repository<UserState>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        ValidationService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserState),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userStateRepository = module.get<Repository<UserState>>(
      getRepositoryToken(UserState),
    );
  });

  it('should return true and insert user if DTO is valid and user does not exist', async () => {
    const validDTO: PlayerDTO = { id: 'user1', password: 'password' };

    const mockUserEntity = { id: 'user1', password: 'hashedPassword' } as User;
    const mockUserStateEntity = {
      id: 'user1',
      receive_time: 0,
      last_login_time: 0,
      last_login_ip: '',
    } as UserState;

    jest.spyOn(service, 'validateDTO').mockReturnValue(true);
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);
    jest.spyOn(userRepository, 'create').mockReturnValue(mockUserEntity);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUserEntity);
    jest
      .spyOn(userStateRepository, 'save')
      .mockResolvedValue(mockUserStateEntity);

    const result = await service.insertToDatabase(validDTO);

    expect(result).toBe(true);
    expect(userRepository.create).toHaveBeenCalledWith(validDTO);
    expect(userRepository.save).toHaveBeenCalledWith(mockUserEntity);
    expect(userStateRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'user1',
        receive_time: 0,
        last_login_time: 0,
        last_login_ip: '',
      }),
    );
  });
});

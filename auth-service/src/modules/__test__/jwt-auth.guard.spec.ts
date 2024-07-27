import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(() => {
    jwtAuthGuard = new JwtAuthGuard();
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should call super.canActivate', () => {
      const context = {} as ExecutionContext;
      const canActivateSpy = jest
        .spyOn(AuthGuard('jwt').prototype, 'canActivate')
        .mockReturnValue(true);

      const result = jwtAuthGuard.canActivate(context);
      expect(canActivateSpy).toHaveBeenCalledWith(context);
      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should return user if no error and user is valid', () => {
      const user = { id: 'test-user' };
      const result = jwtAuthGuard.handleRequest(null, user);
      expect(result).toBe(user);
    });

    it('should throw UnauthorizedException if error is present', () => {
      const error = new UnauthorizedException('Test error');
      expect(() => jwtAuthGuard.handleRequest(error, null)).toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user is not valid', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null)).toThrow(
        UnauthorizedException,
      );
    });
  });
});

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { User } from '../../systems/user/user.entity';
import { Authentication } from '../authentication.interface';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  private generateToken(payload: any, expiresIn: StringValue, secret: string): string {
    return this._jwtService.sign(payload, { expiresIn, secret });
  }

  async generateAccessAndRefreshTokens(user: User): Promise<Authentication.SignInResponse> {
    const payload = { sub: user.id, email: user.email, role: user.rolId, purpose: 'sign in / sign up' };

    const secret = this._configService.get<string>('SECRET_KEY')!;
    const token = this.generateToken(payload, '5h', secret);

    const refreshPayload = { sub: user.id, email: user.email, purpose: 'refresh' };
    const refreshToken = this.generateToken(refreshPayload, '10h', secret);

    return { uid: user.id, full_name: user.person.fullName, email: user.email, token, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<Authentication.RefreshTokenResponse> {
    try {
      const payload = await this._jwtService.verifyAsync(refreshToken);
      if (payload.purpose !== 'refresh') throw new UnauthorizedException('El refresh token proporcionado no es válido');

      const user = await this._userRepository.findOne({ where: { email: payload.email } });
      if (!user) throw new UnauthorizedException('Usuario no encontrado.');

      const newPayload = { sub: user.id, email: user.email, purpose: 'newToken' };
      const secret = this._configService.get<string>('SECRET_KEY')!;
      const newToken = this.generateToken(newPayload, '5h', secret);

      return { token: newToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async validateUserFromPayload(payload: any): Promise<User | null> {
    if (!payload?.sub || !payload?.email) return null;

    return await this._userRepository.findOne({
      where: { id: payload.sub, email: payload.email },
      relations: { rol: true },
    });
  }

  async generateResetToken(userId: number): Promise<string> {
    const payload = { sub: userId, purpose: 'reset' };

    const secret = this._configService.get<string>('SECRET_KEY')!;

    return this.generateToken(payload, '15m', secret);
  }

  async validateResetToken(token: string): Promise<number> {
    try {
      const secret = this._configService.get<string>('SECRET_KEY')!;

      const payload = await this._jwtService.verifyAsync(token, { secret });
      if (payload.purpose !== 'reset') throw new UnauthorizedException('Token inválido para reset');

      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Token de recuperación inválido o expirado');
    }
  }
}

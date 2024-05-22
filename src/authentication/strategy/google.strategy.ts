import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

import { AuthenticationService } from '../authentication.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _tokenService: TokenService,
    config: ConfigService,
  ) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    if (!email) throw new UnauthorizedException('No fue posible obtener el correo electrónico desde Google.');

    const user = await this._authService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('La cuenta no está registrada en el sistema.');

    const tokens = await this._tokenService.generateAccessAndRefreshTokens(user);

    return { user, accessToken: tokens.token, refreshToken: tokens.refreshToken };
  }
}

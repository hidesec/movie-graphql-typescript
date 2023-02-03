import { Module } from '@nestjs/common';
import { AuthResolver } from '@resolver/auth/auth.resolver';
import { LocalStrategy } from '@core/auth/local.strategy';
import { AuthService } from '@services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthorModule } from '../author/author.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@core/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    AuthorModule,
    JwtModule.register({
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
      secret: process.env.JWTKEY,
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

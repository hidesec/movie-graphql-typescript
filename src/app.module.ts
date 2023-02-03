import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { AuthorModule } from './module/author/author.module';
import { AuthModule } from './module/auth/auth.module';
import { ActorModule } from './module/actor/actor.module';
import { MovieModule } from './module/movie/movie.module';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthorModule,
    AuthModule,
    ActorModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

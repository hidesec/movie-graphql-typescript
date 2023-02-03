import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '@core/constants';
import { databaseConfig } from '@core/database/database.config';
import { Author } from '@models/author/author.entity';
import { Actor } from '@models/actor/actor.entity';
import { Movie } from '@models/movie/movie.entity';
import { ActorMovie } from '@models/actormovie/actormovie.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Author, Actor, Movie, ActorMovie]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

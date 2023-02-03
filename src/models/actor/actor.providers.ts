import { Actor } from '@models/actor/actor.entity';
import { ACTOR_REPOSITORY } from '@core/constants';

export const actorsProviders = [
  {
    provide: ACTOR_REPOSITORY,
    useValue: Actor,
  },
];

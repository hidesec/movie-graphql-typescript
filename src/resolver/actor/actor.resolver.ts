import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActorService } from '@services/actor/actor.service';
import { Actor } from '@models/actor/actor.entity';
import { CreateActorInput } from '@dto/create-actor.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { CreateActorResponse } from '@dto/create-actor-response';
import { UpdateMovieResponse } from '@dto/update-movie-response';
import { UpdateActorInput } from '@dto/update-actor.input';

@Resolver(() => Actor)
export class ActorResolver {
  constructor(private actorService: ActorService) {}

  @Mutation(() => CreateActorResponse)
  @UseGuards(JwtAuthGuard)
  createActor(
    @Args('createActorInput') createActorInput: CreateActorInput,
    @Context() context,
  ): Promise<Actor> {
    return this.actorService.create(createActorInput, context.req.user.email);
  }

  @Mutation(() => UpdateMovieResponse)
  @UseGuards(JwtAuthGuard)
  updateActor(@Args('updateActorInput') updateActorInput: UpdateActorInput) {
    return this.actorService.update(updateActorInput);
  }

  @Query(() => [Actor])
  @UseGuards(JwtAuthGuard)
  actors(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Query(() => Actor)
  @UseGuards(JwtAuthGuard)
  getActor(
    @Args('actorId', { type: () => Int }) actorId: number,
  ): Promise<Actor> {
    return this.actorService.findOne(actorId);
  }

  @Mutation(() => Actor)
  @UseGuards(JwtAuthGuard)
  deleteActor(
    @Args('actorId', { type: () => Int }) actorId: number,
  ): Promise<Actor> {
    return this.actorService.destroy(actorId);
  }
}

import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from '@services/movie/movie.service';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateMovieInput } from '@dto/create-movie.input';
import { Movie } from '@models/movie/movie.entity';
import { CreateMovieResponse } from '@dto/create-movie-response';
import { UpdateMovieInput } from '@dto/update-movie.input';
import { UpdateMovieResponse } from '@dto/update-movie-response';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Mutation(() => CreateMovieResponse)
  @UseGuards(JwtAuthGuard)
  createMovie(
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
    @Context() context,
  ): Promise<Movie> {
    return this.movieService.create(createMovieInput, context.req.user.email);
  }

  @Mutation(() => UpdateMovieResponse)
  @UseGuards(JwtAuthGuard)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.movieService.update(updateMovieInput);
  }

  @Query(() => [Movie])
  @UseGuards(JwtAuthGuard)
  movies(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Query(() => Movie)
  @UseGuards(JwtAuthGuard)
  getMovie(
    @Args('movieId', { type: () => Int }) movieId: number,
  ): Promise<Movie> {
    return this.movieService.findOne(movieId);
  }

  @Mutation(() => Movie)
  @UseGuards(JwtAuthGuard)
  deleteMovie(
    @Args('movieId', { type: () => Int }) movieId: number,
  ): Promise<Movie> {
    return this.movieService.destroy(movieId);
  }
}

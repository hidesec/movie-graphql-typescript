import { Args, Resolver, Query } from '@nestjs/graphql';
import { AuthorService } from '@services/author/author.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@core/auth/jwt-auth.guard';
import { Author } from '@models/author/author.entity';

@Resolver()
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author], { name: 'authors' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.authorService.findAll();
  }
  @Query(() => Author, { name: 'author' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('email') email: string) {
    return this.authorService.findOne(email);
  }
}

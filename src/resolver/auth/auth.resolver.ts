import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@services/auth/auth.service';
import { LoginResponse } from '@dto/login-response';
import { LoginAuthorInput } from '@dto/login-author.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@core/auth/gql-auth.guard';
import { CreateAuthorInput } from '@dto/create-author.input';
import { Author } from '@models/author/author.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginAuthorInput') loginAuthorInput: LoginAuthorInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => Author)
  signup(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput) {
    return this.authService.signup(createAuthorInput);
  }
}

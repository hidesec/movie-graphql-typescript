import { Module } from '@nestjs/common';
import { AuthorService } from '@services/author/author.service';
import { AuthorResolver } from '@resolver/author/author.resolver';
import { authorsProviders } from '@models/author/author.providers';

@Module({
  providers: [AuthorResolver, AuthorService, ...authorsProviders],
  exports: [AuthorService],
})
export class AuthorModule {}

import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthorInput } from '@dto/create-author.input';
import { AUTHOR_REPOSITORY } from '@core/constants';
import { Author } from '@models/author/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @Inject(AUTHOR_REPOSITORY) private readonly authorRepository: typeof Author,
  ) {}

  async create(createAuthorInput: CreateAuthorInput) {
    return await this.authorRepository.create<Author>(createAuthorInput);
  }

  async findAll() {
    return await this.authorRepository.findAll<Author>({
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async findOne(email: string) {
    return await this.authorRepository.findOne<Author>({
      where: { email },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { AuthorService } from '@services/author/author.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthorInput } from '@dto/create-author.input';
import { Author } from '@models/author/author.entity';

@Injectable()
export class AuthService {
  constructor(
    private authorsService: AuthorService,
    private jwtService: JwtService,
  ) {}

  async validateAuthor(email: string, password: string) {
    const author = await this.authorsService.findOne(email);

    const validPassword = await bcrypt.compare(password, author.password);

    if (author && validPassword) {
      const { password, ...result } = author.dataValues;
      return result;
    }

    return null;
  }

  async login(author: Author) {
    const { password, ...result } = author;
    return {
      access_token: this.jwtService.sign({
        name: author.name,
        email: author.email,
        id: author.id,
      }),
      author: result,
    };
  }

  async signup(loginAuthorInput: CreateAuthorInput) {
    const author = await this.authorsService.findOne(loginAuthorInput.email);

    if (author) {
      throw new Error('Author already exists!');
    }

    const password = await bcrypt.hash(loginAuthorInput.password, 10);

    return this.authorsService.create({
      ...loginAuthorInput,
      password,
    });
  }
}

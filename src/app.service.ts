import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMain(): any {
    return {
      name: 'any-backend',
      version: '0.0.1',
      description: 'REST API with NESTJS',
      author: 'fconcha & jmunozlo',
    };
  }
}

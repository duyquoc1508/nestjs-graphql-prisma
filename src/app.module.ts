import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { PetsService } from './pets/pets.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    PetsModule,
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, PetsService]
})
export class AppModule {}

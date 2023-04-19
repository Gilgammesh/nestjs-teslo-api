import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, _, cb) => {
          const urlParts = req.url.split('/');
          const path = urlParts[urlParts.length - 1];
          const destination = join('uploads', path);
          if (!existsSync(destination)) {
            mkdirSync(destination, { recursive: true });
          }
          cb(null, destination);
        },
        filename: (_, file, cb) => {
          const fileOriginalNameParts = file.originalname.split('.');
          const fileExtension = fileOriginalNameParts[fileOriginalNameParts.length - 1];
          const filename = `${uuidv4()}.${fileExtension}`;
          cb(null, filename);
        }
      })
    })
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}

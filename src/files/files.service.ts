import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class FilesService {
  async uploadProductFile(fileName: string) {
    const url = `${AppConfig().hostApi}/files/products/${fileName}`;
    return url;
  }

  findOneProductFile(fileName: string) {
    const path = join(__dirname, '../../', 'uploads', 'products', fileName);
    if (!existsSync(path)) {
      throw new HttpException(`No product file found with filename ${fileName}`, HttpStatus.BAD_REQUEST);
    }
    return path;
  }
}

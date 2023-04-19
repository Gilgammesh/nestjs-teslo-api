import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  ParseFilePipe,
  Get,
  Param,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('products')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductFile(
    @UploadedFile(
      new ParseFilePipe(),
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(image\/(png|jpeg|svg\+xml))/
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1000 * 1000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    return this.filesService.uploadProductFile(file.filename);
  }

  @Get('products/:fileName')
  findOneProductFile(@Res() res: Response, @Param('fileName') fileName: string) {
    res.sendFile(this.filesService.findOneProductFile(fileName));
  }
}

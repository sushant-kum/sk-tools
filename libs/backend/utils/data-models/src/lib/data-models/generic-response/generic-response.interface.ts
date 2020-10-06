import { ApiProperty } from '@nestjs/swagger';

export class GenericResponse {
  @ApiProperty({
    required: true,
    type: String,
  })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

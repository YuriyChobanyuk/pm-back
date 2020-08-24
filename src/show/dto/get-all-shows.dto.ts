import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllShowsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Max(100)
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;
}

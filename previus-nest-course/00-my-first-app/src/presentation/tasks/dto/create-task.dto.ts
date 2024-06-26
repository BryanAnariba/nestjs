import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    name: string;
    
}

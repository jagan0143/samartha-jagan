import { ApiProperty } from "@nestjs/swagger";


export class NewAgriEnterpriseDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    mobileNumber: string;

    @ApiProperty()
    emailId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    userType: string;

    @ApiProperty()
    type: string;
} 
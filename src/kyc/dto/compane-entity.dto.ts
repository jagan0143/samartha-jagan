import { ApiProperty } from "@nestjs/swagger";

export class CompanyEntityDto {
    @ApiProperty()
    kycType: string;

    @ApiProperty()
    addressProofType: string;

    @ApiProperty()
    addressProofUrl: [string];

    @ApiProperty()
    identityProofType: string;
    
    @ApiProperty()
    identityProofUrl: [string];
}
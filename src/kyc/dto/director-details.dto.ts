import { ApiProperty } from "@nestjs/swagger"

export class DirectorDetailsDto {
    @ApiProperty()
    din: string

    @ApiProperty()
    dateOfBirth: string

    @ApiProperty()
    mobileNumber: string

    @ApiProperty()
    emailId: string

    @ApiProperty()
    address: string

    @ApiProperty()
    addressProofType: string

    @ApiProperty()
    addressProofUrl: string

    @ApiProperty()
    shareHolding: string

    @ApiProperty()
    shareHoldingUrl: string

    kycVerification: string
}
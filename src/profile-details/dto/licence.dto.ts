import { ApiProperty } from "@nestjs/swagger";

export class LicenceDto {
    @ApiProperty()
    licenseType: string;

    @ApiProperty()
    licenseUrl: [string];

    @ApiProperty()
    otherType: string;
}
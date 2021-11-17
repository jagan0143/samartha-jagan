import { ApiProperty } from "@nestjs/swagger";

export class CompanyDetailsPage1Dto {
    @ApiProperty()
    panNumber: string;

    @ApiProperty()
    panImgUrl: [string];

    @ApiProperty()
    companyName: string;

    @ApiProperty()
    gstId: string;

    @ApiProperty()
    gstImgUrl: [string];

    @ApiProperty()
    contactName: string;

    @ApiProperty()
    designation: string;

    @ApiProperty()
    mobileNumber: string;

    @ApiProperty()
    emailId: string; 

}

export class CompanyDetailsPage2Dto {
    @ApiProperty()
    registeredAs: string;

    @ApiProperty()
    aboutTheCompany: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    incorporationDate: string;

    @ApiProperty()
    incorporationDocUrl: [string];

    @ApiProperty()
    businessType: string;

    @ApiProperty()
    sector:string 
}

export class CompanyDetailsPage3Dto {
    @ApiProperty()
    stateOfOperation: string;

    @ApiProperty()
    valueChain: string;

    @ApiProperty()
    corporateBrochureUrl: [string];

    @ApiProperty()
    shareholdingUrl: string;

    @ApiProperty()
    associationArticleUrl: [string];

    @ApiProperty()
    associationMemorandumUrl: [string];
}
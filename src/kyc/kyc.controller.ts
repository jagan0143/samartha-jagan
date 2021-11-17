import { Body, Controller, Patch, Post, Query, Request } from '@nestjs/common';
import { AgriEnterpriseService } from 'src/agri-enterprise/agri-enterprise.service';
import { BuyersDto, SellersDto } from './dto/buyer-seller.dto';
import { CompanyEntityDto } from './dto/compane-entity.dto';
import { DirectorDetailsDto } from './dto/director-details.dto';
import { KycService } from './kyc.service';


@Controller('kyc')
export class KycController {
    constructor(
        private readonly agriEnterpriseService: AgriEnterpriseService,
        private readonly kycService: KycService
        ) {}

    @Post()
    async newKyc(@Request() req: any, @Body('directorDetails') directorDetails: [DirectorDetailsDto], @Query('applicationId') applicationId: string) {
        const agriEnterprise = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
        const newKyc = await this.kycService.createNewKyc(agriEnterprise, directorDetails);
        const updatedApplication = await this.agriEnterpriseService.addKycToApplication(agriEnterprise._id, applicationId, newKyc._id);
        return {application: updatedApplication, kyc: newKyc};
    }

    @Patch('directorDetails')
    async updateDirectorDetails(@Request() req: any, @Body('directorDetails') directorDetails: [DirectorDetailsDto], @Query('applicationId') applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        const updatedKyc = await this.kycService.updateDirectorDetails(application.kycId, directorDetails);
        return updatedKyc;
    }

    @Patch('companyEntity')
    async updateCompanyEntity(@Request() req: any, @Body('companyEntity') companyEntity: CompanyEntityDto, @Query('applicationId') applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        const updatedKyc = await this.kycService.updateCompanyEntity(application.kycId, companyEntity);
        return updatedKyc;
    }

    @Patch('buyerSellerDetails')
    async updateBuyerSellerDetails(@Request() req: any, @Body('buyers') buyers: [BuyersDto], @Body('sellers') sellers: [SellersDto], @Query('applicationId') applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        const updatedKyc = await this.kycService.updateBuyerSellerDetails(application.kycId, buyers, sellers);
        return updatedKyc;
    }
}
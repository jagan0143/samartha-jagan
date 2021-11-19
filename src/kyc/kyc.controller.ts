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
    ) { }

    @Patch('directorDetails')
    async updateDirectorDetails(@Request() req: any, @Body('directorDetails') directorDetails: [DirectorDetailsDto], @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            if(application.applicationStatus.profileStatus === "completed")
            {
                if (!(application.kycId === null)) {
                    const updatedKyc = await this.kycService.updateDirectorDetails(application.kycId, directorDetails);
                    return {
                        status: 200,
                        message: "success",
                        application: application,
                        updatedKyc: updatedKyc
                    };
                }
                else {
                    const agriEnterprise = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
                    const newKyc = await this.kycService.createNewKyc(agriEnterprise, directorDetails);
                    const updatedApplication = await this.agriEnterpriseService.addKycToApplication(agriEnterprise._id, applicationId, newKyc._id);
                    return {
                        status: 200,
                        message: "success",
                        application: updatedApplication,
                        updatedKyc: newKyc
                    };
                }
            }
            else {
                return {
                    status: 400,
                    message: "Failed",
                    error: "ProfileDetails not updated"
                }
            }
        } catch (err) {
            return {
                status: 400,
                message: "Failed",
                error: err
            }
        }
    }

    @Patch('companyEntity')
    async updateCompanyEntity(@Request() req: any, @Body('companyEntity') companyEntity: CompanyEntityDto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedKyc = await this.kycService.updateCompanyEntity(application.kycId, companyEntity);
            return {
                status: 200,
                message: "success",
                application: application,
                updatedKyc: updatedKyc
            };
        } catch (err) {
            return {
                status: 400,
                message: "Failed",
                error: err
            }
        }
    }

    @Patch('buyerSellerDetails')
    async updateBuyerSellerDetails(@Request() req: any, @Body('buyers') buyers: [BuyersDto], @Body('sellers') sellers: [SellersDto], @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedKyc = await this.kycService.updateBuyerSellerDetails(application.kycId, buyers, sellers);
            const updatedapplication = await this.agriEnterpriseService.updateApplicationStatus(req.user.mobile, applicationId, "kyc", "completed");
            return {
                status: 200,
                message: "success",
                application: updatedapplication,
                updatedKyc: updatedKyc
            };
        } catch (err) {
            return {
                status: 400,
                message: "Failed",
                error: err
            }
        }
    }
}
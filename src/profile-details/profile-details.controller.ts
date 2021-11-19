import { Body, Controller, Get, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgriEnterpriseService } from 'src/agri-enterprise/agri-enterprise.service';
import { FirmAddressDetails } from 'src/database/schema/profile_sub_schema/firmaddress.details';
import { CompanyDetailsPage1Dto, CompanyDetailsPage2Dto, CompanyDetailsPage3Dto } from './dto/company.details.dto';
import { FirmAddressDetailsDto } from './dto/firm-address-details.dto';
import { LicenceDto } from './dto/licence.dto';
import { ProfileDetailsService } from './profile-details.service';

@ApiTags('ProfileDetails')
@Controller('profile-details')
export class ProfileDetailsController {
    constructor(
        private readonly profileDetailsService: ProfileDetailsService,
        private readonly agriEnterpriseService: AgriEnterpriseService
    ) { }

    @Post()
    async newApplication(@Request() req: any, @Body('companyDeatilspage1') companydetailsPage1: CompanyDetailsPage1Dto) {
        try {
            const agriEnterprise = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
            const newProfile = await this.profileDetailsService.createNewProfile(agriEnterprise, companydetailsPage1);
            const application = await this.agriEnterpriseService.createApplication(agriEnterprise._id, newProfile._id, newProfile.createdAt);
            return {
                status: 200,
                message: "New application and profile created",
                newApplication: application,
                newProfile: newProfile
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }

    @Patch("page1")
    async updatePage1(@Request() req: any, @Body('companyDeatilspage1') companydetailsPage1: CompanyDetailsPage1Dto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedProfile = await this.profileDetailsService.updateCompanyDetailsPage1(application.profileDetailsId, companydetailsPage1);
            return  {
                status: 200,
                message: "success",
                application: application,
                updatedProfile: updatedProfile
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            };
        }
    }

    @Patch("page2")
    async updatePage2(@Request() req: any, @Body('companyDeatilspage2') companydetailsPage2: CompanyDetailsPage2Dto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedProfile = await this.profileDetailsService.updateCompanyDetailsPage2(application.profileDetailsId, companydetailsPage2);
            return {
                status: 200,
                message: "success",
                application: application,
                updatedProfile: updatedProfile
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            };
        }
    }

    @Patch("page3")
    async updatePage3(@Request() req: any, @Body('companyDeatilspage3') companydetailsPage3: CompanyDetailsPage3Dto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedProfile = await this.profileDetailsService.updateCompanyDetailsPage3(application.profileDetailsId, companydetailsPage3);
            return {
                status: 200,
                message: "success",
                application: application,
                updatedProfile: updatedProfile
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            };
        }
    }

    @Patch("license")
    async updateLicense(@Request() req: any, @Body('license') license: [LicenceDto], @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedProfile = await this.profileDetailsService.updateLicense(application.profileDetailsId, license);
            return {
                status: 200,
                message: "success",
                application: application,
                updatedProfile: updatedProfile
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            };
        }
    }

    @Patch("firmAddressDetails")
    async updatefirmAddressDetails(@Request() req: any, @Body('firmAddressDetails') firmAddressDetails: FirmAddressDetailsDto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedProfile = await this.profileDetailsService.updateFirmAddressDetails(application.profileDetailsId, firmAddressDetails);
            const updatedapplication = await this.agriEnterpriseService.updateApplicationStatus(req.user.mobile, applicationId, "profile", "completed")
            return {
                status: 200,
                message: "success",
                application: updatedapplication,
                updatedProfile: updatedProfile
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            };
        }
    }

}

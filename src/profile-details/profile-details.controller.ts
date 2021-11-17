import { Body, Controller, Get, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgriEnterpriseService } from 'src/agri-enterprise/agri-enterprise.service';
import { CompanyDetailsPage1Dto, CompanyDetailsPage2Dto, CompanyDetailsPage3Dto } from './dto/company.details.dto';
import { LicenceDto } from './dto/licence.dto';
import { ProfileDetailsService } from './profile-details.service';

@ApiTags('ProfileDetails')
@Controller('profile-details')
export class ProfileDetailsController {
    constructor(
        private readonly profileDetailsService: ProfileDetailsService,
        private readonly agriEnterpriseService: AgriEnterpriseService        
        ) {}
    
    @Get()
    async getProfile(@Query('profileId') profileId: string) {
        const profile = await this.profileDetailsService.findProfileById(profileId);
        return profile;
    }
    @Post()
    async newApplication(@Request() req: any, @Body('companyDeatilspage1') companydetailsPage1: CompanyDetailsPage1Dto) {
        try{
            const agriEnterprise = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
            const newProfile = await this.profileDetailsService.createNewProfile(agriEnterprise, companydetailsPage1);
            const application = await this.agriEnterpriseService.createApplication(agriEnterprise._id, newProfile._id, newProfile.createdAt);
            return application;
        }catch(err){
            return err;
        }
    }

    @Patch("page1")
    async updatePage1(@Request() req: any, @Body('companyDeatilspage1') companydetailsPage1: CompanyDetailsPage1Dto, @Body('applicationId') applicationId: string) {
        try{
            const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
            const updateProfile = await this.profileDetailsService.updateCompanyDetailsPage1(application.profileDetailsId, companydetailsPage1);
            return updateProfile;
        }catch(err){
            console.log(err);
            return err;
        }
    }

    @Patch("page2")
    async updatePage2(@Request() req: any, @Body('companyDeatilspage2') companydetailsPage2: CompanyDetailsPage2Dto, @Body('applicationId') applicationId: string) {
        try{
            const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
            const updateProfile = await this.profileDetailsService.updateCompanyDetailsPage2(application.profileDetailsId, companydetailsPage2);
            return updateProfile;
        }catch(err){
            console.log(err);
            return err;
        }
    }

    @Patch("page3")
    async updatePage3(@Request() req: any, @Body('companyDeatilspage3') companydetailsPage3: CompanyDetailsPage3Dto, @Body('applicationId') applicationId: string) {
        try{
            const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
            const updateProfile = await this.profileDetailsService.updateCompanyDetailsPage3(application.profileDetailsId, companydetailsPage3);
            return updateProfile;
        }catch(err){
            console.log(err);
            return err;
        }
    }

    @Patch("license")
    async updateLicense(@Request() req: any, @Body('license') license: [LicenceDto], @Body('applicationId') applicationId: string) {
        try{
            const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
            const updateProfile = await this.profileDetailsService.updateLicense(application.profileDetailsId, license);
            return updateProfile;
        }catch(err){
            console.log(err);
            return err;
        }
    }
    
}

import { Body, Controller, Get, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgriEnterpriseService } from './agri-enterprise.service';
import { NewAgriEnterpriseDto } from './dto/new-agriEnterprise-dto';

@ApiTags('AgriEnterprise')
@Controller('agri-enterprise')
export class AgriEnterpriseController {
    constructor(private readonly agriEnterpriseService: AgriEnterpriseService) { }

    @Get()
    async getAgriEnterpriseByMobile(@Request() req: any) {
        try {
            const agriEnterpriseDoc = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
            return {
                status: 200,
                message: "succcess",
                agriEnterprise: agriEnterpriseDoc
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            };
        }
    }

    @Get("applications")
    async getApplicationsByMobile(@Request() req: any) {
        try {
            const applications = await this.agriEnterpriseService.getApplications(req.user.mobile);
            return {
                status: 200,
                message: "succcess",
                applications: applications
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }

    @Get("application")
    async getApplication(@Request() req: any, @Body("applicationId") applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
            return {
                status: 200,
                message: "succcess",
                application: application
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }

    @Post()
    async newAgriEnterprise(@Body("newAgriEnterprise") newAgriEnterpriseDto: NewAgriEnterpriseDto) {
        try {
            const newData = await this.agriEnterpriseService.createNewAgriEnterprise(newAgriEnterpriseDto);
            return {
                status: 200,
                message: "succcess",
                newData: newData
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }

    @Patch('submitApplication')
    async submitApplication(@Request() req: any, @Query('applicationId') applicationId: string) {
        try{
            const submittedApplication = await this.agriEnterpriseService.finalizeApplication(req.user.mobile, applicationId);
            return {
                status: 200,
                message: "succcess",
                submittedApplication: submittedApplication
            };
        }catch(err){
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }
    
}

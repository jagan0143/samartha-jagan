import { Body, Controller, Get, Patch, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgriEnterpriseService } from './agri-enterprise.service';
import { NewAgriEnterpriseDto } from './dto/new-agriEnterprise-dto';

@ApiTags('AgriEnterprise')
@Controller('agri-enterprise')
export class AgriEnterpriseController {
    constructor(private readonly agriEnterpriseService: AgriEnterpriseService) {}

    @Get()
    async getAgriEnterpriseByMobile(@Request() req: any) {
        const agriEnterpriseDoc = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
        return agriEnterpriseDoc;
    }

    @Get("applications")
    async getApplicationsByMobile(@Request() req: any) {
        const applications = await this.agriEnterpriseService.getApplications(req.user.mobile);
        return applications;
    }

    @Get("application")
    async getApplication(@Request() req: any, @Body("applicationId") applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        return application;
    }

    @Post()
    async newAgriEnterprise(@Body("newAgriEnterprise") newAgriEnterpriseDto: NewAgriEnterpriseDto) {
        const newData = await this.agriEnterpriseService.createNewAgriEnterprise(newAgriEnterpriseDto);
        return newData;
    }

}

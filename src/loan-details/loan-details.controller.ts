import { Body, Controller, Patch, Post, Query, Request } from '@nestjs/common';
import { AgriEnterpriseService } from 'src/agri-enterprise/agri-enterprise.service';
import { CreditFacilityDto } from './dto/credit-facility.dto';
import { FinancialInfoPage1Dto, FinancialInfoPage2Dto } from './dto/financial-info.dto';
import { LoanDetailDto } from './dto/loan-detail.dto';
import { LoanDetailsService } from './loan-details.service'

@Controller('loan-details')
export class LoanDetailsController {
    constructor(
        private readonly agriEnterpriseService: AgriEnterpriseService,
        private readonly loanDetailsService: LoanDetailsService
    ) {}


    async newLoanDetails(req: any, applicationId: string) {
    }

    @Patch('financialInfoPage1')
    async updateFinancialInfoPage1(@Request() req: any, @Body('financialInfoPage1') financialInfoPage1: FinancialInfoPage1Dto, @Query('applicationId') applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        if(!application.loanRequirementId == null) {
            const updatedLoan = await this.loanDetailsService.updateFinancialInfoPage1(application.loanRequirementId, financialInfoPage1);
            return {updatedLoan: updatedLoan};
        }
        else{
            const agriEnterprise = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
            const newLoan = await this.loanDetailsService.newLoanDetails(agriEnterprise, financialInfoPage1);
            await this.agriEnterpriseService.addLoanToApplication(agriEnterprise._id, applicationId, newLoan._id);
            return {newLoan: newLoan};
        }

    }

    @Patch('financialInfoPage2')
    async updateFinancialInfoPage2(@Request() req: any, @Body('financialInfoPage2') financialInfoPage2: FinancialInfoPage2Dto, @Query('applicationId') applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        const updatedLoan = await this.loanDetailsService.updateFinancialInfoPage2(application.loanRequirementId, financialInfoPage2);
        return {updatedLoan: updatedLoan};
    }

    @Patch('creditFacility')
    async updateCreditFacility(@Request() req: any, @Body('creditFacility') creditFacility: CreditFacilityDto, @Query('applicationId') applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        const updatedLoan = await this.loanDetailsService.updateCreditFacility(application.loanRequirementId, creditFacility);
        return {updatedLoan: updatedLoan};
    }

    @Patch('loanDetail')
    async updateLoanDetail(@Request() req: any, @Body('loanDetail') loanDetail: LoanDetailDto, @Query('applicationId') applicationId: string) {
        const application = await this.agriEnterpriseService.getApplication(req.user.mobile, applicationId);
        const updatedLoan = await this.loanDetailsService.updateLoanDetails(application.loanRequirementId, loanDetail);
        return {updatedLoan: updatedLoan};
    }
}
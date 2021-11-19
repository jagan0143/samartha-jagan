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
    ) { }

    @Patch('financialInfoPage1')
    async updateFinancialInfoPage1(@Request() req: any, @Body('financialInfoPage1') financialInfoPage1: FinancialInfoPage1Dto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            if(application.applicationStatus.kycStatus === "completed"){
                if (!(application.loanRequirementId === null)) {
                    const updatedLoan = await this.loanDetailsService.updateFinancialInfoPage1(application.loanRequirementId, financialInfoPage1);
                    return {
                        status: 200,
                        message: "success",
                        application: application,
                        updatedLoan: updatedLoan
                    };
                }
                else {
                    const agriEnterprise = await this.agriEnterpriseService.getAgriEnterpriseByMobile(req.user.mobile);
                    const newLoan = await this.loanDetailsService.newLoanDetails(agriEnterprise, financialInfoPage1);
                    const updatedApplication = await this.agriEnterpriseService.addLoanToApplication(agriEnterprise._id, applicationId, newLoan._id);
                    return {
                        status: 200,
                        message: "success",
                        application: updatedApplication,
                        updatedLoan: newLoan
                    };
                }
            }
            else{
                return {
                    status: 400,
                    message: "failed",
                    error: "Kyc not updated"
                }
            }
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }

    @Patch('financialInfoPage2')
    async updateFinancialInfoPage2(@Request() req: any, @Body('financialInfoPage2') financialInfoPage2: FinancialInfoPage2Dto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedLoan = await this.loanDetailsService.updateFinancialInfoPage2(application.loanRequirementId, financialInfoPage2);
            return {
                status: 200,
                message: "success",
                application: application,
                updatedLoan: updatedLoan
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }

    @Patch('creditFacility')
    async updateCreditFacility(@Request() req: any, @Body('creditFacility') creditFacility: CreditFacilityDto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedLoan = await this.loanDetailsService.updateCreditFacility(application.loanRequirementId, creditFacility);
            return {
                status: 200,
                message: "success",
                application: application,
                updatedLoan: updatedLoan
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }

    @Patch('loanDetail')
    async updateLoanDetail(@Request() req: any, @Body('loanDetail') loanDetail: LoanDetailDto, @Query('applicationId') applicationId: string) {
        try {
            const application = await this.agriEnterpriseService.isApplicationDraft(req.user.mobile, applicationId);
            const updatedLoan = await this.loanDetailsService.updateLoanDetails(application.loanRequirementId, loanDetail);
            const updatedapplication = await this.agriEnterpriseService.updateApplicationStatus(req.user.mobile, applicationId, "loan", "completed");
            return {
                status: 200,
                message: "success",
                application: updatedapplication,
                updatedLoan: updatedLoan
            };
        } catch (err) {
            return {
                status: 400,
                message: "failed",
                error: err
            }
        }
    }
}
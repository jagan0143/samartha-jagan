import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgriEnterpriseDocument } from 'src/database/schema/agri-enterprise.schema';
import { LoanRequirement, LoanRequirementDocument } from 'src/database/schema/loan-requirement.schema';
import { LoanDetail } from 'src/database/schema/loan_sub_schema/loan-detail.schema';
import { CreditFacilityDto } from './dto/credit-facility.dto';
import { FinancialInfoPage1Dto, FinancialInfoPage2Dto } from './dto/financial-info.dto';
import { LoanDetailDto } from './dto/loan-detail.dto';

@Injectable()
export class LoanDetailsService {
    constructor(
        @InjectModel('LoanRequirement') private readonly loanRequirementModel: Model<LoanRequirementDocument>
    ) { }

    async newLoanDetails(agriEnterprise: AgriEnterpriseDocument, financialInfoPage1: FinancialInfoPage1Dto): Promise<LoanRequirementDocument> {
        return new Promise(async (resolve, rejects) => {
                const newLoanData = {
                    aeId: agriEnterprise._id,
                    type: agriEnterprise.type,
                    userId: agriEnterprise.userId,
                    financialInformation: {
                        operationalVintage: financialInfoPage1.operationalVintage,
                        operationalVintageDurationType: financialInfoPage1.operationalVintageDurationType,
                        annualTurnover: financialInfoPage1.annualTurnover,
                        creditorAging: financialInfoPage1.creditorAging,
                        debtorAging: financialInfoPage1.debtorAging,
                        auditedFinancialFiles: financialInfoPage1.auditedFinancialFiles,
                        provisionalFinancialFiles: financialInfoPage1.provisionalFinancialFiles,
                        projectedFinancialFiles: financialInfoPage1.projectedFinancialFiles,
                        itrFiles: [null],
                        gst3bFiles: [null],
                        salesRegisterFiles: [null],
                        bankStatementFiles: [null],
                        productRevenueFiles: [null],
                        stockStatementFiles: [null]
                    },
                    creditFacility: null,
                    loanDetail: null,
                    loanStatus: {
                        financialInformation: {
                            page1: "completed",
                            page2: "pending"
                        },
                        creditFacility: "pending",
                        loanDetail: "pending"
                    }
                }
                const newLoan = await new this.loanRequirementModel(newLoanData).save();
                if(newLoan) resolve(newLoan);
                else rejects("Loan not created properly!");
        })
    }

    async updateFinancialInfoPage1(loanRequirementId: string, financialInfoPage1: FinancialInfoPage1Dto) {
        const loan = await this.loanRequirementModel.findById(loanRequirementId);
        loan.financialInformation.operationalVintage = financialInfoPage1.operationalVintage;
        loan.financialInformation.operationalVintageDurationType = financialInfoPage1.operationalVintageDurationType;
        loan.financialInformation.annualTurnover = financialInfoPage1.annualTurnover;
        loan.financialInformation.creditorAging = financialInfoPage1.creditorAging;
        loan.financialInformation.debtorAging = financialInfoPage1.debtorAging;
        loan.financialInformation.auditedFinancialFiles = financialInfoPage1.auditedFinancialFiles;
        loan.financialInformation.provisionalFinancialFiles = financialInfoPage1.provisionalFinancialFiles;
        loan.financialInformation.projectedFinancialFiles = financialInfoPage1.projectedFinancialFiles;
        loan.loanStatus.financialInformation.page1 = "completed";
        await loan.save();
        return loan;
    }

    async updateFinancialInfoPage2(loanRequirementId: string, financialInfoPage2: FinancialInfoPage2Dto) {
        return new Promise( async (resolve, rejects) => {
            const loan = await this.loanRequirementModel.findById(loanRequirementId);
            if(loan && loan.loanStatus.financialInformation.page1 === "completed")
            {
                loan.financialInformation.itrFiles = financialInfoPage2.itrFiles;
                loan.financialInformation.gst3bFiles = financialInfoPage2.gst3bFiles;
                loan.financialInformation.salesRegisterFiles = financialInfoPage2.salesRegisterFiles;
                loan.financialInformation.bankStatementFiles = financialInfoPage2.bankStatementFiles;
                loan.financialInformation.productRevenueFiles = financialInfoPage2.productRevenueFiles;
                loan.financialInformation.stockStatementFiles = financialInfoPage2.stockStatementFiles;
                loan.loanStatus.financialInformation.page2 = "completed";
                await loan.save();
                resolve(loan);
            }
            else rejects("FinancialInfoPage1 not updated");
        });
    }

    async updateCreditFacility(loanRequirementId: string, creditFacility: CreditFacilityDto) {
        return new Promise( async (resolve, rejects) => {
            const loan = await this.loanRequirementModel.findById(loanRequirementId);
            if(loan && loan.loanStatus.financialInformation.page2 === "completed")
            {
                loan.creditFacility = creditFacility;
                loan.loanStatus.creditFacility = "completed";
                await loan.save();
                resolve(loan);
            }
            else rejects("FinancialInfoPage2 not updated");
        });
    }

    async updateLoanDetails(loanRequirementId: string, loanDetail: LoanDetailDto) {
        return new Promise( async (resolve, rejects) => {
            const loan = await this.loanRequirementModel.findById(loanRequirementId);
            if(loan && loan.loanStatus.creditFacility === "completed")
            {
                loan.loanDetail = loanDetail;
                loan.loanStatus.loanDetail = "completed";
                await loan.save();
                resolve(loan);
            }
            else rejects("CreditFacility not updated");
        });
    }
}

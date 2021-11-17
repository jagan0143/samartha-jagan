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
            try {
                const newLoanData = {
                    aeId: agriEnterprise._id,
                    type: agriEnterprise.type,
                    userId: agriEnterprise.userId,
                    financialInformation: {
                        financialInfoPage1,
                        // operationalVintage: financialInfoPage1.operationalVintage,
                        // operationalVintageDurationType: financialInfoPage1.operationalVintageDurationType,
                        // annualTurnover: financialInfoPage1.annualTurnover,
                        // creditorAging: financialInfoPage1.creditorAging,
                        // debtorAging: financialInfoPage1.debtorAging,
                        // auditedFinancialFiles: financialInfoPage1.auditedFinancialFiles,
                        // provisionalFinancialFiles: financialInfoPage1.provisionalFinancialFiles,
                        // projectedFinancialFiles: financialInfoPage1.projectedFinancialFiles,
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
                resolve(newLoan);
            } catch (err) {
                rejects(err);
            }
        })
    }

    async updateFinancialInfoPage1(loanRequirementId: string, financialInfoPage1: FinancialInfoPage1Dto) {
        const updatedLoan = await this.loanRequirementModel.findById(loanRequirementId);
        updatedLoan.financialInformation.operationalVintage = financialInfoPage1.operationalVintage;
        updatedLoan.financialInformation.operationalVintageDurationType = financialInfoPage1.operationalVintageDurationType;
        updatedLoan.financialInformation.annualTurnover = financialInfoPage1.annualTurnover;
        updatedLoan.financialInformation.creditorAging = financialInfoPage1.creditorAging;
        updatedLoan.financialInformation.debtorAging = financialInfoPage1.debtorAging;
        updatedLoan.financialInformation.auditedFinancialFiles = financialInfoPage1.auditedFinancialFiles;
        updatedLoan.financialInformation.provisionalFinancialFiles = financialInfoPage1.provisionalFinancialFiles;
        updatedLoan.financialInformation.projectedFinancialFiles = financialInfoPage1.projectedFinancialFiles;
        updatedLoan.loanStatus.financialInformation.page1 = "completed";
        await updatedLoan.save();
        return updatedLoan;
    }

    async updateFinancialInfoPage2(loanRequirementId: string, financialInfoPage2: FinancialInfoPage2Dto) {
        const updatedLoan = await this.loanRequirementModel.findById(loanRequirementId);
        updatedLoan.financialInformation.itrFiles = financialInfoPage2.itrFiles;
        updatedLoan.financialInformation.gst3bFiles = financialInfoPage2.gst3bFiles;
        updatedLoan.financialInformation.salesRegisterFiles = financialInfoPage2.salesRegisterFiles;
        updatedLoan.financialInformation.bankStatementFiles = financialInfoPage2.bankStatementFiles;
        updatedLoan.financialInformation.productRevenueFiles = financialInfoPage2.productRevenueFiles;
        updatedLoan.financialInformation.stockStatementFiles = financialInfoPage2.stockStatementFiles;
        updatedLoan.loanStatus.financialInformation.page2 = "completed";
        await updatedLoan.save();
        return updatedLoan;
    }

    async updateCreditFacility(loanRequirementId: string, creditFacility: CreditFacilityDto) {
        const updatedLoan = await this.loanRequirementModel.findByIdAndUpdate(loanRequirementId, {creditFacility: creditFacility}, {new: true});
        updatedLoan.loanStatus.creditFacility = "completed";
        await updatedLoan.save();
        return updatedLoan;
    }

    async updateLoanDetails(loanRequirementId: string, loanDetail: LoanDetailDto) {
        const updatedLoan = await this.loanRequirementModel.findByIdAndUpdate(loanRequirementId, {loanDetail: loanDetail}, {new: true});
        updatedLoan.loanStatus.loanDetail = "completed";
        await updatedLoan.save();
        return updatedLoan;
    }
}

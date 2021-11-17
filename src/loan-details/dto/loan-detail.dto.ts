export class LoanDetailDto {
    loanType: string;
    requiredAmount: number;
    facilityTenure: number;
    loanPurpose: string;
    purposeOfLoanFileUrl: string;
    bankDetail: BankDetailDto;
}

class BankDetailDto {
    ifscCode: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    bankDocumentFile: string;
}
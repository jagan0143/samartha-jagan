export class FinancialInfoPage1Dto {
    operationalVintage: number;
    operationalVintageDurationType: string;
    annualTurnover: number;
    creditorAging: string;
    debtorAging: string;
    auditedFinancialFiles: [string];
    provisionalFinancialFiles: [string];
    projectedFinancialFiles: [string];
}

export class FinancialInfoPage2Dto {
    itrFiles: [string];
    gst3bFiles: [string];
    salesRegisterFiles: [string];
    bankStatementFiles: [string];
    productRevenueFiles: [string];
    stockStatementFiles: [string];
}
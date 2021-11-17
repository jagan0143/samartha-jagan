export class CreditFacilityDto {
    creditFacility: string;
    currentBorrowingDetail: [string];
    documents: {
        documentName: {type: String},
        documentFiles: {type: [String]}
    }
}
export class CreditFacilityDto {
    creditFacility: string;
    currentBorrowingDetail: [string];
    documents: Document;
}

class Document {
    documentName: string;
    documentFiles: [string];
}
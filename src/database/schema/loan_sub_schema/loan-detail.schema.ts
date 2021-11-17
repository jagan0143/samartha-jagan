import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BankDetail {
  @Prop({ type: String })
  ifscCode: string;

  @Prop({ type: String })
  bankName: string;

  @Prop({ type: String })
  branchName: string;

  @Prop({ type: String })
  accountNumber: string;

  @Prop({ type: String })
  bankDocumentFile: string;
}

export const BankDetailSchema = SchemaFactory.createForClass(BankDetail);

@Schema()
export class LoanDetail {
  @Prop({ type: String, enum: ["Receivable loan", "Working capital", "Capital expenditure", "Term loans", "Others"] })
  loanType: string;

  @Prop({ type: Number })
  requiredAmount: number;

  @Prop({ type: Number })
  facilityTenure: number;

  @Prop({ type: String })
  loanPurpose: string;

  @Prop({ type: String })
  purposeOfLoanFileUrl: string;

  @Prop({ type: BankDetailSchema })
  bankDetail: BankDetail;

}

export const LoanDetailSchema = SchemaFactory.createForClass(LoanDetail);

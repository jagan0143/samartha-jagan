import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FinancialInfo {
    @Prop({ type: Number })
    operationalVintage: number;

    @Prop({ type: String, enum: ["Months", 'Years'] })
    operationalVintageDurationType: string;

    @Prop({ type: Number })
    annualTurnover: number;

    @Prop({ type: String })
    creditorAging: string;

    @Prop({ type: String })
    debtorAging: string;

    @Prop({ type: [String] })
    auditedFinancialFiles: [string];

    @Prop({ type: [String] })
    provisionalFinancialFiles: [string];

    @Prop({ type: [String] })
    projectedFinancialFiles: [string];

    @Prop({ type: [String] })
    itrFiles: [string];

    @Prop({ type: [String] })
    gst3bFiles: [string];

    @Prop({ type: [String] })
    salesRegisterFiles: [string];

    @Prop({ type: [String] })
    bankStatementFiles: [string];

    @Prop({ type: [String] })
    productRevenueFiles: [string];

    @Prop({ type: [String] })
    stockStatementFiles: [string];

}

export const FinancialInfoSchema = SchemaFactory.createForClass(FinancialInfo);

import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class LoanStatus {
    @Prop(raw({
        page1: {type: String, default: "pending"},
        page2: {type: String, default: "pending"}
    }))
    financialInformation: Record<string, any>;
    @Prop({type: String})
    creditFacility: string;
    @Prop({type: String})
    loanDetail: string;
}

export const LoanStatusSchema = SchemaFactory.createForClass(LoanStatus);
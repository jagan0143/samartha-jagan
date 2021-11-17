import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class CompanyEntityKyc {
    @Prop({ type: String, enum: ["Video Kyc", "Physical Kyc"] })
    kycType: string;

    @Prop({ type: String })
    addressProofType: string;

    @Prop({ type: [String], min: 1 })
    addressProofUrl: [string];

    @Prop({ type: String })
    identityProofType: string;

    @Prop({ type: [String], min: 1 })
    identityProofUrl: [string];
    
}
export const CompanyEntityKycSchema = SchemaFactory.createForClass(CompanyEntityKyc);

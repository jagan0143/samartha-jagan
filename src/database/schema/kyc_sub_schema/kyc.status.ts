import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class KycStatus {
    @Prop({type: String})
    directorDetailsStatus: string;
    @Prop({type: String})
    companyEntityStatus: string;
    @Prop({type:String})
    buyerSellerDetailsStatus: string
}
export const KycStatusSchema = SchemaFactory.createForClass(KycStatus);

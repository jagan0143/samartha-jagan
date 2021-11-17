import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class BuyerSellerDetails {
    @Prop(raw([{
        BuyerName: { type: String },
        RelationshipVintage: { type: Number },
        PurchaseVolume: { type: Number },
        CreditPeriodDays: { type: Number }
    }]))
    buyerDetails : Record<string, any>;

    @Prop(raw([{
        SupplierName: { type: String },
        RelationshipVintage: { type: Number },
        PurchaseVolume: { type: Number },
        CreditPeriodDays: { type: Number }
    }]))
    sellerDetails: Record<string, any>;

}
export const BuyerSellerDetailsSchema = SchemaFactory.createForClass(BuyerSellerDetails);

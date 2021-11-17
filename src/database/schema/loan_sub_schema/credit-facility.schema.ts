import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CreditFacility {
    @Prop({ type: String, enum:["yes", "no"] })
    creditFacility: string;

    @Prop({ type: [String], min: 1 })
    currentBorrowingDetail: [string];

    @Prop(raw({
        documentName: {type: String},
        documentFiles: {type: [String]}
    }))
    documents: Record<string,any>
    
}

export const CreditFacilitySchema = SchemaFactory.createForClass(CreditFacility);

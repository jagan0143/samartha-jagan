import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PincodeMasterDocument = PincodeMaster & Document;

@Schema()
export class PincodeMaster {
    @Prop({ type: String })
    DistrictName: string;

    @Prop({ type: String })
    StateName: string;

    @Prop({ type: Number })
    Pincode: number;
}

export const PincodeMasterSchema = SchemaFactory.createForClass(PincodeMaster);

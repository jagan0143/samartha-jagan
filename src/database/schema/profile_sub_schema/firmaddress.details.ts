import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class FirmAddressDetails {
    @Prop({
        type: String
        })
    address: string

    @Prop({
        type: String
        })
    streetAddress: string

    @Prop({
        type: String
    })
    state: string

    @Prop({
        type: String
    })
    city: string

    @Prop({
        type: String
    })
    pincode: string

    @Prop({
        type: String
    })
    addressProofType: string

    @Prop({
        type: String
    })
    addressProofUrl: string
}

export const FirmAddressDetailsSchema = SchemaFactory.createForClass(FirmAddressDetails);
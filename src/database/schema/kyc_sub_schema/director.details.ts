import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class DirectorDetails {
    @Prop({
        type: String
    })
    din: string
    @Prop({
        type: String
    })
    dateOfBirth: string
    @Prop({
        type: String
    })
    mobileNumber: string
    @Prop({
        type: String
    })
    emailId: string
    @Prop({
        type: String
    })
    address: string
    @Prop({
        type: String
    })
    addressProofType: string
    @Prop({
        type: String
    })
    addressProofUrl: string
    @Prop({
        type: String
    })
    shareHolding: string
    @Prop({
        type: String
    })
    shareHoldingUrl: string
    @Prop({
        type: String
    })
    kycVerification: string
}

export const DirectorDetailsSchema = SchemaFactory.createForClass(DirectorDetails);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class LicenseDetails {
    @Prop({
        type: String,
        enum: ["Seed License", "Plant Protection License", "Fertilizers license",
            "Shop/premises ownership/lease/rent agreement",
            "Trade License from lo cal municipality", "Other"]
    })
    licenseType: string;

    @Prop({ type: [String] })
    licenseUrl: [string];

    @Prop({ type: String })
    otherType: string;
}
export const LicenseDetailsSchema = SchemaFactory.createForClass(LicenseDetails);
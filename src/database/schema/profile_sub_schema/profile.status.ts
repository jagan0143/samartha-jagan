import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ProfileStatus {
    @Prop(raw({
        page1: {type: String, default: "pending"},
        page2: {type: String, default: "pending"},
        page3: {type: String, default: "pending"},
    }))
    companyDetailsStatus: Record<string, any>;

    @Prop({type: String, default: "pending"})
    licenseDetailsStatus: string;

    @Prop({type: String, default: "pending"})
    firmAddressDetailsStatus: string;
}

export const ProfileStatusSchema = SchemaFactory.createForClass(ProfileStatus);
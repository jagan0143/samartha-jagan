import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AgriEnterprise } from './agri-enterprise.schema';
import { Document } from 'mongoose';
import { CompanyDetails, CompanyDetailsSchema } from './profile_sub_schema/company_details';
import { LicenseDetails, LicenseDetailsSchema } from './profile_sub_schema/license.details';
import { FirmAddressDetails, FirmAddressDetailsSchema } from './profile_sub_schema/firmaddress.details';
import { ProfileStatus, ProfileStatusSchema } from './profile_sub_schema/profile.status';

export type ProfileDetailsDocument = ProfileDetails & Document;

@Schema({timestamps: true})
export class ProfileDetails extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'agrienterprises' })
    aeId: AgriEnterprise;

    @Prop({
        type: String,
        required: true,
        enum: ['Public/Private/LLP', 'Proprietorship', 'Partnership']
    })
    type: string;

    @Prop({
        type: String,
        required: true,
    })
    userId: string;

    @Prop({ type: CompanyDetailsSchema})
    companyDetails: CompanyDetails;

    @Prop({type: [LicenseDetailsSchema]})
    LicenseDetails: [LicenseDetails];

    @Prop({ type: FirmAddressDetailsSchema})
    firmAddressDetails: FirmAddressDetails

    @Prop({type: ProfileStatusSchema})
    profileStatus: ProfileStatus;

    createdAt: Date;
}

export const ProfileDetailsSchema = SchemaFactory.createForClass(ProfileDetails);
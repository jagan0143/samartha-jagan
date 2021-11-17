import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AgriEnterprise } from './agri-enterprise.schema';
import { Document } from 'mongoose';
import { CompanyEntityKyc, CompanyEntityKycSchema } from './kyc_sub_schema/company.entity';
import { KycStatus, KycStatusSchema } from './kyc_sub_schema/kyc.status';
import { BuyerSellerDetails, BuyerSellerDetailsSchema } from './kyc_sub_schema/buyer-seller.details';
import { DirectorDetails, DirectorDetailsSchema } from './kyc_sub_schema/director.details';

export type KycVerificationDocument = KycVerification & Document;
@Schema()
export class KycVerification extends Document{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'agrienterprises' })
    aeId: AgriEnterprise;

    @Prop({
        type: String,
        enum: ['Public/Private/LLP', 'Proprietorship', 'Partnership']
    })
    type: string;

    @Prop({
        type: String
    })
    userId: string

    @Prop({ type: [DirectorDetailsSchema]})
    directorDetails: [DirectorDetails];

    @Prop({ type: CompanyEntityKycSchema})
    companyEntity: CompanyEntityKyc

    @Prop({ type: BuyerSellerDetailsSchema})
    buyerSellerDetails: BuyerSellerDetails

    @Prop({ type: KycStatusSchema})
    kycStatus: KycStatus;
}

export const KycVerificationSchema = SchemaFactory.createForClass(KycVerification);
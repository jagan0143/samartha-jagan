import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AgriEnterpriseDocument = AgriEnterprise & Document;

@Schema({_id:true})
export class Application {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'profiledetails' })
    profileDetailsId: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "loanrequirements" })
    loanRequirementId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "kycverifications" })
    kycId: string;

    @Prop({ type: Date})
    applicationDate: Date;

    @Prop(raw({
        profileStatus: { type: String},
        kycStatus: { type: String},
        loanStatus: { type: String},
        status: {type: String, default: "draft"}
    }))
    applicationStatus: Record<string, any>;

    // @Prop({
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true,
    //     required: true,
    //     auto: true,
    //   })
    //_id: {type: string, required: false};
}
export const ApplicationSchema = SchemaFactory.createForClass(Application);

@Schema()
export class AgriEnterprise extends Document {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ type: String })
    mobileNumber: string;

    @Prop({ type: String })
    emailId: string;

    @Prop({
        type: String,
        required: true,
    })
    userId: string

    @Prop({
        type: String,
        required: true,
    })
    userType: string

    @Prop({
        type: String,
        required: true,
        enum: ['Public/Private/LLP', 'Proprietorship', 'Partnership']
    })
    type: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'profiledetails' })
    // profileDetailsId: string

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "loanrequirements"})
    // loanRequirementId: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "kycverifications" })
    // kycId: string;

    @Prop({type: [ApplicationSchema]})
    applications: [Application];

    // @Prop({ type: Date})
    // applicationDate: Date;

}

export const AgriEnterpriseSchema = SchemaFactory.createForClass(AgriEnterprise);

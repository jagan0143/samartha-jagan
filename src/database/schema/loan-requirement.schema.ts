import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AgriEnterprise } from './agri-enterprise.schema';
import { Document } from 'mongoose';
import { FinancialInfo, FinancialInfoSchema } from './loan_sub_schema/financial-info.schema';
import { CreditFacility, CreditFacilitySchema } from './loan_sub_schema/credit-facility.schema';
import { LoanDetail, LoanDetailSchema } from './loan_sub_schema/loan-detail.schema';
import { LoanStatus, LoanStatusSchema } from './loan_sub_schema/loan.status';

export type LoanRequirementDocument = LoanRequirement & Document;

@Schema()
export class LoanRequirement extends Document{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'agrienterprises' })
    aeId: AgriEnterprise;

    @Prop({
        type: String,
        //required: true,
        enum: ['Public/Private/LLP', 'Proprietorship', 'Partnership']
    })
    type: string;

    @Prop({
        type: String,
        //required: true,
    })
    userId: string

    @Prop({ type: FinancialInfoSchema, default: () => ({}) })
    financialInformation: FinancialInfo

    @Prop({ type: CreditFacilitySchema, default: () => ({}) })
    creditFacility: CreditFacility

    @Prop({ type: LoanDetailSchema, default: () => ({}) })
    loanDetail: LoanDetail

    @Prop({ type: LoanStatusSchema})
    loanStatus: LoanStatus
}

export const LoanRequirementSchema = SchemaFactory.createForClass(LoanRequirement);
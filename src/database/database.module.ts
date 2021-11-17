import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgriEnterpriseSchema } from './schema/agri-enterprise.schema';
import { KycVerificationSchema } from './schema/kyc-verification.schema';
import { LoanRequirementSchema } from './schema/loan-requirement.schema';
import { PincodeMasterSchema } from './schema/pincode-master.schema';
import { ProfileDetailsSchema } from './schema/profile-details.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: "AgriEnterprise", schema: AgriEnterpriseSchema },
        { name: "ProfileDetails", schema: ProfileDetailsSchema },
        { name: "PincodeMaster", schema: PincodeMasterSchema },
        { name: "LoanRequirement", schema: LoanRequirementSchema },
        { name: "KycVerification", schema: KycVerificationSchema }
    ])
    ]
})
export class DatabaseModule { }

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgriEnterpriseSchema } from 'src/database/schema/agri-enterprise.schema';
import { LoanRequirementSchema } from 'src/database/schema/loan-requirement.schema';
import { ProfileDetailsSchema } from 'src/database/schema/profile-details.schema';
import { AgriEnterpriseController } from './agri-enterprise.controller';
import { AgriEnterpriseService } from './agri-enterprise.service';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: "AgriEnterprise", schema: AgriEnterpriseSchema },
    { name: "ProfileDetails", schema: ProfileDetailsSchema },
    { name: "LoanRequirement", schema: LoanRequirementSchema }
  ])
  ],
  controllers: [AgriEnterpriseController],
  providers: [AgriEnterpriseService],
  exports: [AgriEnterpriseService]
})
export class AgriEnterpriseModule {}

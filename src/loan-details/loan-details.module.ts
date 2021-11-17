import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgriEnterpriseModule } from 'src/agri-enterprise/agri-enterprise.module';
import { LoanRequirementSchema } from 'src/database/schema/loan-requirement.schema';
import { LoanDetailsController } from './loan-details.controller';
import { LoanDetailsService } from './loan-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "LoanRequirement", schema: LoanRequirementSchema }]),
    AgriEnterpriseModule
  ],
  controllers: [LoanDetailsController],
  providers: [LoanDetailsService]
})
export class LoanDetailsModule {}

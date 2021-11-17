import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgriEnterpriseModule } from 'src/agri-enterprise/agri-enterprise.module';
import { KycVerificationSchema } from 'src/database/schema/kyc-verification.schema';
import { KycController } from './kyc.controller';
import { KycService } from './kyc.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "KycVerification", schema: KycVerificationSchema }]),
    AgriEnterpriseModule
  ],
  controllers: [KycController],
  providers: [KycService]
})
export class KycModule {}

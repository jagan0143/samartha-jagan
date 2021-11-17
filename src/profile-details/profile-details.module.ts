import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgriEnterpriseModule } from 'src/agri-enterprise/agri-enterprise.module';
import { ProfileDetailsSchema } from 'src/database/schema/profile-details.schema';
import { ProfileDetailsController } from './profile-details.controller';
import { ProfileDetailsService } from './profile-details.service';

@Module({
  imports: [ 
    AgriEnterpriseModule,
    MongooseModule.forFeature([{ name: "ProfileDetails", schema: ProfileDetailsSchema }])
  ],
  controllers: [ProfileDetailsController],
  providers: [ProfileDetailsService]
})
export class ProfileDetailsModule {}

import { MiddlewareConsumer, Module, NestModule, Request, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AgriEnterpriseModule } from './agri-enterprise/agri-enterprise.module';
import { ProfileDetailsModule } from './profile-details/profile-details.module';
import { AuthenticateMiddleware } from './authenticate.middleware';
import { KycModule } from './kyc/kyc.module';
import { LoanDetailsModule } from './loan-details/loan-details.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URL')
    }),
    inject: [ConfigService]
  }),
  ConfigModule.forRoot({
    isGlobal: true
  }),
  DatabaseModule,
  AgriEnterpriseModule,
  ProfileDetailsModule,
  KycModule,
  LoanDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude({
        path: 'ae/api/profile-details/address/pincode/details',
        method : RequestMethod.GET
      })
      .forRoutes(
        ...[
          'profile-details',
          'loan-requirement', 
          'kyc',
          'agri-enterprise',
          'kyc-verification'
        ]
      );
  }
}


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AgriEnterprise, AgriEnterpriseDocument, Application } from 'src/database/schema/agri-enterprise.schema';
import { LoanRequirementDocument } from 'src/database/schema/loan-requirement.schema';
import { ProfileDetailsDocument } from 'src/database/schema/profile-details.schema';
import { NewAgriEnterpriseDto } from './dto/new-agriEnterprise-dto';

@Injectable()
export class AgriEnterpriseService {
    constructor(
        @InjectModel('AgriEnterprise') private readonly AgriEnterpriseModel: Model<AgriEnterpriseDocument>,
        @InjectModel('ProfileDetails') private readonly ProfileDetailsModel: Model<ProfileDetailsDocument>,
        @InjectModel('LoanRequirement') private readonly LoanRequirementModel: Model<LoanRequirementDocument>
    ) { }

    //----------------------------------------Agrienterprise Api's--------------------------------------------------------------------
    async createNewAgriEnterprise(newAgriEnterpriseDto: NewAgriEnterpriseDto): Promise<AgriEnterprise> {
        const newData = {
            name: newAgriEnterpriseDto.name,
            mobileNumber: newAgriEnterpriseDto.mobileNumber,
            emailId: newAgriEnterpriseDto.emailId,
            userId: newAgriEnterpriseDto.userId,
            userType: newAgriEnterpriseDto.userType,
            type: newAgriEnterpriseDto.type,
            applications: []
        }
        const agriEnterpriseDoc = await new this.AgriEnterpriseModel(newData).save();
        return agriEnterpriseDoc;
    }

    getAgriEnterpriseByMobile(mobile: string): Promise<AgriEnterprise> {
        return new Promise(async (resolve,rejects) => {
            const agriEnterpriseDoc = await this.AgriEnterpriseModel.findOne({ mobileNumber: mobile });
            if(agriEnterpriseDoc) resolve(agriEnterpriseDoc);
            else rejects({error: "agriEnterprise not found"});
        });
    }

    //----------------------------------------Application Api's--------------------------------------------------------------------
   async createApplication(agriEnterpriseId: Types.ObjectId, profileId: string, applicationDate: Date): Promise<Application> {
       try{
        const applicationData = {
            profileDetailsId: profileId,
            loanRequirementId: null,
            kycId: null,
            applicationDate: applicationDate,
            applicationStatus: "Draft"
           }

           const agriEnterpriseDoc = await this.AgriEnterpriseModel.findById(agriEnterpriseId);
           agriEnterpriseDoc.applications.push(applicationData);
           await agriEnterpriseDoc.save();
           const application = agriEnterpriseDoc.applications.pop();
           return application;
       }catch(err){
           return err;
       }
   }

   async getApplications(mobile: string) {
    const agriEnterpriseDoc = await this.getAgriEnterpriseByMobile(mobile);
    const applications = agriEnterpriseDoc.applications;
    return applications;
   }


   async getApplication(mobile: string, applicationId: string): Promise<Application> {
       try{
        const agriEnterpriseDoc = await this.getAgriEnterpriseByMobile(mobile);
        const application = agriEnterpriseDoc.applications.find((element:any) => {return element._id==applicationId});
        return application;
       }catch(err){
           console.log(err);
       }
   }

   async addKycToApplication(agriEnterpriseId: string, applicationId: string, kycId: string) {
       const agriEnterPrise = await this.AgriEnterpriseModel.findById(agriEnterpriseId);
       const applicationIndex = agriEnterPrise.applications.findIndex((element:any) => {return element._id == applicationId});
       agriEnterPrise.applications[applicationIndex].kycId = kycId;
       await agriEnterPrise.save();
       return agriEnterPrise.applications[applicationIndex];
   }

   async addLoanToApplication(agriEnterpriseId: string, applicationId: string, loanId: string) {
    const agriEnterPrise = await this.AgriEnterpriseModel.findById(agriEnterpriseId);
    const applicationIndex = agriEnterPrise.applications.findIndex((element:any) => {return element._id == applicationId});
    agriEnterPrise.applications[applicationIndex].loanRequirementId = loanId;
    await agriEnterPrise.save();
    return agriEnterPrise.applications[applicationIndex];
}
}

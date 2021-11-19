import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { application } from 'express';
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
        return new Promise(async (resolve, rejects) => {
            const agriEnterpriseDoc = await this.AgriEnterpriseModel.findOne({ mobileNumber: mobile });
            if (agriEnterpriseDoc) resolve(agriEnterpriseDoc);
            else rejects("AgriEnterprise not found");
        });
    }

    //----------------------------------------Application Api's--------------------------------------------------------------------
    async createApplication(agriEnterpriseId: Types.ObjectId, profileId: string, applicationDate: Date): Promise<Application> {
        const applicationData = {
            profileDetailsId: profileId,
            loanRequirementId: null,
            kycId: null,
            applicationDate: applicationDate,
            applicationStatus: {
                profileStatus: "pending",
                kycStatus: null,
                loanStatus: null,
                status: "draft"
            }
        }
        const agriEnterpriseDoc = await this.AgriEnterpriseModel.findById(agriEnterpriseId);
        agriEnterpriseDoc.applications.push(applicationData);
        await agriEnterpriseDoc.save();
        const application = agriEnterpriseDoc.applications.pop();
        return application;
    }

    async getApplications(mobile: string) {
        const agriEnterpriseDoc = await this.getAgriEnterpriseByMobile(mobile);
        const applications = agriEnterpriseDoc.applications;
        return applications;
    }


    async getApplication(mobile: string, applicationId: string): Promise<Application> {
        return new Promise(async (resolve, rejects) => {
            try {
                const agriEnterpriseDoc = await this.getAgriEnterpriseByMobile(mobile);
                const application = agriEnterpriseDoc.applications.find((element: any) => { return element._id == applicationId });
                if (application) resolve(application);
                else rejects('Application not found');
            } catch (err) {
                rejects(err);
            }
        });
    }

    async addKycToApplication(agriEnterpriseId: string, applicationId: string, kycId: string) {
        const agriEnterPrise = await this.AgriEnterpriseModel.findById(agriEnterpriseId);
        const applicationIndex = agriEnterPrise.applications.findIndex((element: any) => { return element._id == applicationId });
        agriEnterPrise.applications[applicationIndex].kycId = kycId;
        agriEnterPrise.applications[applicationIndex].applicationStatus.kycStatus = "pending";
        await agriEnterPrise.save();
        return agriEnterPrise.applications[applicationIndex];
    }

    async addLoanToApplication(agriEnterpriseId: string, applicationId: string, loanId: string) {
        const agriEnterPrise = await this.AgriEnterpriseModel.findById(agriEnterpriseId);
        const applicationIndex = agriEnterPrise.applications.findIndex((element: any) => { return element._id == applicationId });
        agriEnterPrise.applications[applicationIndex].loanRequirementId = loanId;
        agriEnterPrise.applications[applicationIndex].applicationStatus.loanStatus = "pending";
        await agriEnterPrise.save();
        return agriEnterPrise.applications[applicationIndex];
    }

    async updateApplicationStatus(mobile: string, applicationId: string, update: string, status: string) {
        const agriEnterPrise = await this.getAgriEnterpriseByMobile(mobile);
        const applicationIndex = agriEnterPrise.applications.findIndex((element: any) => { return element._id == applicationId });
        if (update === "profile")
            agriEnterPrise.applications[applicationIndex].applicationStatus.profileStatus = status;
        if (update === "kyc")
            agriEnterPrise.applications[applicationIndex].applicationStatus.kycStatus = status;
        if (update === "loan")
            agriEnterPrise.applications[applicationIndex].applicationStatus.loanStatus = status;
        await agriEnterPrise.save();
        return agriEnterPrise.applications[applicationIndex];
    }

    async isApplicationDraft(mobile: string, applicationId: string): Promise<Application> {
        return new Promise(async (resolve, rejects) => {
            try {
                const application = await this.getApplication(mobile, applicationId);
                if (application.applicationStatus.status === "draft") return application;
                // else throw new BadRequestException('Submitted application cant update');
                else rejects("Submitted application can't update");
            }
            catch (err) {
                rejects(err);
            }
        });
    }

    async finalizeApplication(mobile: string, applicationId: string) {
        return new Promise(async (resolve, rejects) => {
            try {
                const application = await this.getApplication(mobile, applicationId);
                if (
                    application.applicationStatus.profileStatus === "completed" &&
                    application.applicationStatus.kycStatus === "completed" &&
                    application.applicationStatus.loanStatus === "completed"
                ) {
                    const agriEnterPrise = await this.getAgriEnterpriseByMobile(mobile);
                    const applicationIndex = agriEnterPrise.applications.findIndex((element: any) => { return element._id == applicationId });
                    agriEnterPrise.applications[applicationIndex].applicationStatus.status = "submitted";
                    await agriEnterPrise.save();
                    resolve(agriEnterPrise.applications[applicationIndex]);
                }
                else rejects("Application not completed properly");
            }
            catch (err) {
                rejects(err);
            }
        });
    }
}

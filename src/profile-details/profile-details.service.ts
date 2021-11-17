import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgriEnterpriseDocument } from 'src/database/schema/agri-enterprise.schema';
import { ProfileDetails, ProfileDetailsDocument } from 'src/database/schema/profile-details.schema';
import { CompanyDetailsPage1Dto, CompanyDetailsPage2Dto, CompanyDetailsPage3Dto } from './dto/company.details.dto';
import { LicenceDto } from './dto/licence.dto';

@Injectable()
export class ProfileDetailsService {
    constructor(@InjectModel('ProfileDetails') private readonly ProfileDetailsModel: Model<ProfileDetailsDocument>) { }

    async findProfileById(id: string) {
        const profile = await this.ProfileDetailsModel.findById(id);
        return profile;
    }

    createNewProfile(agriEnterprise: AgriEnterpriseDocument, companydetailsPage1: CompanyDetailsPage1Dto): Promise<ProfileDetails> {
        return new Promise(async (resolve, rejects) => {
            try {
                const profileData = {
                    aeId: agriEnterprise.id,
                    userId: agriEnterprise.userId,
                    type: agriEnterprise.type,
                    companyDetails: {
                        companyName: companydetailsPage1.companyName,
                        mobileNumber: companydetailsPage1.mobileNumber,
                        emailId: companydetailsPage1.emailId,
                        panNumber: companydetailsPage1.panNumber,
                        panImgUrl: companydetailsPage1.panImgUrl,
                        gstId: companydetailsPage1.gstId,
                        gstImgUrl: companydetailsPage1.gstImgUrl,
                        contactName: companydetailsPage1.contactName,
                        designation: companydetailsPage1.designation,
                        registeredAs: null,
                        aboutTheCompany: null,
                        incorporationDate: null,
                        incorporationCertificateUrl: null,
                        licenses: [],
                        businessType: "Others",
                        businessTypeOthers: null,
                        sector: null,
                        websiteUrl: null,
                        stateOfOperation: null,
                        valueChain: "Sericulture",
                        corporateBrochureUrl: null,
                        shareholdingUrl: null,
                        associationArticleUrl: null,
                        associationMemorandumUrl: null
                    },
                    LicenseDetails: [null],
                    firmAddressDetails: {
                        address: null,
                        streetAddress: null,
                        state: null,
                        city: null,
                        pincode: null,
                        addressProofType: null,
                        addressProofUrl: null
                    },
                    profileStatus: {
                        companyDetailsStatus: {
                            page1: "completed",
                            page2: "pending",
                            page3: "pending"
                        },
                        LicenseDetailsStatus: "pending",
                        firmAddressDetailsStatus: "pending"
                    },
                    createdAt: null
                };
                const newProfile = await new this.ProfileDetailsModel(profileData).save();
                resolve(newProfile);
            } catch (err) {
                rejects({ error: err });
            }
        })
    }



    async updateCompanyDetailsPage1(profileId: string, companydetails: CompanyDetailsPage1Dto) {
        const profile = await this.ProfileDetailsModel.findById(profileId);

        profile.companyDetails.panNumber = companydetails.panNumber;
        profile.companyDetails.panImgUrl = companydetails.panImgUrl;
        profile.companyDetails.companyName = companydetails.companyName;
        profile.companyDetails.gstId = companydetails.gstId;
        profile.companyDetails.gstImgUrl = companydetails.gstImgUrl;
        profile.companyDetails.contactName = companydetails.contactName;
        profile.companyDetails.designation = companydetails.designation;
        profile.companyDetails.mobileNumber = companydetails.mobileNumber;
        profile.companyDetails.emailId = companydetails.emailId;
        profile.profileStatus.companyDetailsStatus.page1 = "completed";
        
        await profile.save();
        return profile;
    }

    async updateCompanyDetailsPage2(profileId: string, companydetails: CompanyDetailsPage2Dto) {
        const profile = await this.ProfileDetailsModel.findById(profileId);

        profile.companyDetails.registeredAs = companydetails.registeredAs;
        profile.companyDetails.aboutTheCompany = companydetails.aboutTheCompany;
        profile.companyDetails.websiteUrl = companydetails.website;
        profile.companyDetails.incorporationDate = companydetails.incorporationDate;
        profile.companyDetails.incorporationCertificateUrl = companydetails.incorporationDocUrl;
        profile.companyDetails.businessType = companydetails.businessType;
        profile.companyDetails.sector = companydetails.sector;
        profile.profileStatus.companyDetailsStatus.page2 = "completed";

        await profile.save();
        return profile;
    }

    async updateCompanyDetailsPage3(profileId: string, companydetails: CompanyDetailsPage3Dto) {
        try{
            console.log(companydetails);
        const profile = await this.ProfileDetailsModel.findById(profileId);

        profile.companyDetails.stateOfOperation = companydetails.stateOfOperation;
        profile.companyDetails.valueChain = companydetails.valueChain;
        profile.companyDetails.corporateBrochureUrl = companydetails.corporateBrochureUrl;
        profile.companyDetails.shareholdingUrl = companydetails.shareholdingUrl;
        profile.companyDetails.associationArticleUrl = companydetails.associationArticleUrl;
        profile.companyDetails.associationMemorandumUrl = companydetails.associationMemorandumUrl;
        profile.profileStatus.companyDetailsStatus.page3 = "completed";

        await profile.save();
        return profile;
        }catch(err){
            console.log(err);
        }
    }

    updateLicense(profileId: string, license: [LicenceDto]) {
        return new Promise(async (resolve, rejects) => {
            try{
                const profile = await this.ProfileDetailsModel.findById(profileId);
                profile.LicenseDetails = license;
                profile.profileStatus.LicenseDetailsStatus = "completed";
                await profile.save();
                resolve(profile);
            }catch(err){
                rejects(err);
            }
        })
    }
}
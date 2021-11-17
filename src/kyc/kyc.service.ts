import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgriEnterpriseDocument } from 'src/database/schema/agri-enterprise.schema';
import { KycVerification, KycVerificationDocument } from 'src/database/schema/kyc-verification.schema';
import { BuyersDto, SellersDto } from './dto/buyer-seller.dto';
import { CompanyEntityDto } from './dto/compane-entity.dto';
import { DirectorDetailsDto } from './dto/director-details.dto';

@Injectable()
export class KycService {
    constructor(
        @InjectModel('KycVerification') private readonly KycVerificationModel: Model<KycVerificationDocument>
    ) {}

    async createNewKyc(agriEnterprise: AgriEnterpriseDocument, directorDetails: [DirectorDetailsDto]): Promise<KycVerificationDocument> {
        return new Promise( async (resolve, rejects) => {
            try{
                const kycData = {
                    aeId: agriEnterprise.id,
                    userId: agriEnterprise.userId,
                    type: agriEnterprise.type,
                    directorDetails: directorDetails,
                    companyEntity: null,
                    buyerSellerDetails: null,
                    kycStatus: {
                        directorDetailsStatus: "completed",
                        companyEntityStatus: "pending",
                        buyerSellerDetailsStatus: "pending"
                    }
                }
                const newKyc = await new this.KycVerificationModel(kycData).save();
                resolve(newKyc);
            }catch(err){
                rejects(err);
            }
        })
    }

    async updateDirectorDetails(kycId:string, directorDetails: [DirectorDetailsDto]) {
        const kyc = await this.KycVerificationModel.findByIdAndUpdate(kycId, {directorDetails: directorDetails}, {new:true});
        kyc.kycStatus.directorDetailsStatus = "completed";
        await kyc.save();
        return kyc;
    }

    async updateCompanyEntity(kycId: string, companyEntity: CompanyEntityDto) {
        const kyc = await this.KycVerificationModel.findByIdAndUpdate(kycId, {companyEntity: companyEntity}, {new: true});
        kyc.kycStatus.companyEntityStatus = "completed";
        await kyc.save();
        return kyc;
    }

    async updateBuyerSellerDetails(kycId: string, buyers: [BuyersDto], sellers: [SellersDto]) {
        const kyc = await this.KycVerificationModel.findByIdAndUpdate(kycId, {buyerSellerDetails:{buyerDetails: buyers, sellerDetails: sellers}}, {new: true});
        kyc.kycStatus.buyerSellerDetailsStatus = "completed";
        await kyc.save();
        return kyc;
    }
}

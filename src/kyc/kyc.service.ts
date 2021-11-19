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
    ) { }

    async createNewKyc(agriEnterprise: AgriEnterpriseDocument, directorDetails: [DirectorDetailsDto]): Promise<KycVerificationDocument> {
        return new Promise(async (resolve, rejects) => {
            directorDetails.forEach((element, index) => directorDetails[index].kycVerification = "pending");
            const kycData = {
                aeId: agriEnterprise.id,
                userId: agriEnterprise.userId,
                type: agriEnterprise.type,
                directorDetails: directorDetails,
                companyEntity: null,
                buyerSellerDetails: {
                    buyerDetails: [null],
                    sellerDetails: [null]
                },
                kycStatus: {
                    directorDetailsStatus: "completed",
                    companyEntityStatus: "pending",
                    buyerSellerDetailsStatus: "pending"
                }
            }
            const newKyc = await new this.KycVerificationModel(kycData).save();
            if (newKyc) resolve(newKyc);
            else rejects('Kyc not created properly!');
        })
    }

    async updateDirectorDetails(kycId: string, directorDetails: [DirectorDetailsDto]) {
        directorDetails.forEach((element, index) => directorDetails[index].kycVerification = "pending");
        const kyc = await this.KycVerificationModel.findByIdAndUpdate(kycId, { $push: { directorDetails: { $each: directorDetails } } }, { new: true });
        kyc.kycStatus.directorDetailsStatus = "completed";
        await kyc.save();
        return kyc;
    }

    async updateCompanyEntity(kycId: string, companyEntity: CompanyEntityDto) {
        return new Promise(async (resolve, rejects) => {
            const kyc = await this.KycVerificationModel.findById(kycId);
            if (kyc && kyc.kycStatus.directorDetailsStatus == "completed") {
                kyc.companyEntity = companyEntity;
                kyc.kycStatus.companyEntityStatus = "completed";
                await kyc.save();
                resolve(kyc);
            }
            else rejects('DirectorDetails not updated');
        });
    }

    async updateBuyerSellerDetails(kycId: string, buyers: [BuyersDto], sellers: [SellersDto]) {
        return new Promise(async (resolve, rejects) => {
            const kyc = await this.KycVerificationModel.findById(kycId);
            if (kyc && kyc.kycStatus.companyEntityStatus == "completed") {
                kyc.buyerSellerDetails.buyerDetails = buyers;
                kyc.buyerSellerDetails.sellerDetails = sellers;
                kyc.kycStatus.buyerSellerDetailsStatus = "completed";
                await kyc.save();
                resolve(kyc);
            }
            else rejects('CompanyEntity not updated');
        });
    }
}

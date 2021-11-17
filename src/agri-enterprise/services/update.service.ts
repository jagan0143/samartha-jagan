import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AgriEnterpriseDocument } from "src/database/schema/agri-enterprise.schema";


@Injectable()
export class AgriEnterpriseUpdate {
    constructor(
        @InjectModel('AgriEnterprise') private readonly AgriEnterpriseModel: Model<AgriEnterpriseDocument>
    ) {}
}
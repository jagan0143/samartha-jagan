import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class CompanyDetails {
    @Prop({ required: true, type: String })
    companyName: string;

    @Prop({ type: String })
    mobileNumber: string;

    @Prop({ type: String })
    emailId: string;

    @Prop({
        type: String,
        required: true,
    })
    panNumber: string

    @Prop({
        type: [String],
        required: true,
    })
    panImgUrl: [string]

    @Prop({
        type: String
    })
    gstId: string

    @Prop({
        type: [String]
    })
    gstImgUrl: [string]

    @Prop({
        type: String
    })
    contactName: string

    @Prop({
        type: String
    })
    designation: string

    @Prop({
        type: String,
        maxLength: 200
    })
    registeredAs: string;

    @Prop({
        type: String,
        maxLength: 200
    })
    aboutTheCompany: string;

    @Prop({
        type: String
    })
    incorporationDate: string;

    @Prop({
        type: [String]
    })
    incorporationCertificateUrl: [string];

    @Prop(raw([{
        licenseType: { type: String },

        licenseUrl: { type: [String] }
    }
    ]))
    licenses: Record<string, any>;

    @Prop({
        type: String,
        enum: ["Food Processing", "Commodity/Trading", "Export & Import", "Input", "Others"]
    })
    businessType: string;

    @Prop({
        type: String
    })
    businessTypeOthers: string;

    @Prop({
        type: String
    })
    sector: string;

    @Prop({
        type: String
    })
    websiteUrl: string;

    @Prop({
        type: String
    })
    stateOfOperation: string;

    @Prop({
        type: String,
        enum: ["Sericulture", "Poultry", "Fishery", "Dairy", "Goatery", "Food processing machinery", "HoReCa",
            "Grain Millers", "Cashew Nut", "Sugarcane", "Cotton", "Rapeseed and Mustard", "Millets", "Ground Nut",
            "Geera", "Coriander", "Coffee", "Tea", "Turmeric", "EdibleOil", "Castor", "Turmeric", "NFTP", "Chilli",
            "Wheat", "Soya bean", "Paddy", "Maize", "Red gram", "Bengal gram", "Green gram", "Black gram", "Mango",
            "Coconut", "Citrus", "Gherkin", "Orange", "Banana", "Onion", "Potato", "Tomato", "Marigold", "Jasmine",
            "Small equipment", "Machineries", "Organic Manure", "Pesticides", "Seeds", "Farm Machinery", "Fertilisers",
            "Feed & Foddery", "Institutional Lending"]
    })
    valueChain: string;

    @Prop({
        type: [String]
    })
    corporateBrochureUrl: [string];

    @Prop({
        type: String
    })
    shareholdingUrl: string;

    @Prop({
        type: [String]
    })
    associationArticleUrl: [string];

    @Prop({
        type: [String]
    })
    associationMemorandumUrl: [string];

}
export const CompanyDetailsSchema = SchemaFactory.createForClass(CompanyDetails);
export interface ProductOptions {
    projectSize: string;
    area: string;
    pincode: string;
    city: string;
    state: string;
    totalCost:any;
    title:string;
    BoQHistory:[];
    context:[],
    moduleDetails: ModuleDetail[];
    inverterDetails: InverterDetail[];
    dCCableDetails: DCCableDetail[];
    dCDBDetails: DCDBDetail[];
    aCCableDetails: ACCableDetail[];
    aCDBDetails: ACDBDetail[];
    earthingElectrodes: EarthingElectrode[];
    mC4Details: MC4Detail[];
    dangerSignboard: SignageAndBoardDetail[];
    project_info : project_info[];
    lightningArrestors  : LightningArrestors[];
    netMeter: NetMeter[];
    generationMeter: GenerationMeter[];
    uid:string;
  }
  
  export interface ModuleDetail {
    brandName: string;
    cellTypeName: string;
    peakPower: number | null;
    quantity: number;
    isUserAdjusted:boolean
  }
  
  export interface InverterDetail {
    brandName: string;
    type: string;
    ratedACPower: number;
    quantity: number;
    listOfInverterRatedACPower: []
  }
  
  export interface DCCableDetail {
    brandName: string;
    conductorMaterialName: string;
    crossSectionalArea: number;
    numberOfCores: number;
    quantity: number;
  }
  
  export interface DCDBDetail {
    specifications: string;
    sku: string;
    quantity: number;
  }
  
  export interface ACCableDetail {
    brandName: string;
    conductorMaterialName: string;
    crossSectionalArea: number;
    numberOfCores: number;
    armoured: string;
    quantity: number;
  }
  
  export interface ACDBDetail {
    specifications: string;
    sku: string;
    quantity: number;
  }
  
  export interface EarthingElectrode {
    brandName: string;
    type: string;
    electrodeLength: string;
    sku: string;
    quantity: number;
  }
  
  export interface LightningArrestors {
    brandName: string;
    protectionRadius: string;
    quantity: number;
    sku: string;
  }

  export interface MC4Detail {
    specifications: string;
    sku: string;
    quantity: number;
  }
  
  export interface SignageAndBoardDetail {
    brandID: number;
    brandName: string;
    quantity: number;
  }

  export interface NetMeter {
    brandName: string;
    quantity: number;
    sku:string;
    type:string;
  }

  export interface GenerationMeter {
    brandName: string;
    quantity: number;
    sku:string;
    type:string;
  }

  export interface project_info
  {
        "area": string,
        "city": string,
        "pincode": number,
        "projectSize": number,
        "state": string,
        "title":string
  }
  
  // Add a factory function for default values
  export function createDefaultProductOptions(): ProductOptions {
    return {
      projectSize: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
      totalCost: '',
      title: '',
      context:[],
      moduleDetails: [],
      inverterDetails: [],
      dCCableDetails: [],
      dCDBDetails: [],
      aCCableDetails: [],
      aCDBDetails: [],
      earthingElectrodes: [],
      mC4Details: [],
      dangerSignboard: [],
      project_info: [],
      BoQHistory:[],
      lightningArrestors:[],
      netMeter:[],
      generationMeter:[],
      uid:''
    };
  }
  
export interface ProductOptions {
    id:string,
    projectSize: string;
    area: string;
    pincode: string;
    city: string;
    state: string;
    totalCost:any;
    title:string;
    uid:string;
    BoQHistory:[];
    context:[];
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
  }
  
  export interface ModuleDetail {
    id:string,
    boq:string,
    brandName: string;
    cellTypeName: string;
    peakPower: number | null;
    quantity: number;
    is_delete: boolean;
    isUserAdjusted:boolean;
  }
  
  export interface InverterDetail {
    id:string,
    boq:string,
    brandName: string;
    type: string;
    ratedACPower: number;
    quantity: number;
    listOfInverterRatedACPower: [];
    is_delete: boolean;
  }
  
  export interface DCCableDetail {
    id:string,
    boq:string,
    brandName: string;
    conductorMaterialName: string;
    crossSectionalArea: number;
    numberOfCores: number;
    quantity: number;
    is_delete: boolean;
  }
  
  export interface DCDBDetail {
    id:string,
    boq:string,
    specifications: string;
    sku: string;
    quantity: number;
    is_delete: boolean;
  }
  
  export interface ACCableDetail {
    id:string,
    boq:string,
    brandName: string;
    conductorMaterialName: string;
    crossSectionalArea: number;
    numberOfCores: number;
    armoured: string;
    quantity: number;
    is_delete: boolean;
  }
  
  export interface ACDBDetail {
    id:string,
    boq:string,
    specifications: string;
    sku: string;
    quantity: number;
    is_delete: boolean;
  }
  
  export interface EarthingElectrode {
    id:string,
    boq:string,
    brandName: string;
    type: string;
    electrodeLength: string;
    terminalSize: string;
    sku: string;
    quantity: number;
    is_delete: boolean;
  }
  
  export interface MC4Detail {
    id:string,
    boq:string,
    specifications: string;
    sku: string;
    quantity: number;
    is_delete: boolean;
  }
  
  export interface SignageAndBoardDetail {
    id:string,
    boq:string,
    brandID: number;
    brandName: string;
    quantity: number;
    is_delete: boolean;
  }

   
  export interface LightningArrestors {
    id:string,
    boq:string,
    brandName: string;
    protectionRadius: string;
    quantity: number;
    sku: string;
    is_delete: false;
  }
  
  export interface NetMeter {
    id:string,
    boq:string,
    brandName: string;
    quantity: number;
    sku:string;
    type:string;
    is_delete: false;
  }

  export interface GenerationMeter {
    brandName: string;
    quantity: number;
    sku:string;
    type:string;
    id:string,
    boq:string,
    is_delete: false
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
      id:'',
      projectSize: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
      totalCost: '',
      title: '',
      uid:'',
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
    };
  }
  
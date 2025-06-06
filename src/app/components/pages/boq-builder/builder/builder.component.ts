import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { BoqBuilderService } from 'src/app/shared/services/boqBuilder/boq-builder.service';
import Swal from 'sweetalert2';
import { ProductOptions, createDefaultProductOptions } from './product-options.model'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NewRoofDataService } from 'src/app/shared/services/new-roof-data.service';
import { TextToSpeechService } from './text-to-speech.service';
import { NotificationService } from 'src/app/shared/services/notification.service';



declare var webkitSpeechGrammarList:any;
declare var webkitSpeechRecognition:any;
declare var webkitSpeechRecognitionEvent:any;
document:Document;

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent {
  isVoiceRecognition: boolean = true;
  recognizing:boolean = false;
  isVoiceRecognitionLang = 'en-US';
  isSpeechEnabled:boolean = false;

  languages = [
    { name: 'English (US)', code: 'en-US' },
    { name: 'Hindi (India)', code: 'hi-IN' },
    { name: 'Marathi (India)', code: 'mr-IN' },
    { name: 'Gujarati (India)', code: 'gu-IN' },
    { name: 'Kannada (India)', code: 'kn-IN' },
  ]

  choices:any=[];

  vSearch:any;
  results:any="";
  chatInputBox:any="";
  isLoader:boolean= false;
  listOfAreas:any = [];

  chatResponses:any = [
    {
      id:1,
      flag: 0,
      datetime:this.getCurrentISODate(),
      chats: `Hello! \n
              Welcome to the BoQ Builder Assistant. 👋\n
              I'm here to help you streamline your project calculations and answer any questions about your Bill of Quantities. How can I assist you today?`
    }
  ];

  // Modules
  listOfModuleBrands:any=[];
  listOfModuleCellTypes:any=[];
  listOfModulePeakPowers: any =[];

  //Inverter
  listOfInverterBrands:any=[];
  listOfInverterTypes:any=[];
  listOfInverterRatedACPower:any=[];
  // DC Cables
  listOfDCCableBrands:any=[];

  listOfDCCableConductorMaterial:any=[];

  listOfDCCrossSectionalArea:any=[];

  listOfDCCableNumberOfCores:any = [
    {
      id: 1,
      name : 1
    },
    {
      id: 2,
      name : 2
    },
    {
      id: 3,
      name : 3
    }
  ]

  //DCDB
  listOfDCDBBrand:any=[];

  listOfDCDBNoOfInput:any=[
    {id:"1",name:"1"},{id:"2",name:"2"},{id:"3",name:"3"},{id:"4",name:"4"},{id:"5",name:"5"},{id:"6",name:"6"},
  ];

  listOfDCDBNoOfOutput:any=[
    {id:"1",name:"1"},{id:"2",name:"2"},{id:"3",name:"3"},{id:"4",name:"4"},{id:"5",name:"5"},{id:"6",name:"6"},
  ];

  listOfDCDBRatedVoltage:any=[]
  listOfDCDBRatedCurrent:any=[]


  // AC Cables
  listOfACCableBrands:any=[];

  listOfACCableConductorMaterial:any=[];

  listOfACCrossSectionalArea:any=[];

  listOfACCableNumberOfCores:any = []

  //ACDB
  listOfACDBBrand:any=[];

  listOfACDBRatedVoltage:any=[];
  listOfACDBRatedCurrent:any=[];

  listOfACDBNoOfInput:any=[
    {id:"1",name:"1"},{id:"2",name:"2"},{id:"3",name:"3"},{id:"4",name:"4"},{id:"5",name:"5"},{id:"6",name:"6"},
  ];

  listOfACDBNoOfOutput:any=[
    {id:"1",name:"1"},{id:"2",name:"2"},{id:"3",name:"3"},{id:"4",name:"4"},{id:"5",name:"5"},{id:"6",name:"6"},
  ];

 // Earthing Electrodes
  listOfEarthingElectrodesBrand:any=[];

  listOfEarthingElectrodesType:any=[];

  listOfEarthingElectrodesLength:any=[];

  listOfEarthingTerminalSize:any=[];




  //MC4
  listOfMC4Brand:any=[];

  listOfMC4RatedVoltage:any=[];
  listOfMC4RatedCurrent:any=[];

  //Signage & Boards
  // listOfSignageAndBoardsBrand:any=[
  //   {
  //     id: 1,
  //     name : "A"
  //   },
  //   {
  //     id: 2,
  //     name : "B"
  //   }
  // ];
  listOfProtectionRadiusOptions :any = {};
  listOfProtectionRadius:any = [];

  listOfProtectionRadiusBrand:any = [];

    //Generation Meter

    listOfGenerationMeterBrand:any=[];

    listOfNetMeterBrand:any=[];

  productOption: ProductOptions[] = [];
  selectedProductOptionIndex:number = 0;

  product:any={};
  title:string ="";
  selectedBoQID:any = null;
  isValueChangedFlag:boolean = false;

  isModuleOptionEnabled : boolean = false;
  isInverterOptionEnabled : boolean = false;
  alternateModuleList:any[] = [];
  alternateInverterList:any[] = [];

  constructor(private ttsService: TextToSpeechService,private notificationService: NotificationService,private newRoofDataService: NewRoofDataService,private route: ActivatedRoute,private router: Router,private modalService: NgbModal,public boqBuilderService:BoqBuilderService,private cdr: ChangeDetectorRef,private ngZone: NgZone)
  {
    
    this.getBrandDetails();

  }

  ngOnInit(): void {
    localStorage.removeItem('context');
    localStorage.removeItem('boQKey');
  }

  getCurrentISODate() {
    const date = new Date();
  
    // Get timezone offset in minutes
    const timezoneOffset = -date.getTimezoneOffset();
    const sign = timezoneOffset >= 0 ? '+' : '-';
  
    // Calculate hours and minutes from the offset
    const pad = (n: number) => String(n).padStart(2, '0');
    const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
    const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);
  
    // Format the fractional seconds (microseconds) manually
    const microseconds = date.getMilliseconds() * 1000;
  
    // Format the date string
    const isoDate =
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
      `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
      `.${String(microseconds).padStart(6, '0')}${sign}${offsetHours}:${offsetMinutes}`;
  
    return isoDate;
  };
  
  

  startRecording() {
    console.log("Start Recording function called");
  
    if (this.isVoiceRecognition) {
      if (this.recognizing) {
        console.log("Already recording...");
        return;
      }
  
      if ("webkitSpeechRecognition" in window) {
        this.vSearch = new webkitSpeechRecognition();
        this.vSearch.continuous = true; // Enables continuous recognition
        this.vSearch.interimResults = true; // Enable partial results
        this.vSearch.lang = this.isVoiceRecognitionLang;
  
        // Capture result event
        this.vSearch.onresult = (e: any) => {
          let interimTranscript = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const transcript = e.results[i][0].transcript;
            if (e.results[i].isFinal) {
              this.results += transcript + " ";
            } else {
              interimTranscript += transcript;
            }
          }
          // Update the chat input box with final and interim results
          this.chatInputBox = this.results.trim() + interimTranscript;
          console.log("Recognized text:", this.chatInputBox);
        };
  
        // Restart recording automatically after natural pauses
        this.vSearch.onend = () => {
          console.log("Speech recognition ended (likely due to pause)");
          this.recognizing = false;
  
          if (this.isVoiceRecognition) {
            console.log("Restarting recognition after pause...");
            this.startRecording();
          }
        };
  
        // Handle errors
        this.vSearch.onerror = (e: any) => {
          console.error("Speech recognition error:", e.error);
          this.recognizing = false;
        };
  
        // Start the recognition process
        this.vSearch.start();
        console.log("Speech recognition started");
        this.recognizing = true;
      } else {
        alert("Your browser does not support voice recognition!");
      }
    }
  }
  
  stopRecording($event:any) {
    console.log("Stop Recording function called");
  
    if (this.recognizing && this.vSearch) {
      this.vSearch.stop(); // Stop the recognition process
      console.log("Speech recognition stopped");
      this.recognizing = false;
    }
  
    this.isVoiceRecognition = false; // Disable recognition until explicitly started
  
    // Reset results and chat input box after stopping
    this.results = "";
    // this.chatInputBox = "";
  
    setTimeout(() => {
      this.isVoiceRecognition = true; // Allow new recordings
    }, 500); // Short delay to reset
  }

  sendResponse()
  {
    if(this.chatInputBox == "" || this.chatInputBox == null || this.chatInputBox == undefined)
    {
      Swal.fire({
            icon: 'error',
            title: "Error",
            html: 'Please type message!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
      });
    }
    else //(this.chatInputBox != "" || this.chatInputBox != null || this.chatInputBox != undefined)
    {
        this.generateBoQData(this.chatInputBox);
    }
  }

  addAlternateOption(item:any,type:string)
  {
    let msg = "";
    if(type == 'Module')
    {
      msg = `Add a ${item.brandName} brand module with ${item.cellTypeName} cell type and a peak power of ${item.peakPower}.`
    }
    if(type == 'Inverter')
    {
        msg = `Add a ${item.brandName} brand inverter with ${item.type} type and a rated power of ${item.ratedACPower}.`
    }

    this.generateBoQData(msg);
  }

  formatChoices(data: any[]) {
  this.choices = data.map(item => {
    const keys = Object.keys(item);

    const display_text = keys.length === 1
      ? item[keys[0]]
      : keys.map(key => `${key}: ${item[key]}`).join(' | ');

    return { ...item, display_text };
  });
}

  generateBoQData(queryText: string)
  {
    this.isLoader = true;

    this.resetAllDropdown();
    this.boqBuilderService.generateBoQ(queryText).subscribe(
      async (res: any) => {
        localStorage.setItem('context',btoa(JSON.stringify(res.context)));
        localStorage.setItem('boQKey',btoa(res.uid));
        this.choices = [];
        this.chatResponses.push(
          {
            id : this.chatResponses.length+1,
            flag : 1,
            datetime:this.getCurrentISODate(),
            chats: queryText
          }
        );
        this.chatInputBox = "";
        

        if(res.type == "followup" || res.type == "confirmation" || res.type == "modify_prompt" || res.type == "error")
        {
          this.chatResponses.push(
            {
              id : this.chatResponses.length+1,
              flag : 0,
              datetime:this.getCurrentISODate(),
              chats: res.generic_chat
            }
          );
          if(this.isSpeechEnabled)
            this.ttsService.speak(res.generic_chat,'en-US');


          if(res.generic_response && res.generic_response.length > 0)
          {
            this.choices = res.generic_response;
            this.formatChoices(res.generic_response);
          }
    
          this.isLoader = false;
        }
        else if(res.type == "boq")
        {
          this.productOption = [];
          this.product = [];
          if(res.generic_chat)
          {
            this.chatResponses.push(
              {
                id : this.chatResponses.length+1,
                flag : 0,
                datetime:this.getCurrentISODate(),
                chats: res.generic_chat
              }
            );
          }
          
          let response = res.boq_details;
          let locationDetails = res?.location_details;
          this.selectedProductOptionIndex = 0;
          if(response.length > 0)
          {
              this.isModuleOptionEnabled = false;
              this.isInverterOptionEnabled = false;
              if(response[0]?.alternative?.alternative_inverter.length > 0)
              {
                this.alternateInverterList = response[0]?.alternative?.alternative_inverter;
              }

              if(response[0]?.alternative?.alternative_module.length > 0)
              {
                this.alternateModuleList = response[0]?.alternative?.alternative_module;
              }
  
  localStorage.setItem('boQKey',btoa(res.uid));
              response.forEach((element:any) => {
                element.moduleDetails.isUserAdjusted = false;
                let details:ProductOptions = {
                  "projectSize":element.Capacity,
                  "area":"",
                  "pincode":"",
                  "city":"",
                  "state":"",
                  "context":[],
                  "uid":res.uid,
                  "totalCost": element.TotalCost,
                  "moduleDetails": element.moduleDetails,
                  "inverterDetails": element.inverterDetails,
                  "dCCableDetails": element.dCCableDetails,
                  "dCDBDetails": element.dCDBDetails,
                  "aCCableDetails":element.aCCableDetails,
                  "aCDBDetails": element.aCDBDetails,
                  "earthingElectrodes" : element.earthingElectrodes,
                  "mC4Details":element.mC4Details, 
                  "dangerSignboard":element.dangerSignboard,
                  "lightningArrestors":element.lightningArrestors,
                  "netMeter":element.netMeter,
                  "generationMeter":element.generationMeter,
                  "project_info":locationDetails,
                  "title": "",
                  "BoQHistory":[]
                };
              
                this.productOption.push(details);
              });

              this.product = this.productOption[this.selectedProductOptionIndex];
              // console.log(this.product)
              this.showSelectedProductData();
              this.isLoader = false;
          }
          else
          {
            this.isLoader = false;
          }
        }
        else
        {
          this.isLoader = false;
        }
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      }
    );
  }

  selectSuggestionOption(options:any)
  {
    // this.generateBoQData(options);
  }

  resetChat()
  {
    localStorage.removeItem('context');
    this.choices = [];
    this.chatResponses = [
      {
        id:1,
        flag: 0,
        datetime:this.getCurrentISODate(),
        chats: `Hello! \n
                Welcome to the BoQ Builder Assistant. 👋\n
                I'm here to help you streamline your project calculations and answer any questions about your Bill of Quantities. How can I assist you today?`
      }
    ];
  }

  speechStop()
  {
    this.isSpeechEnabled = !this.isSpeechEnabled;
    this.ttsService.stop();
  }
  
  getAreaByPinCode() {
    this.isLoader = true;
    this.newRoofDataService.getAreaByPincode(this.product.pincode).subscribe(
      async (response: any) => {
        this.isLoader = false;
        this.listOfAreas = response.results;
      },
      (error: any) => {
        console.log(error.status);
        this.isLoader = false;
        if (error.status == 400) {
          Swal.fire({
            icon: 'error',
            title: "Error",
            html: 'Pincode wrong!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      }
    );
  }

  getCityByArea()
  {
    this.boqBuilderService.getpincodeareabydistrict(this.product.pincode,this.product.area).subscribe(
      async (response: any) => {
        this.isLoader = false;
        // this.listOfAreas = response.results;
        if(response.results.length > 0)
        {
          this.product.city = response.results[0].district;
          this.product.state = response.results[0].state;
        }
      },
      (error: any) => {
        console.log(error.status);
        this.isLoader = false;
        if (error.status == 400) {
          Swal.fire({
            icon: 'error',
            title: "Error",
            html: 'Pincode wrong!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      }
    );
  }


  showSelectedProductData()
  {
    setTimeout(()=>{
      this.getModuleDetails(this.productOption[this.selectedProductOptionIndex].moduleDetails[0].brandName);
      this.getPeakPower(this.productOption[this.selectedProductOptionIndex].moduleDetails[0].brandName,this.productOption[this.selectedProductOptionIndex].moduleDetails[0].cellTypeName);
      this.getRatedACPowerInverter(this.productOption[this.selectedProductOptionIndex].inverterDetails[0].brandName,this.productOption[this.selectedProductOptionIndex].inverterDetails[0].type,0);

      this.getDCConductMaterial(this.productOption[this.selectedProductOptionIndex].dCCableDetails[0].brandName);
      this.getDCCrossSectionalArea(this.productOption[this.selectedProductOptionIndex].dCCableDetails[0].brandName,this.productOption[this.selectedProductOptionIndex].dCCableDetails[0].conductorMaterialName);
    
      this.getACConductMaterial(this.productOption[this.selectedProductOptionIndex].aCCableDetails[0].brandName)
      this.getACCrossSectionalArea(this.productOption[this.selectedProductOptionIndex].aCCableDetails[0].brandName,this.productOption[this.selectedProductOptionIndex].aCCableDetails[0].conductorMaterialName);
      
      this.setListOfProtectionRadiusDefault(this.productOption[this.selectedProductOptionIndex].lightningArrestors[0].brandName);
      this.getEarthingType(this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].brandName);
      this.getEarthingElectrodeLength(this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].brandName,this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].type);
      // this.getEarthingTerminalSize(this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].brandName,this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].type,this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].electrodeLength);
    
      
    
    },300);
  }

  resetAllDropdown()
  {
    this.listOfModuleCellTypes = [];
    this.listOfModulePeakPowers = [];
    this.listOfInverterRatedACPower = [];
    this.listOfACCableConductorMaterial = []
    this.listOfACCrossSectionalArea = [];
    this.listOfDCCableConductorMaterial = [];
    this.listOfDCCrossSectionalArea = [];
    this.listOfEarthingElectrodesLength = [];
    this.listOfEarthingElectrodesType = [];
    this.listOfEarthingTerminalSize = [];
  }

  addInverter(data:any)
  {
    data.push(
      {
        "brandName": null,
        "Type": null,
        "ratedACPower" : null,
        "quantity": 0
      }
    )
  }

  removeItem(data:any,i:number)
  {
    this.isValueChangedFlag = true;
    data.splice(i,1)
  }

  addModule(ind:number,key:string)
  {
    if(key == 'moduleDetails')
    {
      this.productOption[ind][key].push({
          "brandName": "",
          "cellTypeName":"0","peakPower":0,"quantity": 0,"isUserAdjusted":false,
        });
    }
    else if(key == 'dCCableDetails')
    {
      this.productOption[ind][key].push({
        "brandName": "", "conductorMaterialName":"",
        "crossSectionalArea":0, "numberOfCores": 0, "quantity": 0
      });
    }
    else if(key == 'dCDBDetails')
    {
      this.productOption[ind][key].push({

          "sku": "", "specifications":"", "quantity": 0
      });

    }
     else if(key == 'aCCableDetails')
    {
      this.productOption[ind][key].push({
        "brandName": "", "conductorMaterialName":"",
        "crossSectionalArea":0, "numberOfCores": 0, "quantity": 0,"armoured":"",
      });
    }
    else if(key == 'aCDBDetails')
      {
        this.productOption[ind][key].push({
          "sku": "", "specifications":"", "quantity": 0
        });
      }
      else if(key == 'earthingElectrodes')
      {
        this.productOption[ind][key].push({
          "brandName": "", "type":"",
          "electrodeLength":"", "sku":"",  "quantity": 0
        });
      }
      else if(key == 'mC4Details')
      {
        this.productOption[ind][key].push({
         "specifications": "", "sku":"", "quantity": 0
        });

      }
       else if(key == 'dangerSignboard')
      {
        this.productOption[ind][key].push({
          "brandID": 0, "brandName": "", "quantity": 0
        });

      } 
      else if(key == 'lightningArrestors')
        {
          this.productOption[ind][key].push({
            "protectionRadius": "", "brandName": "", "quantity": 0,"sku":""
          });
  
        } 
        else if(key == 'generationMeter')
          {
            this.productOption[ind][key].push({
               "brandName": "", "quantity": 0,"sku":"","type":""
            });
    
          } 
          else if(key == 'netMeter')
            {
              this.productOption[ind][key].push({
                "brandName": "", "quantity": 0,"sku":"","type":""
              });
      
            } 
  }

  removeAll(ind:number, key: keyof ProductOptions)
  {
    // this.productOption[ind][key] =[];
    this.isValueChangedFlag = true;
    if (Array.isArray(this.productOption[ind][key])) {
      (this.productOption[ind][key] as any[]).length = 0; // Clear the array
    }
  }

  addorMinusAnyValue(model: keyof ProductOptions, key: string, operator: string, index: number): void {
    this.isValueChangedFlag = true;
    const target = index === -1 
      ? this.productOption[0][model] 
      : (this.productOption[0][model] as any[])[index]; // Explicitly cast to array for indexed access
  
    if (typeof target === 'object' && target !== null && !(target instanceof Array)) {
      // Ensure target is an object and not an array or string
      if (key in target && typeof target[key as keyof typeof target] === 'number') {
        const currentValue = target[key as keyof typeof target] as number;
        const newValue = operator === 'add' ? currentValue + 1 : currentValue - 1;
        target[key as keyof typeof target] = Math.max(0, newValue) as any;
      }
    }
  }
  

  getBrandDetails()
  {
    this.isLoader = true;
    this.boqBuilderService.getAllBrands().subscribe(
      async (response: any) => {
        let res = response;
        this.isLoader = false;
        this.listOfACCableBrands = res.ac_cables_manufacturers;
        this.listOfACDBBrand = res.acdb_manufacturers;
        this.listOfDCCableBrands = res.dc_cables_manufacturers;
        this.listOfDCDBBrand= res.dcdb_manufacturers;
        this.listOfEarthingElectrodesBrand = res.earthing_rod_manufacturers;
        this.listOfInverterBrands = res.inverter_manufacturers;
        this.listOfMC4Brand = res.mc4_connectors;
        this.listOfModuleBrands = res.module_manufacturers;
        this.listOfInverterTypes=res.inverter_type;
        this.listOfNetMeterBrand = res.bi_meter;
        this.listOfGenerationMeterBrand = res.uni_meter;
        this.listOfProtectionRadiusBrand = res.lightning_arrestor.brands;
        this.listOfProtectionRadiusOptions = res.lightning_arrestor.optionsByBrand;
        // console.log(this.listOfInverterBrands)
        this.getRateVolatageAndCurrent();
        this.getACCablesNoOfCors();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  setListOfProtectionRadiusDefault(selectedBrand:string)
  {
    const key = selectedBrand?.trim();
    this.listOfProtectionRadius = [...this.listOfProtectionRadiusOptions[key]];
  }

  setListOfProtectionRadius(selectedBrand:string)
  {
    this.isValueChangedFlag = true;
    this.setListOfProtectionRadiusDefault(selectedBrand);
  }

  //Start Code for Module Details functions and API's
  fetchModuleDetails(selectedItem:any,item:any)
  { 
    this.isValueChangedFlag = true;
    item.isUserAdjusted = true;
    this.getModuleDetails(selectedItem);
  }

  getModuleDetails(selectedItem:any)
  {
    this.boqBuilderService.getAllModuleCellType(selectedItem).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.CellType.length > 0)
        {
          res?.CellType.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfModuleCellTypes = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fetchPeakPower(brand:string,cellType:string,item:any)
  {
    this.isValueChangedFlag = true;
    item.isUserAdjusted = true;
    this.getPeakPower(brand,cellType);
  }
  
  getPeakPower(brand:string,cellType:string)
  {
    this.boqBuilderService.getPeakPower(brand,cellType).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.length > 0)
        {
          let sortedArr = res.sort((a:any, b:any) => Number(a) - Number(b));
          sortedArr?.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfModulePeakPowers = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  changePeakPower(item:any)
  {
    this.isValueChangedFlag = true;
    item.isUserAdjusted = true;
  }
  //End Code for Module Details functions and API's

  //Start Code for Inverter Details functions and API's
  onInverterBrandChange()
  {
    this.isValueChangedFlag = true;
  }

  fetchRatedACPowerInverter(brandName:string,type:string,index:number)
  {
    this.isValueChangedFlag = true;
    this.getRatedACPowerInverter(brandName,type,index);
  }

  getRatedACPowerInverter(brandName:string,type:string,index:number)
  {
    this.boqBuilderService.getRatedACPowerInverter(brandName,type).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        this.productOption[this.selectedProductOptionIndex].inverterDetails[index].listOfInverterRatedACPower = [];
        if(res?.RatedACPower.length > 0)
        {
          res?.RatedACPower.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        // this.listOfInverterRatedACPower = data;
        this.productOption[this.selectedProductOptionIndex].inverterDetails[index].listOfInverterRatedACPower = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  changeRatedACPower()
  {
    this.isValueChangedFlag = true;
  }
  //End Code for Inverter Details functions and API's

  
  //Start Code for DC Cables Details functions and API's
  fetchDCConductMaterial(brandName:string)
  {
    this.isValueChangedFlag = true;
    this.getDCConductMaterial(brandName);
  }

  getDCConductMaterial(brandName:string)
  {
    this.boqBuilderService.getDCConductMaterial(brandName).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.conductype.length > 0)
        {
          res?.conductype.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfDCCableConductorMaterial = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  fetchDCCrossSectionalArea(brandName:string,conductor:string)
  {
    this.isValueChangedFlag = true;
    this.getDCCrossSectionalArea(brandName,conductor)
  }

  getDCCrossSectionalArea(brandName:string,conductor:string)
  {
    this.boqBuilderService.getDCCrossSectionalArea(brandName,conductor).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.CrossSectionalArea.length > 0)
        {
          res?.CrossSectionalArea.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfDCCrossSectionalArea = data;
      },
      (error: any) => {
        console.error(error);
      });
  }
  
  onChangeDCCableCrossSectionalArea()
  {
    this.isValueChangedFlag = true;
  }

  onChangeDCCableNumberofCores()
  {
    this.isValueChangedFlag = true;
  }
  //End Code for DC Cables Details functions and API's

 
  //Start Code for DCDB Details functions and API's
  changeDCDBBrand()
  {
    this.isValueChangedFlag = true;
  }

  changeDCDBNumberOfInputsAndOutput()
  {
    this.isValueChangedFlag = true;
  }

  changeDCDBRatedVoltage()
  {
    this.isValueChangedFlag = true;
  }

  changeDCDBRatedCurrent()
  {
    this.isValueChangedFlag = true;
  }

  getRateVolatageAndCurrent()
  {
    this.boqBuilderService.getRateVolatageAndCurrent().subscribe(
      async (response: any) => {
        let res = response;
        this.listOfDCDBRatedVoltage = res?.DCDB?.ratedvoltage;
        this.listOfDCDBRatedCurrent = res?.DCDB?.ratedcurrent;
        this.listOfACDBRatedVoltage = res?.ACDB?.ratedvoltage;
        this.listOfACDBRatedCurrent = res?.ACDB?.ratedcurrent;
        this.listOfMC4RatedVoltage = res?.MC4?.ratedvoltage;
        this.listOfMC4RatedCurrent = res?.MC4?.ratedcurrent;
      },
      (error: any) => {
        console.error(error);
      });
  }
  

  //End Code for DCDB Details functions and API's
  
  //Start Code for AC Cables Details functions and API's
  getACCablesNoOfCors()
  {
    this.boqBuilderService.getACCablesNoOfCors().subscribe(
      async (response: any) => {
        let res = response;
        this.listOfACCableNumberOfCores = res;
      },
      (error: any) => {
        console.error(error);
      });
  }

  fetchACConductMaterial(brandName:string)
  {
    this.isValueChangedFlag = true;
    this.getACConductMaterial(brandName);
  }

  getACConductMaterial(brandName:string)
  {
    this.boqBuilderService.getACConductMaterial(brandName).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.conductor.length > 0)
        {
          res?.conductor.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfACCableConductorMaterial = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  fetchACCrossSectionalArea(brandName:string,conductor:string)
  {
    this.isValueChangedFlag = true;
    this.getACCrossSectionalArea(brandName,conductor)
  }

  getACCrossSectionalArea(brandName:string,conductor:string)
  {
    this.boqBuilderService.getACCrossSectionalArea(brandName,conductor).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.CrossSectionalArea.length > 0)
        {
          res?.CrossSectionalArea.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        // console.log("data",data)
        this.listOfACCrossSectionalArea = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  changeACCrossSectionalArea()
  {
    this.isValueChangedFlag = true;
  }

  changeACNoOfCores()
  {
    this.isValueChangedFlag = true;
  }

  changeACArmoured()
  {
    this.isValueChangedFlag = true;
  }
//End Code for AC Cables Details functions and API's

//Start Code for ACDB Details functions and API's
  changeACDBBrand()
  {
    this.isValueChangedFlag = true;
  }

  changeACDBNoOfInputAndOutput()
  {
    this.isValueChangedFlag = true;
  }

  changeACDBRatedVoltage()
  {
    this.isValueChangedFlag = true;
  }

  changeACDBRatedCurrent()
  {
    this.isValueChangedFlag = true;
  }
  //End Code for ACDB Details functions and API's

  //Start Code for Earthing Electrodes Details functions and API's
  fetchEarthingType(brandName:string)
  {
    this.isValueChangedFlag = true;
    this.getEarthingType(brandName);
  }

  getEarthingType(brandName:string)
  {
    this.boqBuilderService.getEarthingType(brandName).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.earthing_type.length > 0)
        {
          res?.earthing_type.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfEarthingElectrodesType = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  fetchEarthingElectrodeLength(brandName:string,type:string)
  {
    this.isValueChangedFlag = true;
    this.getEarthingElectrodeLength(brandName,type);
  }


  getEarthingElectrodeLength(brandName:string,type:string)
  {
    this.boqBuilderService.getEarthingElectrodeLength(brandName,type).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.electrode_length.length > 0)
        {
          res?.electrode_length.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfEarthingElectrodesLength = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  fetchEarthingTerminalSize(brandName:string,type:string,terminal:string)
  {
    this.isValueChangedFlag = true;
    this.getEarthingTerminalSize(brandName,type,terminal);
  }

  getEarthingTerminalSize(brandName:string,type:string,terminal:string)
  {
    this.boqBuilderService.getEarthingTerminalSize(brandName,type,terminal).subscribe(
      async (response: any) => {
        let res = response;
        let data:any = [];
        if(res?.terminal_size.length > 0)
        {
          res?.terminal_size.forEach((element:any) => {
            data.push({id : element, name: element});
          });
        }
        this.listOfEarthingTerminalSize = data;
      },
      (error: any) => {
        console.error(error);
      });
  }

  changeTerminalSize()
  {
    this.isValueChangedFlag = true;
  }

  //End Code for Earthing Electrodes Details functions and API's

  //Start Code for MC4 Connectors Details functions and API's
  changeMC4Brand()
  {
    this.isValueChangedFlag = true;
  }

  changeMC4RatedVoltage()
  {
    this.isValueChangedFlag = true;
  }

  changeMC4RatedCurrent()
  {
    this.isValueChangedFlag = true;
  }

  //End Code for MC4 Connectors Details functions and API's


  //Start Code for Signage And Boards Details functions and API's
  changeSignageAndBoardsBrand()
  {
    this.isValueChangedFlag = true;
  }

  //End Code for Signage And Boards Details functions and API's

  meterChange(data:any,key:string)
  {
    console.log(data);
    if(key == 'generationMeter')
    {
      const matched = this.listOfGenerationMeterBrand.find((item: any) => item.brandName === data.brandName);

      if (matched) {
        data.sku = matched.sku;
        data.type = matched.type;
        // this.productOption[this.selectedProductOptionIndex].generationMeter[0].sku = matched.sku;
        // this.productOption[this.selectedProductOptionIndex].generationMeter[0].type = matched.type;
      }

    }

    if(key == 'netMeter')
    {
      const matched =  this.listOfNetMeterBrand.find((item: any) => item.brandName === data.brandName);

      if (matched) {
        data.sku = matched.sku;
        data.type = matched.type;
        // this.productOption[this.selectedProductOptionIndex].netMeter[0].sku = matched.sku;
        // this.productOption[this.selectedProductOptionIndex].netMeter[0].type = matched.type;
      }
    }
  }
  
  onBrandChanges()
  {
    this.isValueChangedFlag = true;
  }

  calculateBoQ()
  {
    this.isLoader = true;
    let data = {
      boq_details : [this.product]
    }
    this.boqBuilderService.calculateBoq(data).subscribe(
      async (result: any) => { 
          if(!result.error)
          {
            setTimeout(()=>
            {
              this.isLoader = false;
              this.isValueChangedFlag = false;
              // Updating values from result (newData) to productOption[selectedProductOptionIndex] (sample_data)
              Object.keys(result).forEach(key => {
                if (Array.isArray(result[key])) {
                    result[key].forEach((item: any, index: number) => {
                        if (this.productOption[this.selectedProductOptionIndex][key as keyof ProductOptions] &&
                            (this.productOption[this.selectedProductOptionIndex][key as keyof ProductOptions] as any)[index]) {
                            Object.keys(item).forEach(subKey => {
                                (this.productOption[this.selectedProductOptionIndex][key as keyof ProductOptions] as any)[index][subKey] = item[subKey];
                            });
                        } else {
                            this.productOption[this.selectedProductOptionIndex][key as keyof ProductOptions] = result[key];
                        }
                    });
                } else if (typeof result[key] === 'object' && result[key] !== null) {
                    this.productOption[this.selectedProductOptionIndex][key as keyof ProductOptions] = {
                        ...(this.productOption[this.selectedProductOptionIndex][key as keyof ProductOptions] as any),
                        ...result[key]
                    };
                } else {
                    this.productOption[this.selectedProductOptionIndex][key as keyof ProductOptions] = result[key];
                }
            });
              this.productOption[this.selectedProductOptionIndex].totalCost = [result.total_rate];
              if(this.productOption[this.selectedProductOptionIndex].moduleDetails.length > 0)
                this.productOption[this.selectedProductOptionIndex].moduleDetails[0].isUserAdjusted = false;          
            },200);
          }
          else
          {
            this.isLoader = false;
            console.error(result.error);
          }
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
    });
  }
  
  isProductValid(): boolean {
    return this.product && Object.keys(this.product).length > 0;
  }

  confirmBoQ(modalRef:any)
  {
    this.modalService.open(modalRef, { size: 'md' ,backdrop: 'static', centered: true});
  }


  saveBoQ()
  {
      if(this.title == '' || this.title == undefined || this.title == null || this.title.trim() === '')
      {
        Swal.fire({
          icon: 'error',
          title: "Error",
          html: 'Please enter title!',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return
      }
    this.product.BoQHistory = this.chatResponses;
    this.product.title = this.title;
    let ctxt:any = localStorage.getItem("context");
    this.product.context = ctxt ? JSON.stringify(JSON.parse(atob(ctxt))) : JSON.stringify([]),
    this.isLoader = true;
    let data ={
      boq_details : [this.product]
    }
    this.boqBuilderService.saveBoQ(data).subscribe(
      async (result: any) => {   
        Swal.fire({
          title: "Success",
          icon:"success",
          html:"BoQ Saved Successfully!",
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.modalService.dismissAll();
            this.router.navigate(['/pages/boq/listing']);
            this.notificationService.triggerFetchData();
          }
        })
        this.isLoader = false;
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
    });
    
  }

  sendCostEstimation()
  {
    //console.log(this.product);
    this.boqBuilderService.sendRFQOnEmail(this.product).subscribe(
      async (result: any) => {   
        Swal.fire({
          title: "Success",
          icon:"success",
          html:result.message,
          showCancelButton: false,
          confirmButtonText: "OK",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          // if (result.isConfirmed) {
            this.modalService.dismissAll();
            // this.router.navigate(['/pages/boq/listing']);
          // }
        })
        this.isLoader = false;
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
    });
  }
}

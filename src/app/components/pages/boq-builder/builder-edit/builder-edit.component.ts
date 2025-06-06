import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { BoqBuilderService } from 'src/app/shared/services/boqBuilder/boq-builder.service';
import Swal from 'sweetalert2';
import { ProductOptions, createDefaultProductOptions } from './edit-product-options.model'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NewRoofDataService } from 'src/app/shared/services/new-roof-data.service';
import { TextToSpeechService } from '../builder/text-to-speech.service';

declare var webkitSpeechGrammarList:any;
declare var webkitSpeechRecognition:any;
declare var webkitSpeechRecognitionEvent:any;
document:Document;

@Component({
  selector: 'app-builder-edit',
  templateUrl: './builder-edit.component.html',
  styleUrls: ['./builder-edit.component.scss']
})
export class BuilderEditComponent {
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

  choices:any= [];





  vSearch:any;
  results:any="";
  chatInputBox:any="";
  isLoader:boolean= false;
  listOfAreas:any = [];
  chatResponses:any = [
    {
      id:1,
      flag: 0,
      dateTime:this.getCurrentISODate(),
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
  listOfSignageAndBoardsBrand:any=[
    {
      id: 1,
      name : "A"
    },
    {
      id: 2,
      name : "B"
    }
  ];
  productOption: ProductOptions[] = [];
  selectedProductOptionIndex:number = 0;


    listOfProtectionRadiusOptions :any = {};
  listOfProtectionRadius:any = [];

  listOfProtectionRadiusBrand:any = [];

    //Generation Meter

    listOfGenerationMeterBrand:any=[];

    listOfNetMeterBrand:any=[];


  existsBoQDump: ProductOptions[] = [];
  product:any={};
  title:string ="";
  selectedBoQID:any = null;
  isNewRecord:boolean = true;
  isValueChangedFlag:boolean = false;
  
  deletedItemList:any = []; 
  
  constructor(private ttsService: TextToSpeechService,private newRoofDataService: NewRoofDataService,private route: ActivatedRoute,private router: Router,private modalService: NgbModal,public boqBuilderService:BoqBuilderService,private cdr: ChangeDetectorRef,private ngZone: NgZone)
  {
    this.getBrandDetails();

    
    

  }

  getByIDBoQ()
  {
    this.isLoader = true;
    this.productOption = [];
    this.resetAllDropdown();
    this.boqBuilderService.getByIDBoQ(this.selectedBoQID).subscribe(
      async (res: any) => {
        let response:any = [res];
        this.isLoader = false;
        // let response = res.boq_details;
          let locationDetails:any =  {
            "area": res.area,
            "city": res.city,
            "pincode": res.pincode,
            "projectSize": res.projectSize,
            "state": res.state,
            "title":res.title
          };
          localStorage.setItem('boQKey',btoa(res.uid));
          this.selectedProductOptionIndex = 0;
          
          if(response.length > 0)
          {
              response.forEach((element:any) => {
                 element.dCDBDetails[0].specifications = "As Per Requirement";
                 element.aCDBDetails[0].specifications = "As Per Requirement";
                 element.mC4Details[0].specifications = "As Per Requirement";
                 element.signageAndBoardsDetails[0].specifications = "As Per Requirement";
                let details:ProductOptions = {
                  "id":element.id,
                  "uid":element.uid,
                  "projectSize":locationDetails.projectSize,
                  "area":locationDetails.area,
                  "pincode":locationDetails.pincode,
                  "city":locationDetails.city,
                  "state":locationDetails.state,
                  "totalCost": [element.totalCost],
                  "moduleDetails": element.moduleDetails,
                  "inverterDetails": element.inverterDetails,
                  "dCCableDetails": element.dCCableDetails,
                  "dCDBDetails": element.dCDBDetails,
                  "aCCableDetails":element.aCCableDetails,
                  "aCDBDetails": element.aCDBDetails,
                  "earthingElectrodes" : element.earthingElectrodes,
                  "mC4Details":element.mC4Details, 
                  "dangerSignboard":element.signageAndBoardsDetails,
                  "project_info":locationDetails,
                  "title": element.title,
                  "BoQHistory":element.BoQHistory,
                  "lightningArrestors":element.lightningArrestors,
                  "netMeter":element.netMeter,
                  "generationMeter":element.generationMeter,
                  "context": JSON.parse(element.context)
                };
                // console.log(JSON.parse(element.context))
                localStorage.setItem('context',btoa(JSON.stringify(JSON.parse(element.context))));
                this.chatResponses = element.BoQHistory;
                this.productOption.push(details);
              });
              this.existsBoQDump = JSON.parse(JSON.stringify(this.productOption));
              this.product = this.productOption[this.selectedProductOptionIndex];
              this.showSelectedProductData();
              // console.log("this.product",this.product)
              this.isLoader = false;
          }
          else
          {
            this.isLoader = false;
          }
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
      });
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

  generateBoQData(queryText: string)
  {
    this.isLoader = true;
      // this.productOption = [];
      this.resetAllDropdown();
      this.boqBuilderService.generateBoQ(queryText).subscribe(
        async (res: any) => {
          localStorage.setItem('context',btoa(JSON.stringify(res.context)));
          this.choices = [];
          this.chatResponses.push(
            {
              id : null,//this.chatResponses.length+1,
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
                  id : null,//this.chatResponses.length+1,
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
              let response = res?.boq_details;
              let locationDetails = res?.location_details;
              this.selectedProductOptionIndex = 0;
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
              if(response.length > 0)
              {
                
                this.productOption = JSON.parse(JSON.stringify(this.existsBoQDump));
                if (!this.deletedItemList[0]) {
                  this.deletedItemList[0] = {} as ProductOptions;
                }
                
                // Initialize empty arrays for each category in deletedItemList
                const categories = [
                  "moduleDetails", "inverterDetails", "dCCableDetails", "dCDBDetails",
                  "aCCableDetails", "aCDBDetails", "earthingElectrodes", "mC4Details",
                  "lightningArrestors","netMeter","generationMeter","dangerSignboard"

                ];
                
                categories.forEach((category:string) => {
                  if (!this.deletedItemList[0][category]) {
                    this.deletedItemList[0][category] = [];
                  }
                  // this.deletedItemList[0][category as keyof ProductOptions] = <any>[];
                  
                  const items = this.productOption[this.selectedProductOptionIndex][category as keyof ProductOptions];
                  
                  // Ensure items is an array before calling forEach
                  if (Array.isArray(items)) {
                    items.forEach((item: any) => {
                      if (item.id) { // Only delete if the item has an ID
                        const isAlreadyDeleted = (this.deletedItemList[0][category] as any[]).some(
                          (deletedItem) => deletedItem.id === item.id
                        );
                  
                        if (!isAlreadyDeleted) {
                          item.is_delete = true;
                          (this.deletedItemList[0][category] as any[]).push({ ...item, is_delete: true });
                        }


                       }
                    });
                  }
                });





                  response.forEach((element:any) => {
                    element.moduleDetails.isUserAdjusted = false;

                    element.moduleDetails.is_delete = false;
                    element.moduleDetails.boq = this.productOption[this.selectedProductOptionIndex].id;
                    // this.productOption[this.selectedProductOptionIndex].moduleDetails.push(element.moduleDetails);
                    
                    element.dCDBDetails.is_delete = false;
                    element.dCDBDetails.boq = this.productOption[this.selectedProductOptionIndex].id;
                    // this.productOption[this.selectedProductOptionIndex].dCDBDetails.push(element.dCDBDetails);
                    

                    element.inverterDetails.forEach((item:any) => {
                      item.is_delete = false;
                      item.id = null;
                      item.boq = this.productOption[this.selectedProductOptionIndex].id;
                      // this.productOption[this.selectedProductOptionIndex].inverterDetails.push(item);
                    });

                    element.dCCableDetails.forEach((item:any) => {
                      item.is_delete = false;
                      item.id = null;
                      item.boq = this.productOption[this.selectedProductOptionIndex].id;
                      // this.productOption[this.selectedProductOptionIndex].dCCableDetails.push(item);
                    });

                    element.aCCableDetails.forEach((item:any) => {
                      item.is_delete = false;
                      item.id = null;
                      item.boq = this.productOption[this.selectedProductOptionIndex].id;
                      // this.productOption[this.selectedProductOptionIndex].aCCableDetails.push(item);
                    });

                    element.aCDBDetails.forEach((item:any) => {
                      item.is_delete = false;
                      item.id = null;
                      item.boq = this.productOption[this.selectedProductOptionIndex].id;
                      // this.productOption[this.selectedProductOptionIndex].aCDBDetails.push(item);
                    });

                    element.earthingElectrodes.forEach((item:any) => {
                      item.is_delete = false;
                      item.id = null;
                      item.boq = this.productOption[this.selectedProductOptionIndex].id;
                      // this.productOption[this.selectedProductOptionIndex].earthingElectrodes.push(item);
                    });
                    element.mC4Details.forEach((item:any) => {
                      item.is_delete = false;
                      item.id = null;
                      item.boq = this.productOption[this.selectedProductOptionIndex].id;
                      // this.productOption[this.selectedProductOptionIndex].mC4Details.push(item);
                    });




                    this.productOption[this.selectedProductOptionIndex].projectSize = element.Capacity
                    this.productOption[this.selectedProductOptionIndex].totalCost = [element.TotalCost];
                    
                    this.productOption[this.selectedProductOptionIndex].moduleDetails = [element.moduleDetails],
                    this.productOption[this.selectedProductOptionIndex].inverterDetails = element.inverterDetails,
                    this.productOption[this.selectedProductOptionIndex].dCCableDetails= element.dCCableDetails,
                    this.productOption[this.selectedProductOptionIndex].dCDBDetails= [element.dCDBDetails],
                    this.productOption[this.selectedProductOptionIndex].aCCableDetails=element.aCCableDetails,
                    this.productOption[this.selectedProductOptionIndex].aCDBDetails=element.aCDBDetails,
                    this.productOption[this.selectedProductOptionIndex].earthingElectrodes=element.earthingElectrodes,
                    this.productOption[this.selectedProductOptionIndex].mC4Details=element.mC4Details, 
                    
                    this.productOption[this.selectedProductOptionIndex].dangerSignboard=[]
                  //   let details:ProductOptions = {
                  //     "id":element.id,
                  //     "projectSize":element.Capacity,
                  //     "area":locationDetails?.area || '',
                  //     "pincode":locationDetails?.pincode|| '',
                  //     "city":locationDetails?.city|| '',
                  //     "state":locationDetails?.state|| '',
                  //     "totalCost": element.TotalCost,
                  //     "moduleDetails": [element.moduleDetails],
                  //     "inverterDetails": element.inverterDetails,
                  //     "dCCableDetails": element.dCCableDetails,
                  //     "dCDBDetails": [element.dCDBDetails],
                  //     "aCCableDetails":element.aCCableDetails,
                  //     "aCDBDetails": element.aCDBDetails,
                  //     "earthingElectrodes" : element.earthingElectrodes,
                  //     "mC4Details":element.mC4Details, 
                  //     "signageAndBoardsDetails":[],
                  //     "project_info":locationDetails,
                  //     "title": "",
                  //     "BoQHistory":[],
                  //     "context": response.context
                  //   };
                  //   this.productOption.push(details);
                  });
                  console.log(this.productOption[this.selectedProductOptionIndex]);
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
        },
        (error: any) => {
          this.isLoader = false;
          console.error(error);
        }
      );
  }

  selectSuggestionOption(options:any)
  {
    // console.log(options)
    // let msg = this.generateMessage(options);
    // this.generateBoQData(msg);
  }

  generateMessage(data: { [key: string]: any }): string {
    const entries = Object.entries(data)
      .filter(([key, _]) => key !== 'display_text') // Exclude display_text
      .map(([key, value]) => `${key} is ${value}`); // Convert to "key is value"

    return `Please change an data with ${entries.join(' and ')} based on the last question`;
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

  showSelectedProductData()
  {
    
    setTimeout(()=>{
    // this.getAreaByPinCode();
    // this.getCityByArea();
      // console.log(this.productOption)
    this.getModuleDetails(this.productOption[this.selectedProductOptionIndex].moduleDetails[0].brandName);
    this.getPeakPower(this.productOption[this.selectedProductOptionIndex].moduleDetails[0].brandName,this.productOption[this.selectedProductOptionIndex].moduleDetails[0].cellTypeName);
    
    this.productOption[this.selectedProductOptionIndex].inverterDetails.forEach((item,index)=>{
      this.getRatedACPowerInverter(item.brandName,item.type,index);
    })
    
    this.getDCConductMaterial(this.productOption[this.selectedProductOptionIndex].dCCableDetails[0].brandName);
    this.getDCCrossSectionalArea(this.productOption[this.selectedProductOptionIndex].dCCableDetails[0].brandName,this.productOption[this.selectedProductOptionIndex].dCCableDetails[0].conductorMaterialName);
   
    this.getACConductMaterial(this.productOption[this.selectedProductOptionIndex].aCCableDetails[0].brandName)
    this.getACCrossSectionalArea(this.productOption[this.selectedProductOptionIndex].aCCableDetails[0].brandName,this.productOption[this.selectedProductOptionIndex].aCCableDetails[0].conductorMaterialName);
    
    this.setListOfProtectionRadiusDefault(this.productOption[this.selectedProductOptionIndex].lightningArrestors[0].brandName);

    this.getEarthingType(this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].brandName);
    this.getEarthingElectrodeLength(this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].brandName,this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].type);
    // this.getEarthingTerminalSize(this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].brandName,this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].type,this.productOption[this.selectedProductOptionIndex].earthingElectrodes[0].electrodeLength)
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
        "id":"",
        "brandName": null,
        "Type": null,
        "ratedACPower" : null,
        "quantity": 0,
        "is_delete":false
      }
    )
  }

  removeItem(data:any,i:number, key: keyof ProductOptions)
  {
    this.isValueChangedFlag = true;
    if (!this.deletedItemList[0]) {
      this.deletedItemList[0] = {} as ProductOptions;
    }

    if (!Array.isArray(this.deletedItemList[0][key])) {
      this.deletedItemList[0][key] = []; // Initialize as an empty array if not already defined
    }

    this.deletedItemList[0][key].push({...data[i],is_delete : true});

    data.splice(i,1)
  }

  addModule(ind:number,key:string)
  {
    if(key == 'moduleDetails')
    {
      this.productOption[ind][key].push({"id":"","boq":this.product.id,
          "brandName": "", "cellTypeName":"0","peakPower":0,"quantity": 0,"is_delete":false,"isUserAdjusted":false
      });
    }
    else if(key == 'dCCableDetails')
    {
      this.productOption[ind][key].push({"id":"","boq":this.product.id,
        "brandName": "", "conductorMaterialName":"",
        "crossSectionalArea":0, "numberOfCores": 0, "quantity": 0,"is_delete":false
      });
    }
    else if(key == 'dCDBDetails')
    {
      this.productOption[ind][key].push({"id":"","boq":this.product.id,
          "specifications": "",
    "sku": "", "quantity": 0,"is_delete":false
      });
    }
     else if(key == 'aCCableDetails')
    {
      this.productOption[ind][key].push({"id":"","boq":this.product.id,
       "brandName": "", "conductorMaterialName":"",
        "crossSectionalArea":0, "numberOfCores": 0, "quantity": 0,"armoured":"","is_delete":false
      });
    }
    else if(key == 'aCDBDetails')
    {
      this.productOption[ind][key].push({"id":"","boq":this.product.id,
           "specifications": "",
    "sku": "", "quantity": 0,"is_delete":false
      });
    }
    else if(key == 'earthingElectrodes')
    {

      this.productOption[ind][key].push({"id":"","boq":this.product.id,
        "brandName": "", "type":"",
        "electrodeLength":"", "terminalSize":"","sku":"",  "quantity": 0,"is_delete":false
      });
    }
    else if(key == 'mC4Details')
    {
      this.productOption[ind][key].push({"id":"","boq":this.product.id,
        "specifications": "", "sku":"", "quantity": 0,"is_delete":false
      });
    }
     else if(key == 'dangerSignboard')
    {
      this.productOption[ind][key].push({"id":"","boq":this.product.id,
        "brandID": 0, "brandName": "", "quantity": 0,"is_delete":false
      });
    } 

      else if(key == 'lightningArrestors')
        {
          this.productOption[ind][key].push({ "id":"","boq":"",
            "protectionRadius": "", "brandName": "", "quantity": 0,"sku":"","is_delete":false
          });
  
        } 
        else if(key == 'generationMeter')
          {
            this.productOption[ind][key].push({"id":"","boq":"",
               "brandName": "", "quantity": 0,"sku":"","type":"","is_delete":false
            });
    
          } 
          else if(key == 'netMeter')
            {
              this.productOption[ind][key].push({"id":"","boq":"",
                "brandName": "", "quantity": 0,"sku":"","type":"","is_delete":false
              });
      
            } 
  }

  removeAll(ind: number, key: keyof ProductOptions) {
    this.isValueChangedFlag = true;
    
    if (!this.deletedItemList[0]) {
      this.deletedItemList[0] = {} as ProductOptions;
    }

    if (!Array.isArray(this.deletedItemList[0][key])) {
      this.deletedItemList[0][key] = []; // Initialize as an empty array if not already defined
    }
    
    let data:any = this.productOption[ind][key];
    data.forEach((element:any) => {
      if(element.id != "")
        this.deletedItemList[0][key].push({...element,is_delete : true});
    });
    

    // this.deletedItemList[0][key].forEach((element:any) => {
    //   element.is_delete = true;
    // });
    // Clear the array if applicable
    if (Array.isArray(this.productOption[ind][key])) {
      (this.productOption[ind][key] as any[]).length = 0;
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
        this.route.paramMap.subscribe(params => {
      // console.log(params)
        this.selectedBoQID = params.get('id'); // Get 'id' from route

          if(this.selectedBoQID)
          {
            this.isNewRecord = false;
            this.getByIDBoQ();
          }
          
        });
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
        this.productOption[this.selectedProductOptionIndex].inverterDetails[index].listOfInverterRatedACPower = [];

        Swal.fire({
          icon: 'error',
          title: "Error",
          html: error.error.message,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
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
          setTimeout(()=>
          {
            this.isValueChangedFlag = false;
            this.isLoader = false;
            // this.productOption[this.selectedProductOptionIndex].totalCost = result.total_rate;
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
            this.cdr.detectChanges();
          },200);
      },
      (error: any) => {
        this.isLoader = false;
        console.error(error);
    });
  }
  
  isProductValid(): boolean {
    return this.product && Object.keys(this.product).length > 0;
  }

  saveBoQ()
  {
    const updatedProduct = { ...this.product };

    // Iterate through deletedItemList[0] and merge with product data
    for (const key in this.deletedItemList[0]) {
        if (updatedProduct.hasOwnProperty(key)) {
            // If data exists in both, merge it. If not, just add new data.
            updatedProduct[key] = [
                ...(updatedProduct[key] || []),
                ...(this.deletedItemList[0][key] || [])
            ];
        } else {
            // If the key doesn't exist in the product, add it directly
            updatedProduct[key] = this.deletedItemList[0][key];
        }
    }

    // console.log(updatedProduct)
    // return;
    Swal.fire({
      icon:"warning",
      title: "Confirmation",
      html:"Are you sure you want to update this item?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.product.BoQHistory = this.chatResponses;
        let ctxt:any = localStorage.getItem("context");
        updatedProduct.BoQHistory = this.chatResponses;
        updatedProduct.context = ctxt ? JSON.stringify(JSON.parse(atob(ctxt))) : JSON.stringify([]),
        this.isLoader = true;
         let data ={
          boq_details : [updatedProduct]
        }
        this.boqBuilderService.updateBoQ(this.product.id,data).subscribe(
          async (result: any) => {   
            Swal.fire({
              title: "Success",
              icon:"success",
              html:"BoQ Updated Successfully!",
              showCancelButton: false,
              confirmButtonText: "OK",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.modalService.dismissAll();
                this.router.navigate(['/pages/boq/listing']);
              }
            })
            this.isLoader = false;
          },
          (error: any) => {
            this.isLoader = false;
            console.error(error);
        });
      }
    })
    
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

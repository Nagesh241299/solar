import { Injectable } from '@angular/core';
import { ShopDataState } from 'src/app/components/pages/e-commerce/shop/shop.component';
interface ShopDataState1 {
  id:string,
  ribbon:string,
  photo: string,
  offerprice:string,
  price: string,
  item:string,
  Quantity: number,
}
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }

allData =[{
  id: "1",
  name: "Perfume",
  offerprice: "$16,599",
  photo: "./assets/images/pngs/9.jpg",
  price: "$19,799",
  Quantity: 1
}];

  gettingData(data: ShopDataState1){
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array.');
    }
    this.allData.push(...data);
    return data;
  }

  retunData(){
    return this.allData;
  }

  addingQuantity(){
    this.allData[0].Quantity++;
  }

  decreaseQuantity(){
    if(this.allData[0].Quantity > 0){
      this.allData[0].Quantity--;
    }
  }

  delectItem(id:string){
    const data = this.allData.filter(x =>{
      return x.id != id;
    });
    this.allData = data;
  }

  getPosta(){
    const DATA: ShopDataState[] = [ 
      {
      id:"1",
      ribbon:"new",
      photo: './assets/images/pngs/9.png',
      
      item:"Perfume",
      offerprice: '$16,599',
      price: '$19,799',
      Quantity: 1,
    }, {
      id:"2",
      ribbon:"25%",
      photo: './assets/images/pngs/1.png',
     
      item:"Camera",
      offerprice: '$529',
      price: '$799',
      Quantity: 1,
    },
     {
      id:"3",
      ribbon:"",
      photo: './assets/images/pngs/7.png',
     
      item:"Smart Watch",
      offerprice: '$25239',
      price: '$34399',
      Quantity: 1,
    },
     {
      id:"4",
      ribbon:"",
      photo: './assets/images/pngs/2.png',
     
      item:"Flower Pot",
      offerprice: '$345',
      price: '$499',
      Quantity: 1,
    }, 
    {
      id:"5",
      ribbon:"",
      photo: './assets/images/pngs/4.png',
    
      item:"Womens Bag",
      offerprice: '277',
      price: '456',
      Quantity: 1,
    }, 
    {
      id:"6",
      ribbon:"",
      photo: './assets/images/pngs/8.png',
   
      item:"Stylish shoes",
      offerprice: '$567',
      price: '$877',
      Quantity: 1,
    }, 
    {
      id:"7",
      ribbon:"",
      photo: './assets/images/pngs/3.png',
    
      item:"HeadPhones",
      offerprice: '$455',
      price: '$567',
      Quantity: 1,
    },
     {
      id:"8",
      ribbon:"",
      photo: './assets/images/pngs/5.png',
    
      item:"chair",
      offerprice: '$345',
      price: '$499',
      Quantity: 1,
    }, 
  
    ];
    return DATA;
  }

}

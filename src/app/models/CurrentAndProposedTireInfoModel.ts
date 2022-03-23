import {Storage} from '@ionic/storage'
/**
 * Created by hua on 11/05/17.
 */
export class CurrentAndProposedTireInfoModel{

  constructor(public title:string, public items?: any[], public storage?:Storage){

  }

  addItem(item){
    this.items.push({title: item});
    this.save();
  }

  removeItem(item){

    for(var i = 0; i < this.items.length; i++){
      if(this.items[i] == item){
        this.items.splice(i, 1);
        this.save();
      }
    }

  }


  save() {
    this.storage.set(this.title, JSON.stringify(this.items));
  }






  // constructor(public title: string, public items: any[]){
  //
  // }
  //
  // addItem(item){
  //   this.items.push({
  //     title: item,
  //     checked: false
  //   });
  // }
  //
  // removeItem(item){
  //
  //   for(i = 0; i < this.items.length; i++) {
  //     if(this.items[i] == item){
  //       this.items.splice(i, 1);
  //     }
  //   }
  //
  // }

}

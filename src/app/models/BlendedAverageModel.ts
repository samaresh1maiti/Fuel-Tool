/**
 * Created by hua on 16/05/17.
 */
import {Storage} from '@ionic/storage'



export class BlendedAverageModel{

  constructor(public title: string, public items: any[], public storage: Storage) {

  }

  addItem(item) {
    this.items.push({title: item.title, value: item.value});
    this.save();
  }

  removeItem(item) {

    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i] == item) {
        this.items.splice(i, 1);
        this.save();
      }
    }

  }


  save() {
    this.storage.set(this.title, JSON.stringify(this.items));
  }
}

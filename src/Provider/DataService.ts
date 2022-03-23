import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';

/**
 * Created by hua on 25/09/17.
 */


@Injectable()
export class DataService {
  constructor(public http: Http) {
    console.log("Data Service Provider");
  }

  getData(path) {
    return this.http.get(path).map((res: Response) => res.json());
  }
}





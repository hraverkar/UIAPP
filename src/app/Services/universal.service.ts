import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class universalService implements OnInit {

    protected url: string = 'http://10.242.76.17/Service/Service.svc/JSON/';

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    // Rest Items Service: Read all REST Items
    getAll() {
        return this.http.get<any>(this.url+'GetDataJson/').pipe(map(data => data));
    }

    // Rest call to get data using parameter (Filters)
    getDetails(des: string, name: string, selectVal: any) {
        return this.http.get<any>(this.url + 'GetDataJson/?StudyDescription=' + des + '&Modalities=' + selectVal + '&StudyName=' + name);
    }

    // updateDetails(id:string,name:string,desc:string,moda:string,sequ:string,date:string,comm:string){
    //   //  this.http.post<any>(this.url +'/UpdateExcelJson/?StudyId='+id+'&StudyName='+name+'&StudyDescription='+desc+'&Modalities='+moda+'&Sequence='+sequ+'&StudyDate='+date+'&StudyComments='+com);
    //     }

}
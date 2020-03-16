import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class universalService implements OnInit {
    //protected url: string = 'http://10.242.76.17:8733/Design_Time_Addresses/ClassLibrary1/HelloService/JSON/';
    protected url: string = 'http://10.242.76.17/Service/Service.svc/JSON/';

    constructor(private http: HttpClient,
    ) { }

    ngOnInit() {
    }

    // Rest Items Service: Read all REST Items
    getAll() {
        return this.http.get<any>(this.url + 'GetDataJson/').pipe(map(data => data));
    }

    // Rest call to get data using parameter (Filters)
    getDetails(des: string, name: string, selectVal: any) {
        return this.http.get<any>(this.url + 'GetDataJson/?StudyDescription=' + des + '&Modalities=' + selectVal + '&StudyName=' + name);
    }

    // Rest call to Delete one record.
    removeSelectData(studyId: string) {
        this.http.post<any>(this.url+'JsonDelete/?StudyId=' + studyId, {}).subscribe(
            data => {
                console.log("POST Request is successful ", data);
            }, error => {
                console.log("Error", error);
            }
        );
    }

    // Rest call to update one record using post method.
    updateDetails(result: any) {
        this.http.post<any>(this.url+'UpdateExcelJson/?StudyId=' + result[0] +
            '&StudyName=' + result[2] + '&StudyDescription=' + result[3] + '&Modalities=' + result[4] + '&Sequence=' + result[5] + '&StudyDate=' + result[6]
            + '&StudyComments=' + result[8], {})
            .subscribe(
                data => {
                    console.log("POST Request is successful ", data);
                }, error => {
                    console.log("Error", error);
                }
            );
    }
}

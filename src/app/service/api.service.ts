import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = "localhost:8080/user"
  postApi(data: any) {
    return this.http.post<any>("http://localhost:8080/user/post/", data)
  }
  getApi() {
    return this.http.get("http://localhost:8080/user/get/");
  }

  deleteApi(id: number) {
    return this.http.delete<any>("http://localhost:8080/user/delete/" + id);
  }

  updateApi(data: any, id: number) {
    return this.http.put<any>("http://localhost:8080/user/update/" + id, data)

  }
}

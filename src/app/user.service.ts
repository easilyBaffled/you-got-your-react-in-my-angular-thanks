import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const baseUrl = "/user/";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(baseUrl).toPromise();
  }

  get(id) {
    return this.http.get(baseUrl + id).toPromise();
  }

  delete(id) {
    return this.http.delete(baseUrl + id).toPromise();
  }

  create(body) {
    return this.http.put(baseUrl, body).toPromise();
  }

  update(body) {
    return this.http.post(baseUrl, body).toPromise();
  }
}

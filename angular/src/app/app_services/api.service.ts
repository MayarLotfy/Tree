import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient , HttpHeaders  , HttpErrorResponse } from '@angular/common/http';
import { APIData  , TreeData } from './models/api.data.structure'


@Injectable()
export class APIService {
  private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  getProducts(): Observable<APIData> {
    return this.http.get<APIData>( this.apiUrl + 'node/getNodes')
    .catch(this.errorHandler);
  }

  getParents(nodeName:String): Observable<APIData> {
    return this.http.get<APIData>( this.apiUrl + 'info/getParentsInfo/' + nodeName)
    .catch(this.errorHandler);
  }

  getChildren(nodeName:String): Observable<APIData> {
    return this.http.get<APIData>( this.apiUrl + 'info/getChildrenInfo/' + nodeName)
    .catch(this.errorHandler);
  }

  deleteProduct(productdata:TreeData):Observable<APIData> {
    return this.http.delete<TreeData>( this.apiUrl + 'node/deleteNode/' + productdata._id)
    .catch(this.errorHandler);
  }

  updateProduct(nodedata:TreeData):Observable<APIData> {
    return this.http.patch<TreeData>( this.apiUrl + 'node/updateNode/' + nodedata._id , nodedata)
    .catch(this.errorHandler);
  }

  createProduct(treeData: TreeData): Observable<APIData> {
    return this.http.post<TreeData>( this.apiUrl + 'node/createNode' , treeData)
    .catch(this.errorHandler);
  }





}

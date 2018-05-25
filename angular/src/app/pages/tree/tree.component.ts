import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { APIService } from '../../app_services/api.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { APIData  , TreeData   } from '../../app_services/models/api.data.structure'

import 'style-loader!angular2-toaster/toaster.css';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'selenium-webdriver';

@Component({
  selector: 'store',
  templateUrl: './template/tree.component.html',
  styleUrls: ['./template/tree.component.scss']
})

export class StoreComponent implements OnInit {

  private node: String;

  private nodeData  = <TreeData>{};

  public listTemplateNode=JSON.parse(localStorage.getItem('gridServicecList'));

 settings = {

 

    editor: {
      // config: false
      },

   
    add: {
     addButtonContent: '<i class="nb-plus"></i>'  ,
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      type: NgbDropdown,
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  
  
    actions: {

      

       add: true,
      edit: true,
       delete: true,
    
      columnTitle: 'Actions'
    },
    columns: {

      nodeParents: 
      {
        title:'Parent Details',
        type:'html',
        valuePrepareFunction:(cell,row)=>{
          return `<a title="get parents of this node " href="info"> <i class="ion-edit"></i></a>`
        },
        
        filter:false ,
        editButtonContent :false,
        addButtonContent: false,   
        editable: false,
        addable: false,   
      },

      
      nodeChildren: 
      {
        title:'Children Details',
        type:'html',
        valuePrepareFunction:(cell,row)=>{
          return `<a title="get children of this node "href="Your api key or something/${row.name}"> <i class="ion-edit"></i></a>`
        },
        filter:false  ,
        editable: false,
        addable: false, 
             
      },
    
     
      name: {
        title: 'Name',
        type: 'string',

      },
       parentName: {
          title: 'Parent Node',
          type: 'string',
          editor: {
            type: 'list',
            config: {
              list: this.listTemplateNode


            }
          }
        },

         childName: {
          title: 'Child Node',
          type: 'string',
          editor: {
            type: 'list',
            config: {
              list: this.listTemplateNode

              
            }
          }
        }
        
      
      
    },
  };

  config: ToasterConfig;
  source: LocalDataSource = new LocalDataSource();

  constructor(private _apiService: APIService , private toasterService: ToasterService) {
    this.source.onChanged().subscribe(()=>{
      // this.fetchData();
    });

    this.source.onAdded().subscribe((treeData :TreeData)=>{
      // productData.seller = this.logindata.username;
      this._apiService.createProduct(treeData).subscribe((apiresponse: APIData)=>{
        this.showToast( 'default' , 'Message', apiresponse.msg.toString());
        this.reloadData();
      });
    });

    this.source.onUpdated().subscribe((productData :TreeData)=>{
      this._apiService.updateProduct(productData).subscribe((apiresponse: APIData)=>{
        this.showToast( 'default' , 'Message', apiresponse.msg.toString());
        this.reloadData();
      });
    });

    this.source.onRemoved().subscribe((productData :TreeData)=>{
      this._apiService.deleteProduct(productData).subscribe((apiresponse: APIData)=>{
        this.showToast( 'default' , 'Message', apiresponse.msg.toString());
        this.reloadData();
      });
    });
  }


 
  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  private showToast(type: string, title: string, body: string) {
    this.showToastConfig( type , title , body , 'toast-top-right' , 'fade' , 5000 , 5 , true , true , false , true );
  }

  private showToastConfig(type: string , title: string , body: string , position: string , animationType: string , timeout: number , toastsLimit: number , 
    isNewestOnTop: boolean , isHideOnClick: boolean , isDuplicatesPrevented: boolean , isCloseButton: boolean ){
      this.config = new ToasterConfig({positionClass: position , timeout: timeout , newestOnTop: isNewestOnTop ,
        tapToDismiss: isHideOnClick , preventDuplicates: isDuplicatesPrevented , animation: animationType , limit: toastsLimit,
      });
      var toast: Toast = { type: type , title: title , body: body , timeout: timeout , showCloseButton: isCloseButton , 
        bodyOutputType: BodyOutputType.TrustedHtml };
      this.toasterService.popAsync(toast);
  }
  ngOnInit() {

    this.reloadData();



    localStorage.clear();
    this.listTemplateNode  = [];
    console.log(localStorage.getItem('gridServicecList'));

    this._apiService.getProducts().subscribe((apiresponse: APIData)=> {
      
      
      if(apiresponse != undefined || apiresponse != null)
      {
        apiresponse.data.forEach(obj => {
          this.listTemplateNode.push({value:obj._id,title:obj.name})     
      });
      this.listTemplateNode.push({value:0,title:'none'})                
      }
      localStorage.setItem('gridServicecList', JSON.stringify(this.listTemplateNode));
   
    console.log(localStorage.getItem('gridServicecList'));
      console.log(this.listTemplateNode);

  });  


}
  

  private reloadData(): void {

    

    this._apiService.getProducts().subscribe((apiresponse: APIData)=>{
     

        console.log( apiresponse);
        
      this.source.load(apiresponse.data);

      localStorage.clear();
      console.log(localStorage.getItem('gridServicecList'));
    });




  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  
  OnRowSelect(event): void {
    this.nodeData = event.data;
    if(this.node == this.nodeData._id){
      this.node="-1";
    } else if(this.node != this.nodeData._id || this.node=="-1") {
      this.node=this.nodeData._id;
    }

    console.log(this.node);
 }

 parentClick(event):void {
   if(this.node != "-1") {

     console.log(this.nodeData.name);
      this._apiService.getParents(this.nodeData.name).subscribe((apiresponse: APIData)=>{
        console.log(apiresponse);
        this.showToast ('default' , 'Message' , apiresponse.msg.toString() + '\n' + 'Parents: '+ apiresponse.data );
       
        });
     
   } else 
       this.showToast( 'default' , 'Message', "Nothing is selected");
 }

 childrenClick(event):void {
  if(this.node != "-1") {

    console.log(this.nodeData.name);
     this._apiService.getChildren(this.nodeData.name).subscribe((apiresponse: APIData)=>{
       console.log(apiresponse);
        this.showToast ('default' , 'Message' , apiresponse.msg.toString() + '\n ' + 'Number of children: '
        + apiresponse.data.length + '\n' + 'Children: '+ apiresponse.data );
      
       });
    
  } else 
      this.showToast( 'default' , 'Message', "Nothing is selected");
}



}

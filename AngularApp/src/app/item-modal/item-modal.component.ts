import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../model/item.model';
import { ItemDataService } from '../services/item-data.service';
import { ItemModelService } from '../services/item-model.service';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  providers: [NgbModal,
    ItemModelService,
    ItemDataService,
  ],
})
export class ItemModalComponent implements OnInit {

  constructor(  public modalService: NgbModal,private router: Router,
    public modelSvc: ItemModelService,
    public dataSvc: ItemDataService,) 
  {

  } 

  public unitList:any[]=[];
  file: File = null;
  @Input() public ModalData:any;

  ngOnInit(): void 
  {
  
     if(this.ModalData)
     {
      this.getItemById(this.ModalData);
     }
     else{
      this.modelSvc.item=new Item();
     }

    this.getUnit(); 
   
  }
  getItemById(id:any)
  {

    this.dataSvc.getItemById(id).subscribe({
      next: (res: any) => 
      {
        this.modelSvc.item=res.body;
        this.modelSvc.item.DataSourceDate=new Date(res.body.DataSourceDate);
      },
      error: (res: any) => 
      {
      alert(res);
      },
      complete: () => {},
    });

  }

  getUnit()
  {
   try{

      this.dataSvc.getConversionUnit().subscribe({
      next: (res: any) => 
      {

        this.unitList =res;
      },
      error: (res: any) => 
      {
       alert(res);
      },
      complete: () => {},
    });

   } catch (e) {
     alert('Something error!');
    }
  }
  onChange(event) 
  {
    this.file = event.target.files[0];
    console.log( this.file);
  }

  saveItem()
  {
  
   try
   {
      this.modelSvc.item.ConversionUnitID=this.modelSvc.item.ConversionUnitID==null?null:this.modelSvc.item.ConversionUnitID*1;
      this.modelSvc.item.CategoryId=this.modelSvc.item.CategoryId==null?null:this.modelSvc.item.CategoryId*1;
      this.modelSvc.item.SubCategoryId=this.modelSvc.item.SubCategoryId==null?null:this.modelSvc.item.SubCategoryId*1;
      this.modelSvc.item.SubSubCategoryId=this.modelSvc.item.SubSubCategoryId==null?null:this.modelSvc.item.SubSubCategoryId*1;

      const formData = new FormData(); 

      const modelData = JSON.stringify(this.modelSvc.item);
      console.log(modelData);
      formData.append('data', modelData);
      formData.append("file",this.file, this.file.name);
    
      this.dataSvc.uploadImage(formData).subscribe({
      next: (res: any) => 
      {
       alert('Successfully Saved!');
       this.closeModal();
      },
      error: (res: any) => 
      {
        alert(res);
      },
      complete: () => {},
    });

    } catch (e) 
    {
     alert(e);
    }

  }
  getSubCategoryIDCategoryId(id:any)
  {
     this.modelSvc.subCategoryList=this.modelSvc.subCategoryList.filter(x=>x.categoryId==id);
     console.log(id);
  }

  getSububCategoryIDSubCategoryId(id:any)
  {
     this.modelSvc.subSubcategoryList=this.modelSvc.subSubcategoryList.filter(x=>x.subcategoryId==id);
     console.log(id);
  }

  closeModal()
  {
    this.modalService.dismissAll();

  }

}

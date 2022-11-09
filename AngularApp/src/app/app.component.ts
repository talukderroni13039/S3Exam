import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { ItemDataService } from './services/item-data.service';
import { ItemModelService } from './services/item-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    ItemModelService,
    ItemDataService,
  ],
})
export class AppComponent 
{
  title = 'AngularApp';

  constructor( public modalSvc: NgbModal,
    public modelSvc: ItemModelService,
    public dataSvc: ItemDataService,
    )
  {

  }
  public itemList:any[]=[];
  ngOnInit(): void 
  {
   this.getItemList();
  }

  getItemList()
  {
   try{

      this.dataSvc.getItemList().subscribe({
      next: (res: any) => 
      {
       this.itemList =res;
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

  OpenItemModal(id:any)
  {
    let data:any={};
    if(id) // get value for edit
    {
        this.dataSvc.getItemById(id).subscribe({
          next: (res: any) => 
          {
           data =JSON.parse(res.body);
          },
          error: (res: any) => 
          {
          alert(res);
          },
          complete: () => {},
        });
    }
    else
    {
      data=null;
    }
    const modalRef = this.modalSvc.open(ItemModalComponent, { backdrop: 'static' }); 
    modalRef.componentInstance.ModalData = id;

    modalRef.result.then((result) => 
    {
      this.getItemList();
    },(reason) => 
    {
      this.getItemList();
    });

  }
}

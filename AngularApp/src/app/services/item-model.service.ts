import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from '../model/item.model';


@Injectable()
export class ItemModelService 
{
  constructor() 
  {

  }
  public item:Item=new Item();
  
  public categoryList:any[]=[  
    {Id:1,Name:'cat1', },
    {Id:2,Name:'cat2', },
    {Id:3,Name:'cat3', },
    {Id:4,Name:'cat4', },

    ];



  public subCategoryList:any[]=[
    {Id:1,Name:'Subcat1',categoryId:1 },
    {Id:2,Name:'Subcat2', categoryId:1},
    {Id:3,Name:'Subcat3', categoryId:2},
    {Id:4,Name:'Subcat4', categoryId:2},

  ];
  public subSubcategoryList:any[]=[
    {Id:1,Name:'Subcat1',subcategoryId:1 },
    {Id:2,Name:'Subcat2', subcategoryId:1},
    {Id:3,Name:'Subcat3', subcategoryId:2},
    {Id:4,Name:'Subcat4', subcategoryId:2},
  ];


}

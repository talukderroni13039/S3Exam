
using APIApp.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace APIApp.DAL
{
    public class ItemRepository: IItemRepository
    {
        private DemoDBContext db = new DemoDBContext();
        public async Task<EmissionItem> CreateItem(EmissionItem emissionItem)
        {
            try
            {
                if (emissionItem.Id == 0)
                {
                    await _SaveItem(emissionItem);
                }
                else
                {
                    await _UpdateItem(emissionItem);
                }
              
                return emissionItem;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private async Task _SaveItem(EmissionItem emissionItem)
        {
            db.EmissionItem.Add(emissionItem);
            db.SaveChanges();
        }
        private async Task _UpdateItem(EmissionItem emissionItem)
        {
            db.Entry(emissionItem).State = EntityState.Modified;
            db.SaveChanges();
        }

        private async Task _UploadImage(EmissionItem emissionItem)
        {
            string file = "";
            string webRootPath = "";
            string uploadsDir = Path.Combine(webRootPath, "uploads");

            // wwwroot/uploads/
            if (!Directory.Exists(uploadsDir))
                Directory.CreateDirectory(uploadsDir);

         
            string fileName = "";
            string fullPath = Path.Combine(uploadsDir, fileName);

            var buffer = 1024 * 1024;
            using var stream = new FileStream(fullPath, FileMode.Create, FileAccess.Write, FileShare.None, buffer, useAsync: false);
            await stream.FlushAsync();

            string location = $"images/{fileName}";
            var result = new
            {
                message = "Upload successful",
                url = location
            };
        }


        public EmissionItem GetItemById(int Id)
        {
            try
            {
               var data=  db.EmissionItem.Where(x => x.Id == Id).FirstOrDefault();
               return  data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IQueryable<object> GetUnit()
        {
            try
            {
                var data = db.ConversionUnit.AsNoTracking().AsQueryable();
                return data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public IQueryable<object> GetItemList()
        {
            try
            {
                var data = db.EmissionItem.Select(x => new
                {
                    Id=x.Id,
                    ItemName=x.ItemName,
                    CarbonCoefficient=x.CarbonCoefficient,
                    ConversionUnit=x.ConversionUnit.UnitName,
                }).AsNoTracking().AsQueryable();


                return data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        


    }
}

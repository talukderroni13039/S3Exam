using APIApp.Domain;
using APIApp.DTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace APIApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private IItemRepository _iItemRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ItemController(IItemRepository iItemRepository, IWebHostEnvironment hostingEnvironment)
        {
            _iItemRepository = iItemRepository;
            _hostingEnvironment = hostingEnvironment;
        }

        [Route("GetItemList")]
        [HttpGet]
        public string GetItemList()
        {
            var result = _iItemRepository.GetItemList();

            return JsonConvert.SerializeObject(result);
        }

      

        [Route("GetItemById")]
        [HttpGet]
        public string GetItemById(int Id)
        {
            var result = _iItemRepository.GetItemById(Id);

            return JsonConvert.SerializeObject(result);
        }

        [Route("GetConversionUnit")]
        [HttpGet]
        public string GetConversionUnit()
        {
            var result= _iItemRepository.GetUnit();

            return JsonConvert.SerializeObject(result);
        }


        [HttpPost]
        [Route("SaveItem")]
        public async Task<EmissionItem> SaveItem([FromBody] EmissionItem emissionitem)
        {
            try
            {
                return await _iItemRepository.CreateItem(emissionitem);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("UploadImageWithData")]
        public string UploadImageWithData([FromForm] IFormFile file)
        {
            try
            {
                //data is the key that is being passed from client side
                var modelData = JsonConvert.DeserializeObject<EmissionItemDTO>(Request.Form["data"]);
                // getting file original name
                string FileName = file.FileName;
                // combining GUID to create unique name before saving in wwwroot
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + FileName;

                // getting full path inside wwwroot/images
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Upload/", uniqueFileName);

                // copying file
                file.CopyTo(new FileStream(imagePath, FileMode.Create));

                return "File Uploaded Successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }


}


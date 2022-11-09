using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIApp.DTO
{
    public class EmissionItemDTO
    {
        public IFormFile file { get; set; }
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string CarbonCoefficient { get; set; }
        public int? ConversionUnitID { get; set; }
        public string Remarks { get; set; }
        public string DQI { get; set; }
        public string DataSource { get; set; }
        public DateTime? DataSourceDate { get; set; }
        public bool? IsActive { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public int? SubSubCategoryId { get; set; }
    }
}

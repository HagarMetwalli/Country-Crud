using System;
using System.ComponentModel.DataAnnotations;

namespace Core
{
    public class Country
    {
        public Country()
        {
            CreatedDate = DateTime.Now;
            Active = true;
        }
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "CountryName is required")]
        [StringLength(maximumLength: 20, MinimumLength = 3)]
        public string CountryName { get; set; }
        [Required(ErrorMessage = "languageName is required")]
        [StringLength(maximumLength: 20, MinimumLength = 3)]
        public string languageName { get; set; }

        public DateTime? CreatedDate { get; set; }
        public bool? Active { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace ReactAspCRUD.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100)] 
        public string Password { get; set; }

        public int IsActive { get; set; } = 1;

        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}

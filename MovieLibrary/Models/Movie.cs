using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MovieLibrary.Models
{
	public class Movie
	{
		[Key]
		public int MovieId { get; set; }
		public string Title { get; set; }
		public string Genre { get; set; }
		public string Director { get; set; }
	}
}
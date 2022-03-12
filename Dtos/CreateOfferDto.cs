using System;
using System.ComponentModel.DataAnnotations;

namespace JobOffers.Dtos {
    public record CreateOfferDto {

        public Uri LogoLink { get; init; }
        [Required]
        public string Title { get; init; }
        [Required]
        public string CompanyName { get; init; }

    }
}
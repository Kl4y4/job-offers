using System;
using System.ComponentModel.DataAnnotations;

namespace JobOffers.Dtos {
    public record UpdateOfferDto {

        [Required]
        public Uri OfferLink { get; init; }
        public Uri LogoLink { get; init; }
        [Required]
        public string Title { get; init; }
        [Required]
        public string CompanyName { get; init; }
        public string CompanySize { get; init; }
        public string PublishedDate { get; init; }
        public string Etat { get; init; }
        public string Location { get; init; }
        public string Salary { get; init; }
        public string Remote { get; init; }
        public string Contract { get; init; }
        public string Tags { get; init; }
        public string PostedSite { get; init; }

    }
}
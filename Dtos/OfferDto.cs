using System;

namespace JobOffers.Dtos {
    public record OfferDto {

        public Guid Id { get; init; }
        public Uri LogoLink { get; init; }
        public string Title { get; init; }
        public string CompanyName { get; init; }

    }
}

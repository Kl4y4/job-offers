using System;

namespace JobOffers.Entities {
    public record Offer {

        public Guid Id { get; init; }
        public Uri LogoLink { get; init; }
        public string Title { get; init; }
        public string CompanyName { get; init; }

    }
}

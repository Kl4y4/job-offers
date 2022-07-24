using System;

namespace JobOffers.Entities {
    public record Offer {

        public Guid Id { get; init; }
        public Uri OfferLink { get; init; }
        public Uri LogoLink { get; init; }
        public string Title { get; init; }
        public string CompanyName { get; init; }
        public string CompanySize { get; init; }
        public DateTime AddedDate { get; init; }
        public DateTime PublishedDate { get; init; }
        public string WorkSchedule { get; init; }
        public string Location { get; init; }
        public string Salary { get; init; }
        public string Remote { get; init; }
        public string Contract { get; init; }
        public string Tags { get; init; }
        public string PostedSite { get; init; }
        public string Description { get; init; }

    }
}

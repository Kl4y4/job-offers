using System;

namespace JobOffers.Entities {
    public record Offer {

        public Guid Id { get; init; }
        public Uri LogoLink { get; init; }
        public string Title { get; init; }
        public string CompanyName { get; init; }
        // public bool FullTime { get; init; }
        // public string Location { get; init; }
        // public DateTimeOffset PublishedOffset { get; init; }
        // public DateTimeOffset AddedOffset { get; init; }
        // public int Salary { get; init; }
        // public bool IsRemote { get; init; }

    }
}

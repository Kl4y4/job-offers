using JobOffers.Dtos;
using JobOffers.Entities;

namespace JobOffers {

    public static class Extensions {

        public static OfferDto AsDto(this Offer offer) {
            return new OfferDto {
                Id = offer.Id,
                LogoLink = offer.LogoLink,
                Title = offer.Title,
                CompanyName = offer.CompanyName
            };
        }

    }

}


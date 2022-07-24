using JobOffers.Dtos;
using JobOffers.Entities;

namespace JobOffers {

    public static class Extensions {

        public static OfferDto AsDto(this Offer offer) {

            string addedDateString = offer.AddedDate.ToString("g");
            string publishedDateString = offer.PublishedDate.ToString("g");

            return new OfferDto {
                Id = offer.Id,
                OfferLink = offer.OfferLink,
                LogoLink = offer.LogoLink,
                Title = offer.Title,
                CompanyName = offer.CompanyName,
                CompanySize = offer.CompanySize,
                AddedDate = addedDateString,
                PublishedDate = publishedDateString,
                WorkSchedule = offer.WorkSchedule,
                Location = offer.Location,
                Salary = offer.Salary,
                Remote = offer.Remote,
                Contract = offer.Contract,
                Tags = offer.Tags,
                PostedSite = offer.PostedSite,
                Description = offer.Description
            };

        }

    }

}


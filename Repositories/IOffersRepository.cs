using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobOffers.Dtos;
using JobOffers.Entities;

namespace JobOffers.Repositories {

    public interface IOffersRepository {

        Task<Offer> GetDuplicateAsync(OfferDto offerDto); // test
        Task<IEnumerable<Offer>> GetOffersAsync();
        Task<Offer> GetOfferAsync(Guid id);
        Task<IEnumerable<Offer>> GetOffersPagedAsync(int pageNum, int offerCount);
        Task CreateOfferAsync(Offer offer);
        Task UpdateOfferAsync(Offer offer);
        Task DeleteOfferAsync(Guid id);
        Task ClearDatabase();
        bool CheckIfAlreadyExists(OfferDto offer);

    }

}
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobOffers.Entities;

namespace JobOffers.Repositories {

    public interface IOffersRepository {

        Task<IEnumerable<Offer>> GetOffersAsync();
        Task<Offer> GetOfferAsync(Guid id);
        Task CreateOfferAsync(Offer offer);
        Task UpdateOfferAsync(Offer offer);
        Task DeleteOfferAsync(Guid id);

    }

}
using System.Net;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using JobOffers.Dtos;
using JobOffers.Entities;
using JobOffers.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace JobOffers.Controllers {

    [ApiController]
    [Route("offers")]
    public class OffersController : ControllerBase {

        private readonly IOffersRepository repository;

        public OffersController(IOffersRepository _repository) { this.repository = _repository; }


        [HttpGet]
        public async Task<IEnumerable<OfferDto>> GetOffers() {
            var offers = (await repository.GetOffersAsync()).Select(offer => offer.AsDto());
            return offers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OfferDto>> GetOfferAsync(Guid id) {

            var offer = await repository.GetOfferAsync(id);
            if (offer is null) return NotFound();

            return offer.AsDto();

        }

        [HttpPost]
        public async Task<ActionResult<OfferDto>> CreateItemAsync(CreateOfferDto offerDto) {

            Offer offer = new() {
                Id = new Guid(),
                LogoLink = offerDto.LogoLink,
                Title = offerDto.Title,
                CompanyName = offerDto.CompanyName
            };

            await repository.CreateOfferAsync(offer);

            return CreatedAtAction(nameof(GetOfferAsync), new { id = offer.Id }, offer.AsDto());

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOfferAsync(Guid id, UpdateOfferDto offerDto) {

            var existingOffer = await repository.GetOfferAsync(id);

            if (existingOffer is null) return NotFound();

            Offer updatedOffer = existingOffer with {
                LogoLink = offerDto.LogoLink,
                Title = offerDto.Title,
                CompanyName = offerDto.CompanyName
            };

            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOfferAsync(Guid id) {

            var existingOffer = await repository.GetOfferAsync(id);

            if (existingOffer is null) return NotFound();

            await repository.DeleteOfferAsync(id);

            return NoContent();

        }

    }

}
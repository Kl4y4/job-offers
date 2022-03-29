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

        // HttpGet - paginacja yoyoyo
        [HttpGet("paged")]
        public async Task<IEnumerable<OfferDto>> GetOffersPaginated(int pageNum, int offerCount) {
            var offers = (await repository.GetOffersPagedAsync(pageNum, offerCount)).Select(offer => offer.AsDto());
            return offers;
        }

        // t - test endpoint
        // get, aby znalezc duplikatowe oferty; funkcja testowa
        [HttpGet("t")]
        public async Task<ActionResult<OfferDto>> GetDuplicateOfferAsync(OfferDto offerDto) {
            var duplicate = await repository.GetDuplicateAsync(offerDto);
            return (duplicate is null) ? NotFound() : duplicate.AsDto();
        }

        [HttpPost]
        public async Task<ActionResult<OfferDto>> CreateItemAsync(CreateOfferDto offerDto) {

            Offer offer = new() {
                Id = new Guid(),
                LogoLink = offerDto.LogoLink,
                Title = offerDto.Title,
                CompanyName = offerDto.CompanyName
            };

            var duplicate = await repository.GetDuplicateAsync(offer.AsDto());

            if (duplicate is null) {
                await repository.CreateOfferAsync(offer);
                return CreatedAtAction(nameof(GetOfferAsync), new { id = offer.Id }, offer.AsDto());
            } else {
                return UnprocessableEntity();
            }

        }

        [HttpPost("m")]
        public async Task<ActionResult> CreateItemsAsync(CreateOfferDto[] offerDtos) {    

            List<Offer> createdOffers = new List<Offer>();
            bool isSuccess = false;

            for (int i = 0; i < offerDtos.Length; i++) {
                Offer offer = new() {
                    Id = new Guid(),
                    LogoLink = offerDtos[i].LogoLink,
                    Title = offerDtos[i].Title,
                    CompanyName = offerDtos[i].CompanyName
                };

                var duplicate = await repository.GetDuplicateAsync(offer.AsDto());

                if (duplicate is null) {
                    await repository.CreateOfferAsync(offer);
                    isSuccess = true;
                    createdOffers.Add(offer);
                }
            }

            return (isSuccess) 
            ? Ok()
            : UnprocessableEntity();

        }

        // [HttpPost]
        // public async Task<ActionResult<OfferDto>> CreateItemAsync(CreateOfferDto offerDto) {

        //     Offer offer = new() {
        //         Id = new Guid(),
        //         LogoLink = offerDto.LogoLink,
        //         Title = offerDto.Title,
        //         CompanyName = offerDto.CompanyName
        //     };

        //     if (repository.CheckIfAlreadyExists(offer.AsDto()) == false) {
        //         await repository.CreateOfferAsync(offer);
        //         return CreatedAtAction(nameof(GetOfferAsync), new { id = offer.Id }, offer.AsDto());
        //     } else {
        //         return NoContent();
        //     }

        // }

        // [HttpPost("m")]
        // public async IAsyncEnumerable<ActionResult> CreateItemsAsync(OfferDto[] offerDtos) {    

        //     IAsyncEnumerable<ActionResult>[] resultArr = new IAsyncEnumerable<ActionResult>[offerDtos.Length];

        //     for (int i = 0; i < offerDtos.Length; i++) {
        //         Offer newOffer = new() {
        //             Id = new Guid(),
        //             LogoLink = offerDtos[i].LogoLink,
        //             Title = offerDtos[i].CompanyName,
        //             CompanyName = offerDtos[i].CompanyName
        //         };

        //         if (!repository.CheckIfAlreadyExists(newOffer.AsDto())) {
        //             await repository.CreateOfferAsync(newOffer);
        //             resultArr[i] = (IAsyncEnumerable<ActionResult>)CreatedAtAction(nameof(GetOfferAsync), new { id = newOffer.Id }, newOffer.AsDto());
        //         } else { 
        //             resultArr[i] = (IAsyncEnumerable<ActionResult>)NoContent();
        //         }
        //     }

        //     yield return resultArr;

        // }


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
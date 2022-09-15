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
using Microsoft.AspNetCore.JsonPatch;

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

        // HttpGet - paginacja
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
            
            DateTime publishDateConv;
            if (offerDto.PublishedDate != null) {
                DateTime.TryParse(offerDto.PublishedDate, out publishDateConv);
            } else {
                publishDateConv = DateTime.UtcNow;
            }
            
            Offer offer = new() {
                Id = new Guid(),
                offerLink = offerDto.offerLink,
                LogoLink = offerDto.LogoLink,
                Title = offerDto.Title,
                CompanyName = offerDto.CompanyName,
                AddedDate = DateTime.UtcNow,
                PublishedDate = publishDateConv,
                WorkSchedule = offerDto.WorkSchedule,
                Location = offerDto.Location,
                Salary = offerDto.Salary,
                Remote = offerDto.Remote,
                Contract = offerDto.Contract,
                Tags = offerDto.Tags,
                PostedSite = offerDto.PostedSite,
                Description = offerDto.Description
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

            bool isSuccess = false;

            DateTime publishDateConv;

            for (int i = 0; i < offerDtos.Length; i++) {

                if (offerDtos[i].PublishedDate != null) DateTime.TryParse(offerDtos[i].PublishedDate, out publishDateConv);
                else publishDateConv = DateTime.UtcNow;

                Offer offer = new() {
                    Id = new Guid(),
                    offerLink = offerDtos[i].offerLink,
                    LogoLink = offerDtos[i].LogoLink,
                    Title = offerDtos[i].Title,
                    CompanyName = offerDtos[i].CompanyName,
                    AddedDate = DateTime.UtcNow,
                    PublishedDate = publishDateConv,
                    WorkSchedule = offerDtos[i].WorkSchedule,
                    Location = offerDtos[i].Location,
                    Salary = offerDtos[i].Salary,
                    Remote = offerDtos[i].Remote,
                    Contract = offerDtos[i].Contract,
                    Tags = offerDtos[i].Tags,
                    PostedSite = offerDtos[i].PostedSite,
                    Description = offerDtos[i].Description
                };

                var duplicate = await repository.GetDuplicateAsync(offer.AsDto());

                if (duplicate is null) {
                    await repository.CreateOfferAsync(offer);
                    isSuccess = true;
                }
            }

            return (isSuccess) ? Ok() : UnprocessableEntity();

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOfferAsync(Guid id, UpdateOfferDto offerDto) {

            var existingOffer = await repository.GetOfferAsync(id);

            if (existingOffer is null) return NotFound();

            DateTime publishDateConv;
            DateTime.TryParse(offerDto.PublishedDate, out publishDateConv);

            Offer offer = new() {
                Id = new Guid(),
                LogoLink = offerDto.LogoLink,
                Title = offerDto.Title,
                CompanyName = offerDto.CompanyName,
                AddedDate = DateTime.UtcNow,
                PublishedDate = publishDateConv,
                WorkSchedule = offerDto.WorkSchedule,
                Location = offerDto.Location,
                Salary = offerDto.Salary,
                Remote = offerDto.Remote,
                Contract = offerDto.Contract,
                Tags = offerDto.Tags,
                PostedSite = offerDto.PostedSite,
                Description = offerDto.Description
            };

            return NoContent();

        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> PatchOfferAsync(Guid id, JsonPatchDocument patchDocument) {

            var offer = await repository.GetOfferAsync(id);

            if (offer is null) return NotFound();

            patchDocument.ApplyTo(offer);
            await repository.UpdateOfferAsync(offer);

            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOfferAsync(Guid id) {

            var existingOffer = await repository.GetOfferAsync(id);

            if (existingOffer is null) return NotFound();

            await repository.DeleteOfferAsync(id);

            return NoContent();

        }

        [HttpDelete]
        public async Task<ActionResult> DeleteOffersAsync() {
            await repository.DeleteAll();
            return NoContent();
        }

    }

}
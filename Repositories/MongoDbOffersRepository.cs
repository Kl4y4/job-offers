using System.Collections.Immutable;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobOffers.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using JobOffers.Dtos;

namespace JobOffers.Repositories {

    public class MongoDbOffersRepository : IOffersRepository {

        private const string databaseName = "joboffers";
        private const string collectionName = "offers";

        private readonly IMongoDatabase database;
        private readonly IMongoCollection<Offer> offersCollection;
        private readonly FilterDefinitionBuilder<Offer> filterBuilder = Builders<Offer>.Filter;

        public MongoDbOffersRepository(IMongoClient mongoClient) {

            database = mongoClient.GetDatabase(databaseName);
            offersCollection = database.GetCollection<Offer>(collectionName);

        }


        public async Task<IEnumerable<Offer>> GetOffersAsync() {
            return await offersCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<Offer> GetOfferAsync(Guid id) {
            var filter = filterBuilder.Eq(offer => offer.Id, id);
            return await offersCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<Offer> GetDuplicateAsync(OfferDto offerDto) {
            var filter = filterBuilder.And(filterBuilder.Eq("Title", offerDto.Title), filterBuilder.Eq("CompanyName", offerDto.CompanyName));
            return await offersCollection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Offer>> GetOffersPagedAsync(int pageNum, int offerCount) {
            return await offersCollection.Find(new BsonDocument()).Skip(pageNum > 0 ? ( (pageNum - 1) * offerCount ) : 0 ).Limit(offerCount).ToListAsync();
        }

        public async Task CreateOfferAsync(Offer offer) {
            await offersCollection.InsertOneAsync(offer);
        }

        public async Task UpdateOfferAsync(Offer offer) {
            var filter = filterBuilder.Eq(existingOffer => existingOffer.Id, offer.Id);
            await offersCollection.ReplaceOneAsync(filter, offer);
        }

        public async Task DeleteOfferAsync(Guid id) {
            var filter = filterBuilder.Eq(offer => offer.Id, id);
            await offersCollection.DeleteOneAsync(filter);
        }

        public async Task ClearDatabase() {
            var filter = filterBuilder.Empty;
            await offersCollection.DeleteManyAsync(filter);
        }

        // false - nie powtarza sie
        // true - powtarza
        public bool CheckIfAlreadyExists(OfferDto offer) {
            var filter = filterBuilder.And(filterBuilder.Eq("Title", offer.Title), filterBuilder.Eq("CompanyName", offer.CompanyName));
            var duplicateOffer = offersCollection.Find(filter).SingleOrDefaultAsync();
            return (duplicateOffer is null) ? true : false;
        }

    }

}
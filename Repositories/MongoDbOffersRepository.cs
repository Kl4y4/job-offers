using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobOffers.Entities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace JobOffers.Repositories {

    public class MongoDbOffersRepository : IOffersRepository {

        private const string databaseName = "joboffers";
        private const string collectionName = "offers";

        private readonly IMongoCollection<Offer> offersCollection;
        private readonly FilterDefinitionBuilder<Offer> filterBuilder = Builders<Offer>.Filter;

        public MongoDbOffersRepository(IMongoClient mongoClient) {

            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            offersCollection = database.GetCollection<Offer>(collectionName);

        }


        public async Task<IEnumerable<Offer>> GetOffersAsync() {
            return await offersCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<Offer> GetOfferAsync(Guid id) {
            var filter = filterBuilder.Eq(offer => offer.Id, id);
            return await offersCollection.Find(filter).SingleOrDefaultAsync();
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

    }

}
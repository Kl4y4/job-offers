using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobOffers.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace JobOffers.Pages {
    
    public class IndexModel : PageModel {

        private readonly ILogger<IndexModel> _logger;

        private const string databaseName = "joboffers";
        private const string collectionName = "offers";

        private readonly FilterDefinitionBuilder<Offer> filterBuilder = Builders<Offer>.Filter;
        private readonly IMongoCollection<Offer> offersCollection;
        private readonly List<Offer> offersList;

        public IndexModel(ILogger<IndexModel> logger, IMongoClient mongoClient)
        {
            _logger = logger;
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            offersCollection = database.GetCollection<Offer>(collectionName);

            offersList = GetOffers().ToList();
            
        }

        public IEnumerable<Offer> GetOffers() {
            return offersCollection.Find(new BsonDocument()).ToList();
        }

        public List<Offer> GetList() {
            return offersList;
        }

        public void OnGet() {
            
        }
    }
}

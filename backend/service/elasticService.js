const _upsert = require('./elastic/_upsert');
const _insert = require('./elastic/_insert');
const _sqlQuery = require('./elastic/_sqlQuery');
const _search = require('./elastic/_search');

const elasticService = {
  upsert : _upsert,
  insert : _insert,
  sqlQuery : _sqlQuery,
  search : _search

  
}




module.exports = elasticService;
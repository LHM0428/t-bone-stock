const upsert = require('./elastic/_upsert');
const insert = require('./elastic/_insert');

const elasticService = {
  upsert : upsert,
  insert : insert
   
  

  
}




module.exports = elasticService;
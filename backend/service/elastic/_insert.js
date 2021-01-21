const { Client } = require('@elastic/elasticsearch')

module.exports = async function insert(bulkObj){
    const client = new Client({
        node: 'http://localhost:9200',
        auth: {
          username: 'elastic',
          password: 'changeme'
        }
      });
      const result = await client.helpers.bulk(bulkObj);
      console.log(result);
}

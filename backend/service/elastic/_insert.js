const { Client } = require('@elastic/elasticsearch')

module.exports = async function insert(body){
    const client = new Client({
        node: 'http://localhost:9200',
        auth: {
          username: 'elastic',
          password: 'changeme'
        }
      });
      const result = await client.helpers.bulk({
        datasource: body,
        onDocument (doc) {
          return {
            index: { _index:'tbonestock',
                     _type :'fs',
                     _id   :doc.companyCode }
          }
        }
      });
      console.log(result);
}

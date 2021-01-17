const { Client } = require('@elastic/elasticsearch')


module.exports = async function upsert(body){
    const client = new Client({
      node: 'https://localhost:9200',
      auth: {
        username: 'elastic',
        password: 'changeme'
      }
    });
    
    body.flatMap( data => [
         { "update": { "_id" : data.stockCode, "retry_on_conflict": 3 }},
         { "doc": data, "doc_as_upsert" : true} 
    ])

    console.log(body);
    let params = {
        index: 'tbonestock',
        body
    }
 

    const { body: bulkResponse } = client.bulk(params);

    if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
            const operation = Object.keys(action)[0]
            if (action[operation].error) {
                erroredDocuments.push({
                    // If the status is 429 it means that you can retry the document,
                    // otherwise it's very likely a mapping error, and you should
                    // fix the document before to try it again.
                    status: action[operation].status,
                    error: action[operation].error,
                    operation: body[i * 2],
                    document: body[i * 2 + 1]
                })
            }
        })
        console.log(erroredDocuments)
    }
}
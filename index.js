const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')
const port = 5560;


app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true 
}))



app.listen(port, () => {
    console.log(`Intro app listening at http://localhost:${port}`);
});


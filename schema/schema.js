const graphql = require('graphql')
const { GraphQLBoolean,  GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require('lodash')

let books = [
    {name: 'Half a Yellow Sun', 
        genre: 'yellow', 
        id:'1'},
    {name: 'Haba! Ojuolape', 
        genre: 'oju', 
        id:'2'},
    {name: 'The Beginning of the End', 
        genre: 'end',
        id:'3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType, 
            args: {id:{type: GraphQLString}},
            resolve(parent, args) {
                return _.find(books, {id: args.id})
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})

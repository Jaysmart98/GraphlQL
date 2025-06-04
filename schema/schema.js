const graphql = require('graphql')
const { GraphQLBoolean,  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLID } = graphql;
const _ = require('lodash')

let books = [
    {   name: 'Half a Yellow Sun', 
        genre: 'yellow', 
        id:'1'
    },
    {   name: 'Haba! Ojuolape', 
        genre: 'oju', 
        id:'2'
    },
    {   name: 'The Beginning of the End', 
        genre: 'end',
        id:'3'
    }
]

let gadgets = [
    {   name: 'iPhone 13', 
        type: 'phone', 
        id:'1',
        features: [ "camera, battery, 5G, Face, ID"],
        price: 1000
    },
    {   name: 'MacBook Pro', 
        type: 'laptop', 
        id:'2',
        features: [ "M1 chip, Retina display, Touch Bar, Long battery life" ],
        price: 1299
    },
    {   name: 'Samsung Galaxy S21', 
        type: 'phone',
        id:'3',
        features: [ "camera, battery, 5G, Face, ID"],
        price: 799
    },
    {   name: 'Dell XPS 13', 
        type: 'laptop', 
        id:'4',
        features: [ "InfinityEdge display, 11th Gen Intel Core, Long battery life" ],
        price: 999
    }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const GadgetType = new GraphQLObjectType({
    name: 'Gadget',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        features: {type: new GraphQLList(GraphQLString)},
        price: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id:{type: GraphQLString}},
            resolve(parent, args) {
                return _.find(books, {id: args.id})
            }
        },
        books: { 
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        gadget: {
            type: GadgetType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args) {
                return _.find(gadgets, {id: args.id})
            }
        },
        gadgets: { 
            type: new GraphQLList(GadgetType),
            resolve(parent, args) {
                return gadgets;
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})

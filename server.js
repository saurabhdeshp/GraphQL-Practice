const express = require("express")
const expressGraphQL = require("express-graphql").graphqlHTTP
const { GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString ,
    GraphQLList,
    GraphQLInt
} = require("graphql")
const app = express()

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const BookType = new GraphQLObjectType({
    name : "BookType",
    fields : () => ({
        id : { type : GraphQLInt },
        name : { type : GraphQLString },
        authorId : { type : GraphQLInt }
    })
})

const RootQueryType = new GraphQLObjectType({
    name : "Query",
    fields : () => ({
        books : {
            type : GraphQLList(BookType),
            description : "list of all books",
            resolve : () => books
        }
    })
})

const schema = new GraphQLSchema({
    query : RootQueryType
})


app.use('/graphql', expressGraphQL({
    schema : schema,
    graphiql : true
}))

app.listen(5500, ()=> console.log("srever is running"))


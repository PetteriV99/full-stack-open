const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
    id: ID!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int
    bookCount: Int
  }

  type Query {
    dummy: Int,
    bookCount: Int,
    authorCount: Int,
    allBooks(author: String, genre: String): [Book],
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]
    ): Book!
    editAuthor(
      name: String!, 
      setBornTo: Int!
    ): Author
  }

`
const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // It is not specified in 8.14 whatever Author should be returned if included in the query fields
    // So I am using populate to always include it to avoid issues
    allBooks: async (root, args) => {
      let query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author.id
        } else {
          return []
        }
      }
      if (args.genre) {
        query.genres = args.genre
      }
      const allBooks = await Book.find(query).populate('author')
      return allBooks
    },
    allAuthors: async (root, args) => {
      return Author.find({})
    },
  },
  Author: {
    name: (root) => { return root.name },
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: (root) => root.bookCount,
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          args.author = newAuthor.id;
        } else {
          args.author = author.id;
        }
        const book = new Book({ ...args });
        return book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',            
            invalidArgs: args.title,           
            error
          }
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return {}
      }
      author.born = args.born
      return author.save()
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
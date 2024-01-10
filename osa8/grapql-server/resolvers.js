const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/user')

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
          const author = await Author.findOne({ name: args.author })
          if (!author) {
            const newAuthor = new Author({ name: args.author })
            await newAuthor.save()
            args.author = newAuthor.id
          } else {
            args.author = author.id
          }
          const book = new Book({ ...args })
          try {
            return book.save()
          } catch (error) {
            console.log(error)
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',            
                invalidArgs: args,           
                error
              }
            })
          }
      },
      editAuthor: async (root, args) => {
        // No error handling since an empty object was to be returned??
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return {}
        }
        author.born = args.born
        return author.save()
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        // hardcoded password
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
  }

  module.exports = resolvers

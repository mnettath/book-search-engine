const typeDefs = `
type User {
_id: ID,
username: String,
email: String,
bookCount: Int,
savedBooks: [Book]
}

type Book {
bookId: String,
authors: [String],
description: String,
title: String,
image: String,
link: String,
}

type Auth {
token: ID! 
user: User
}

input SaveBookInput {
authors: [String],
description: String!,
title: String!,
bookId: String!,
image: String,
link: String
}

# GET routes
type Query {
me: [User]
}

# POST, UPDATE, DELETE routes 
type Mutation {
login(email: String! password: String!): Auth,
addUser(username: String! email: String! password: String!): Auth,
saveBook(input: SaveBookInput!): User 
removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;

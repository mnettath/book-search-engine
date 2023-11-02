// Hold the query GET_ME, will execute the me query set up using Apollo Server

import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

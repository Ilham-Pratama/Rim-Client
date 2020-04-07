import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser {
    me {
      id
      username
      email
      imgurl
      createdAt
      updatedAt
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $username: String!) {
    signUp(email: $email, username: $username, password: $password) {
      status
      res
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

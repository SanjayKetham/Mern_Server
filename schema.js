const {gql}=require('apollo-server-express');
const typeDefs=gql`
type User{
id:ID!
name:String!
email:String!
password:String!
}

 type Query
 {
 getUsers:[User]
 }
 type AuthPayload {
  token: String
  user: User
}
 type Mutation
 {
 createUser(name:String!,email:String!,password:String!):User
 loginUser(email:String!,password:String!):AuthPayload
 changePass(id:ID!,password:String!):User 
 }
 `;
 module.exports=typeDefs;

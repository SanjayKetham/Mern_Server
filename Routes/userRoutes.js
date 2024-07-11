const express = require('express');
const router= express.Router();
const typeDefs = require('../schema');
const resolvers=require('../resolvers');
const {ApolloServer,gql}=require('apollo-server-express');

const server=new ApolloServer({typeDefs, resolvers});
router.post('/register',async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        console.log(name,email,password);
        const {data,error}= await server.executeOperation({
            query:gql`
            mutation{

            createUser(name:"${name}",email:"${email}",password:"${password}"){
            name
            email
            password}
            }
            `
        });
        console.log(data);
        if(error){
           return res.status(500).send({message:error});
        }
        res.status(200).json({
            success:true,
            message:data});
        
        
    }catch(error){
        res.send(error.message);
    }
});

router.post('/changepassword',async(req,res)=>{
    try{
        const {id,password}=req.body;
        console.log(id,password);
        const {data,error}=  await server.executeOperation({
            query:gql`{
            changePass(id:"${id}",password:"${password}"){
            name
            email
            password}}`
        });
        console.log(data);
        if(error){
            res.status(500).send(error);
        }
        res.status(200).json({success:true,message:data});
        
    }catch(e){res.send(e.message);}
})
module.exports =router;
const express = require('express');
const mongoose = require('mongoose');

const { MongoClient, ObjectId } = require('mongodb');
const app = express();
require("dotenv").config()
const cors = require('cors');
const port = process.env.PORT || 5000


// Middle ware
app.use(cors())
app.use(express.json())
app.use(express.static("public"));


const productSchema = new mongoose.Schema({
    title: {
        typeof: String,
        // required: true
    },
    price: Number,
    description: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Products", productSchema)


const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri)

const productsCollection = client.db('Icchaporon').collection('products')



async function dbConnected(){
    try {
        await client.connect();
        console.log('Mongodb server connected');
    } catch (error) {
        console.log(error);
    }
}

dbConnected()


// post product
app.post('/products', async (req, res) => {
    try {
        const products = req.body;
        const result = await productsCollection.insertOne(products)
        res.send(result)
    } catch (error) {
        console.log(error.message);

    }
})
// get all products
app.get('/products', async (req, res) => {
    try {
       
        const query = { }
        const result = await productsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})
// get products by email
app.get('/products/:id', async (req, res) => {
    try {
       const {id} = req.params
        const query = {_id: ObjectId(id) }
        const result = await productsCollection.findOne(query)
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})
// product search by brand name
app.get('/products/brand/:brand', async (req, res) => {

    try {
        const brand = req.params.brand;
        const query = { brand: brand }
        const result = await productsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})
// product search by category name
app.get('/products/category/:category', async (req, res) => {

    try {
        const category = req.params.category;
        const query = { category: category }
        const result = await productsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})
// product search by category name
app.get('/search', async (req, res) => {

    try {
        const search = req.query.brand;
        const query = { brand: search }
        const result = await productsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})
// put products for Public
app.put('/products/public/:id', async (req, res) => {

    const id = req.params.id;
    const filter = { _id: ObjectId(id) }
    const options = { upsert: true }
    const updatedDoc = {
        $set: {
            productStatus: true
        }
    }
    const result = await productsCollection.updateOne(filter, updatedDoc, options)
    res.send(result)

})
// delete products by id
app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const result = await productsCollection.deleteOne(query)
        res.send(result)
    } catch (error) {
        console.log(error.message);
    }
})











app.get('/', (req, res)=>{
   res.send('Icchaporon.com server is running')
})
app.listen(port,()=>{
    console.log(`Icchaporon server is running on: ${port}`);
})
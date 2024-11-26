const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors')
const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

// abdurrhaman72
// ZHMU9fstZx5HrJTe


const uri = "mongodb+srv://abdurrhaman72:ZHMU9fstZx5HrJTe@cluster0.6avkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.post('/users', async (req, res)=>{
      const user = req.body;
      console.log('new user',user)
      const result = await userCollection.insertOne(user);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
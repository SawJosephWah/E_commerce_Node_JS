
const express = require('express')
const app = express()
require('dotenv').config()
let mongoose = require('mongoose');

// database connection
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use(express.json());

// routes
let permitRoutes = require('./routes/permit');
let roleRoutes = require('./routes/role');
let userRoutes = require('./routes/user');

app.use('/permit',permitRoutes);
app.use('/role',roleRoutes);
app.use('/user',userRoutes);


//for error message
app.use((err, req, res, next) => {
    err.status = err.status || 200;

    res.status(err.status).json({
        con:false,
        msg : err.message
    })
  })


// migrations
let migrateData = async ()=>{
  let migrator = require('./migrations/migrator');
  // migrator.migrate();
  // migrator.backup();
  // migrator.migrate_role_permit();
  // migrator.add_owner_role_to_owner_user();
}
migrateData();


app.listen(process.env.PORT, () => {
  console.log(`Ecommerce app listening on port ${process.env.PORT}`)
})

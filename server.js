const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,

}).then(con => console.log('DB connection successful')).catch(err => { console.log(err) })


const app = require('./app')

// const test = {
//   name: 'The Forest',
//   rating: 4.7,
//   price: 497
// }
// const testTour = new Tour(test)
// testTour.save()
//   .then(doc => console.log(doc))
//   .catch(err => console.log(err))


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});

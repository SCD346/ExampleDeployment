// require mongoose
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor
const { Schema } = mongoose

//NOTE: NEW SCHEMA (includes bakers)
// BREAD SCHEMA
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' },
  baker: {
    type: Schema.Types.ObjectID,
    ref: 'Baker',
  },
})

//NOTE: NEW
// HELPER METHODS
breadSchema.methods.getBakedBy = function () {
  return `${this.name} was baked with love by ${
    this.baker.name
  }, who has been with us since ${this.baker.startDate.getFullYear()}`
}

// //TODO: OPTIONAL METHOD
// breadSchema.statics.findBakersOtherBreads = function (bakersName) {
//   return this.find({ baker: bakersName })
// }

//BREAD MODEL
const Bread = mongoose.model('Bread', breadSchema)

//EXPORT BREAD
module.exports = Bread

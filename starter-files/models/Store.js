const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]

});

//whenever the name of a store is put into this function to create the slug. It is only run when there is a new name passed in
storeSchema.pre('save', function(next) {
    if(!this.isModified('name')) {
        next(); //skip it
        return; //stop below function from running
    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Store', storeSchema);
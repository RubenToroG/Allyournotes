const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rubens:PASSWORD@cluster0-nzfaq.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))
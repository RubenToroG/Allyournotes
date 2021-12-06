const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))
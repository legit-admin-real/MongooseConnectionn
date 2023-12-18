require('dotenv').config();
const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect(`${process.env.DB_TYPE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    const RockstarGamesPlayerSchema = new mongoose.Schema({
        name: { type: String, unique: true },
        gender: { type: String, unique: true },
        City: { type: String, unique: true },
        Age: Number
    });

    const GTAVI = new mongoose.model('GTAVI', RockstarGamesPlayerSchema);
    const Jason = GTAVI({
        name: 'Jason',
        gender: 'Male',
        City: 'Vice City',
        Age: 30
    });
    const Lucia = GTAVI({
        name: 'Lucia',
        gender: 'Female',
        City: 'Vice City',
        Age: 30
    });

    await Jason.save();
    await Lucia.save();

    // const GTAVI_Resut = await GTAVI.find({gender : 'Male'}).limit(1);
    const GTAVI_Resut = await GTAVI.find({ gender: 'Female' });
    console.log(GTAVI_Resut);
    
}

main().then(() => {
    console.log("Sucessfully connected to", process.env.DB_NAME);
}).catch((err) => {
    console.log(err);
}).finally(() => {
    mongoose.connection.close()
    console.log("Sucessfully closed the connection", process.env.DB_NAME);
});
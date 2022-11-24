const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { users, thoughts, reactions, getRandomItem, getRandom01, getRandomNumber } = require('./data');
const { ObjectId } = require('mongoose').Types;
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.info('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});

    users.forEach(user => {
        User.create({
            username: user,
            email: `${user}@place.com`,
            thoughts: [],
        });
    });

    await thoughts.forEach(async (thought) => {
        const newThought = Thought.create({
            thoughtText: thought,
            username: await User.findOne({}).select('username').exec()
        });
    });

    // let userCount = await User.find({}).exec();
    userCount = await User.countDocuments({}).exec();
    console.log('userCount:', userCount);

    const userCollection = await User.find({}).exec();
    // console.log('userCollection:', userCollection);


    const thoughtCollection = await Thought.find({}).exec()
    

    userCount = await User.countDocuments({}).exec();
    console.log('userCount:', userCount);
    // console.log('thoughtCollection:', thoughtCollection);

    
    // const thoughtIds = thoughtCollection.map(thought => thought._id);

    // console.log('thoughtIds:', thoughtIds);

    // thoughtCollection.map(async (thought) => {
    //     const randUser = await User.findOne({});
    //     console.log('user pre', randUser);

    //     await randUser.thoughts.push(thought);
    //     console.log('userPost', randUser, randUser);
    //     await randUser.save();
    // });



    // const userCollection = await User.collection.insertMany(userList);
    // const userData = await User.find({});
    // const userIds = userCollection.map(user => user._id);

    // console.log(userCollection);

    // console.log('OG Collection', userCollection);
    // console.log('Insert Collection', userData);


    // thoughtIds.map(thought => {
    // const userId = getRandomItem(userIds);
    // const userId = getRandomItem(userIds).valueOf();
    // console.log(userId);
    // id = ObjectId(userId)
    // User.findByIdAndUpdate({userId},
    //     { $push: { thoughts: thought } }, function (err, docs) { console.log(err, docs); })
    // });

    // const userData2 = await User.find({});
    // console.log(userData2);
    // await User.collection.insertMany(userList);



    // const userData = await User.find({}).populate('thoughts');
    // userData.map(user => console.log(user.thoughts));
    // userData.map((data, i) => {
    //     console.log(userData[i]);
    //     console.log(data);
    // });

    // userData.forEach(user => {
    //     const friendList = [];
    //     let tf = 1;
    //     do {
    //         friendList.push()
    //     }
    // })


    process.exit(0);
});
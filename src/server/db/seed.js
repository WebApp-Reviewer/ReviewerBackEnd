const db = require('./client');
const { createUser } = require('./');
const { createAdmin } = require('./admin');
const { createWebsite } = require('./websites');
const { createReview } =  require('./reviews');
const { getAllUsers } = require('./users')

//database name: parent

const dropTables = async () => {
  try {
      await db.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS websites;
      DROP TABLE IF EXISTS admin;
      DROP TABLE IF EXISTS users;
      `)
  }
  catch(err) {
      throw err;
  }
}

const createTables = async () => {
  try{
      await db.query(`
      CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
      );
      `)

      await db.query(`
      CREATE TABLE admin(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          secret VARCHAR(255) UNIQUE
      );
      `)

      await db.query(`
      CREATE TABLE websites(
          id SERIAL PRIMARY KEY,
          authorid INTEGER REFERENCES users(id),
          name VARCHAR(255) UNIQUE NOT NULL,
          url VARCHAR(225) NOT NULL,
          description VARCHAR(225) NOT NULL,
          image VARCHAR(225) NOT NULL
      );
      `)

      await db.query(`
      CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          authorid INTEGER REFERENCES users(id),
          name VARCHAR(225) UNIQUE NOT NULL,
          content VARCHAR(225) NOT NULL,
          rating INTEGER NOT NULL,
          date DATE NOT NULL
      );
      `)
  }
  catch(err) {
      throw err;
  }
} 

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { name: "Emily Johnson", username: "emily", password: "securepass" },
      { name: "Liu Wei", username: "liu", password: "strongpass" },
      { name: "Isabella Garcia", username: "bella", password: "pass1234" },
      { name: "Mohammed Ahmed", username: "mohammed", password: "mysecretpassword" },
      { name: "John Smith", username: "john", password: "password123" }
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialAdmin() {
  console.log('Starting to create admin...');
  try {

    const adminToCreate = [
      { name: "WebAppAdmin", username: "webadmin", password: "adminpassword123", secret: "NoPublicAccess" },
    ]
    const admin = await Promise.all(adminToCreate.map(admin => createAdmin(admin)));
    
    console.log('Admin created:');
    console.log(admin);
    console.log('Finished creating admin!');
  } catch (error) {
    console.error('Error creating admin!');
    throw error;
  }
}

async function createInitialWebsites() {
  console.log('Starting to create websites...');
  const [emily, liu, bella, john] = await getAllUsers();
  
  try {
    const websitesToCreate = [
      { authorid: emily.id, name: 'Netflix', url: 'https://www.netflix.com/', description: 'Streaming platform to watch movies and shows online.', image: 'https://yt3.googleusercontent.com/ytc/AOPolaSbaST1JBNd9phht_n7tFN-VHx0FlvKPHeSDnmu4Q=s900-c-k-c0x00ffffff-no-rj' },
      { authorid: liu.id, name: 'Discord', url: 'https://discord.com/', description: 'Your place to talk and hangout.', image: 'https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ' },
      { authorid: bella.id, name: 'Twitter', url: 'https://discord.com/', description: 'From breaking news and entertainment to sports and politics, get the full story with all the live commentary.', image: 'https://cdn-icons-png.flaticon.com/512/124/124021.png' },
      { authorid: john.id, name: 'Slack', url: 'https://discord.com/', description: 'Work more easily with everyone.', image: 'https://yt3.googleusercontent.com/ytc/AOPolaTCsMhpgrJldSw0eABzVJ9JEc1pYyTST4CJ7JzN1Q=s900-c-k-c0x00ffffff-no-rj' },
    ]
    const websites = await Promise.all(websitesToCreate.map(createWebsite));

    console.log('Websites created:');
    console.log(websites);
    console.log('Finished creating websites!');
  } catch (error) {
    console.error('Error creating websites!');
    throw error;
  }
}

async function createInitialReviews() {
  console.log('Starting to create reviews...');
  
  const [emily, liu, bella, john] = await getAllUsers();
  console.log("authorId reviews", emily.id, liu.id, bella.id, john.id);
  try {

    const reviewsToCreate = [
      { authorid: emily.id, name: 'Thorough review of Netflix', content: 'I love the clear layout of all the shows and movies. It is easy to navigate and find something to watch.', rating: 4, date: '2023-09-13' },
      { authorid: liu.id, name: 'My thoughts on Discord', content: 'I like how I can play games with my friends with the option to live stream while on call.', rating: 4, date: '2023-04-20' },
      { authorid: bella.id, name: 'How I feel about the new Twitter update', content: 'It took some time for me to get used to and I will still be calling it Twitter.', rating: 3, date: '2023-06-17' },
      { authorid: john.id, name: 'Thoughts after using Slack', content: 'I thought it was pretty easy to use as a first time user. Love how more companies are using it as their communication platform.', rating: 4, date: '2023-08-25' },
    ]
    const reviews = await Promise.all(reviewsToCreate.map(review => createReview(review)));

    console.log('Reviews created:');
    console.log(reviews);
    console.log('Finished creating reviews!');
  } catch (error) {
    console.error('Error creating reviews!');
    throw error;
  }
}

const seedDatabase = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialAdmin();
        await createInitialWebsites();
        await createInitialReviews();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabase();
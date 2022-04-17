
//This server was created to fetch user input via API and store input & corresponding output on mySQL database
//importing strategies from PrimeGenerator
let {prime_number_generator_strategy_1, prime_number_generator_strategy_2, prime_number_generator_strategy_3} = require('./PrimeGenerator'); 

const express = require('express');
const mysql = require('mysql2');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();

app.use( bodyParser.urlencoded({
   extended: true
}));

//creating pool connection with mysql server and database
const pool = mysql.createPool({
  host : 'localhost',
  user: 'root',
  database: 'prime_db',
  password: process.env.DB_PASSWORD,
 });

let primeNumbers = ""; // prime numbers between given range
let timeElapsed = 0; // initialising timeElapsed , which is time taken by program to find primes in a given range
let timeElapsedtext =""; // saving timeElapsed(INT) in string format
let count_of_primes = 0; // counting number of primes we got in output
let range = ""; // input range given by user
let strategy = 0; // strategy/algorithm chosen by user to find primes

let timestamp = new Date().getTime(); // getting current time
let timestamptext = timestamp.toString(); // in string format

app.post( '/m' , ( req, res ) => {
 const first_num = req.body.firstNum; //storing input for starting number of given range
 const second_num = req.body.secondNum; //storing input for ending number of given range
 strategy = req.body.strategy; // storing strategy given by user

 //initialising range in string format
 range = "";
 range += (first_num + " to " + second_num); 

 //cases
 //if input strategy is 1
 if(strategy == 1)
 {
   let start = performance.now();// Starting time
   //calling prime generator
   //for strategy 1
   const [ tempprime,tempcount ] = prime_number_generator_strategy_1( first_num, second_num ); 
   
   timeElapsed = performance.now() - start; // time taken by function to execute
   timeElapsedtext = timeElapsed.toString(); // storing in string format
   primeNumbers = tempprime; // storing primeNumbers given by prime_generator
   count_of_primes = tempcount; // storing count of resultant prime numbers by prime_generator
   
 }
 else if(strategy == 2)
 {
   let start = performance.now();
   //calling prime_generator for strategy 2
   const [tempprime,tempcount] = prime_number_generator_strategy_2( first_num, second_num );

   timeElapsed = performance.now() - start;
   timeElapsedtext = timeElapsed.toString();
   primeNumbers = tempprime;
   count_of_primes = tempcount; 
   
 }
 else if(strategy == 3)
 { 
   let start = performance.now();
   //calling prime_generator for strategy 3  
   const [tempprime,tempcount] = prime_number_generator_strategy_3( first_num, second_num );

   timeElapsed = performance.now() - start;
   timeElapsedtext = timeElapsed.toString();
   primeNumbers = tempprime;
   count_of_primes = tempcount;

  //  console.log(primeNumbers);
  //  console.log(count_of_primes);
  //  console.log(range);
  //  console.log(timeElapsed)
 }

 // creating SQL query 
 let sql =`
 INSERT INTO primetable (
     resultprime,
     rangeofprime,
     timestamp,
     timeelapsed,
     strategy,
     numberofprimes
 )
 VALUES(
     '${primeNumbers}',
     '${range}',
     '${timestamptext}',
     '${timeElapsedtext}',
     '${strategy}',
     '${count_of_primes}'
 )
`;

//executing our sql query and saving result on databse  
pool.execute( sql, ( err, result ) => {
  if(err)
  throw err;
  console.log( result );
 })
 
 res.send( " Response arrived succesfuly " );
});


// creating port to listen at i.e port 3000
app.listen( '3000' , () => {
   console.log( " server started on port 3000 " );
});

module.exports = pool.promise();


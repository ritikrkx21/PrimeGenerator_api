//collecting and storing input {first_number, second_number, strategy chosen} via command line
let first_number = process.argv[2];
let second_number = process.argv[3];
let strategy = process.argv[4];

//Find prime numbers in a given range using Strategy 1
//Most Basic of all the 3 strategies used
//Having time complexity of O(N*N)
//Hence , the slowest of all strategies
function prime_number_generator_strategy_1( first_number, second_number )
{
    let selectedPrime = "";
    let count_of_primes = 0;

   function checkPrime(x) // checking if a number is prime or not
   {
       if( x <= 1)
         return false;   

       for(let i = 2 ; i < x ; i++)
       {
         if(x % i == 0)
          return false ;
       }

       return true;
   }

   for(let i = first_number ; i <= second_number; i++)
   {
       if( checkPrime(i) === true)
       {
           // for all selected prime numbers
           selectedPrime += (i+"_");
           count_of_primes ++;
       }
   }
   console.log(selectedPrime);

   return [ selectedPrime, count_of_primes ];
}

//Strategy 2 for finding prime numbers
//Better time complexity than strategy 1
function prime_number_generator_strategy_2( first_number, second_number )
{
    let selectedPrime = "";
    let count_of_primes = 0;

  function checkPrime(x)
  {
      if(x <= 1)
      return false;
      if(x <= 3)
      return true;

      if (x % 2 == 0 || x % 3 == 0)
      return false;

      for (let i = 5; i * i <= x; i = i + 6)
      if (x % i == 0 || x % ( i + 2 ) == 0 )
          return false;

    return true;
  }    

  for(let i=first_number ; i <= second_number ;i++)
  {
     if(checkPrime(i) === true)
     {
         selectedPrime += (i+"_");
         count_of_primes ++;
     }
  }
  console.log(selectedPrime);
  
  return [ selectedPrime, count_of_primes ];
}

//Strategy 3 for finding prime numbers in given range
//Algorithm used is "Sieve of Eratosthenes"
//One of the fastest algorithm designed to find prime numbers in a given range
//Time Complexity of O(N*log(log N))
function prime_number_generator_strategy_3( first_number, second_number )
{
    let selectedPrime = "";
    let count_of_primes = 0;

    let prime = new Array(second_number+1);
    
    for(let i = 0 ;i <= second_number; i++)
    prime[i] = true;
    
    for(let i = 2; i * i <= second_number ; i++)
    {
      if(prime[i] === true)
      {
          for(let j = i*i ; j <= second_number ; j += i )
          {
              prime[j] = false;
          }
      }
    }

    for(let i = first_number ; i <= second_number; i++)
    {
        if(prime[i] === true)
        {
            selectedPrime += (i+"_");
            count_of_primes ++;
        }

    }
    
    console.log(selectedPrime);
    return [ selectedPrime, count_of_primes ];
        

}

//Giving Output on Command Line (if user wants to) based on the chosen strategy 
if(strategy == 1)
prime_number_generator_strategy_1(first_number,second_number);

else if(strategy == 2)
prime_number_generator_strategy_2(first_number,second_number);

else if(strategy == 3)
prime_number_generator_strategy_3(first_number,second_number);

// exporting strategies
module.exports = {prime_number_generator_strategy_1, prime_number_generator_strategy_2, prime_number_generator_strategy_3  };
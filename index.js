const express = require('express');
//imports the job list as a json
let jobList = require('./jobs.json'); 
const app = express();
//allows use to query for users input
app.use(express.urlencoded({extended:true}))
// static contets
app.use(express.static('static'));


//used to retrieve the job list json
app.get('/jobList', (req,res) => 
{
    //empty array to filter from jobList 
    let a = [];  
    //used to hold array jobList 
    let b = []; 

    //looping through the job list 
   for (let i in jobList)
   {
       let e = i;
       //add the category at given index to array r
       b.push(jobList[e].categories) 
   }
   // nested loop to add job categories with no repitition o = y
   //for all the values in y up to the length of the amount of categories
   for(let y = 0; y < b.length; y++)
    {
        //for all the values in z, that are less than the array of categories
        for(let z = 0; z < b[y].length; z++)  
        {
            if(y>0) //
            {
                //repitition is false 
                let repeat = false; 
                //for all of the size of array a
                for(let n = 0; n < a.length; n++)
                 {
                    //if there is repetion, increase the amount and set reapeat to true
                    if (b[y][z] == a[n][0])
                    {
                        //increasing 
                        a[n][1] = a[n][1]  + 1;
	      //set the repeat to true
                        repeat = true;
                    }    
                }
                //no rep then add the values to the array
                if(repeat == false) 
                {
                    a.push([b[y][z],1]); 
                }
            }
            else
            {
                //otherwise just add to the array
                a.push([b[y][z],1]); 
            }
        }
    }
    //send the response object
   res.json(a); 
})


//getting the description of each category
app.get('/catergories/:desc', (req,res) => 
{

    // for joblist array r = x
    let x = [] 
    
    //loop through jobs object
    for (let i in jobList)
    {
        let e = i;
        
        //loop through the categories
        for(let z = 0; z < jobList[e].categories.length; z++) 
        {
            //if the descriptipion of the job matches the catgeory of the job list
            if(req.params.desc == jobList[e].categories[z]) 
            {
                //add to the array
                x.push(jobList[e].title); 
            }
        }
    }
    //send the response
    res.json(x);
 
 });

//regarding viewing the available jobs
app.get('/availablejobs', (req,res) =>
 {
    //array to hold jobslist
    let y = [];

    //for all values in joblist
    for (let i in jobList)
    {
        let e = i;
        
        //used to grab the json elements 
        let split = jobList[e].title.match(/\(([^)]+)\)/)[1];

        //spliting to get the value of city
        var city = split.substr(0, split.indexOf(',')); 

        //comparision to ensure that the query is the same as the city 
        if(city == req.query.city) 
        {
            //pushes the city to the array
            y.push(jobList[e].title);
        }
    }
    //send the response object
    res.json(y); 
})
//listening port of the app
app.listen(2000); 

// flash_cards.js
// 01.22.2017
// npm install inquirer
var inquirer = require("inquirer");

// Constructor 
function Basic(q, a)
	{
		this.q = q;
		this.a = a;
	}

//Constructor
function Cloze(q, a)
	{
		this.q = q;
		this.a = a;
		this.answer = function()
		{
    		return this.q + this.a;
		}
	}


// basic
var b1 = new Basic("What is the capital of Alabama?", "Montgomery");
// cloze
var c1 = new Cloze("The capital of Alabama is ", "Montgomery");

// basic
var b2 = new Basic("What is the capital of Alaska?", "Juneau");
// cloze
var c2 = new Cloze("The capital of Alaska is ", "Juneau");

// basic
var b3 = new Basic("What is the capital of Arkansas?", "Little Rock");
// cloze
var c3 = new Cloze("The capital of Arkansas is ", "Little Rock");

// basic
var b4 = new Basic("What is the capital of Connecticut?", "Hartford");
// cloze
var c4 = new Cloze("The capital of Connecticut is ", "Hartford");

// basic
var b5 = new Basic("What is the capital of Florida?", "Tallahassee");
// cloze
var c5 = new Cloze("The capital of Florida is ", "Tallahassee");

// basic
var b6 = new Basic("What is the capital of Illinois?", "Springfield");
// cloze
var c6 = new Cloze("The capital of Illinois is ", "Springfield");

// basic
var b7 = new Basic("What is the capital of Michigan?", "Lansing");
// cloze
var c7 = new Cloze("The capital of Michigan is ", "Lansing");

// basic
var b8 = new Basic("What is the capital of New Jersey?", "Trenton");
// cloze
var c8 = new Cloze("The capital of New Jersey is ", "Trenton");

// basic
var b9 = new Basic("What is the capital of Pennsylvania?", "Harrisburg");
// cloze
var c9 = new Cloze("The capital of Pennsylvania is ", "Harrisburg");

// index
var i_cnt = 0;
var i_correct = 0;
var a_basic_card = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
var a_cloze_card = [c1, c2, c3, c4, c5, c6, c7, c8, c9];

/////////////////////////////////////////////////////////////

var next_basic_card = function()
{
  console.log("");
  if (i_cnt < a_basic_card.length)
  {
    inquirer.prompt
    ([{
      name:"response",
      message: a_basic_card[i_cnt].q
    }])
    .then( function(answer) 
    {
      if (answer.response === a_basic_card[i_cnt].a)
      {
        i_correct++;
        console.log("Correct");
      }
      else
      {
        console.log("Incorrect. The answer is: " + a_basic_card[i_cnt].a);
      }
      i_cnt++;
      next_basic_card();
    }); // end this.function
  } // end if
  else
  {
    var ended = true;
    i_cnt = 0;
    if (ended === true)
    {// begin if statement
      console.log("You got " + i_correct + " correct.");
      	inquirer.prompt
        ([{
    	  		type: "confirm",
    	  		name: "again",
    	  		message: "Play again?"
      		}])
        .then(function (answer) 
        {
      		if(answer.again === true)
          {
      			i_correct=0;
            func_begin_game();
            ended = false;
      		}
          else
          {
      			console.log("Good bye");
      		}
    	});
    }// end if statement
  } // end else
} // end next_basic_card


//function for the cloze cards
var func_next_close_card = function()
{
    console.log("");
    if (i_cnt < a_cloze_card.length)
    {
      inquirer.prompt
        ([{
          name: "response",
          message: a_cloze_card[i_cnt].q + "  "
        }])
      .then(function(answer)
      {
        if (answer.response === a_cloze_card[i_cnt].a)
        {
          i_correct++;
          console.log("Correct");
        }
        else
        {
          console.log("Incorrect. The answer is: " + a_cloze_card[i_cnt].answer());
        }
        i_cnt++;
        func_next_close_card();
      });
    } 
    else
    {
      var ended = true;
      i_cnt = 0;
      if (ended === true)
      {
        console.log("You got " + i_correct + " correct.");
        inquirer.prompt
        ([{
          type: "confirm",
          name: "again",
          message: "Play again?"
        }])

        .then(function (answers)
        {
          if(answers.again === true)
          {
            i_correct = 0;
            func_begin_game();
            ended = false;
          }
          else
          {
            console.log("Good bye");
          }

        }); // End of then function

    }//end of if statement
  } // end of else
} // end func_next_close_card


///////////////////////////////////////////////////////////////////////////
// Game starts here
var func_begin_game = function ()
{
  //console.log("Entered function func_begin_game");
  console.log(" ");
  inquirer.prompt
  ([{
    name: "start",
    message: "Basic or Cloze flash cards?"
  }]).then(function (answer) 
  {
    if (answer.start === "Basic" || answer.start === "basic")
    {
      console.log(" -- Basic -- ");
      console.log("Instructions: Finish the sentence with the correct state.\n");
      
      next_basic_card();
    }
    else
    {
      console.log(" -- Cloze -- ");
      console.log("Instructions: Finish the sentence with the correct state.\n");
      func_next_close_card();
    }
  }); // end this.function
} // end if


console.log("clear");
func_begin_game();




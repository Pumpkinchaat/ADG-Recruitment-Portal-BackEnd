const User = require('../../models/user')
const mQuestion=require('../../models/questionManagement')
const dQuestion=require('../../models/questionDesign');
const tQuestion = require('../../models/questionTechnical')
const Response =require('../../models/response')

async function getAllManagementQuestionsFunction(req,res){
    console.log(req.user)
    try{
      mQuestion.find({},function(err,questions){
        console.log(questions);
        res.status(200).json({
            questions: questions
          })
      });

      
    } catch (err){
      res.status(500).send({
        success: false,
        message:"Error"
      })
    }
  }

  async function getAllDesignQuestionsFunction(req,res){
    console.log(req.user)
    try{
      dQuestion.find({},function(err,questions){
        console.log(questions);
          res.status(200).json({
            questions: questions
          })
        });
     
    } catch (err){
      res.status(500).send({
        success: false,
        message:"Error"
      })
    }
  }

//POST REQUEST TO CREATE QUESTIONS
async function createTechnicalQuestionFunction(req,res,next) {
const quizData = {
  ...req.body
};
try{
  const tQuiz = new tQuestion({
    ...quizData,
    questionImage: {
      filename: req.file.filename,
      url: req.file.url
    }
  });
  await tQuiz.save();
  return res.status(201).send(tQuiz);
} catch(err){
  res.status(500).send({
    message:"Error"
  })
}
};

async function createManagementQuestionFunction(req,res,next) {
  const quizData = {
    ...req.body
  };
  try{
    const mQuiz = new mQuestion({
      ...quizData,
      questionImage: {
        filename: req.file.filename,
        url: req.file.url
      }
    });
    await mQuiz.save();
    return res.status(201).send(mQuiz);
  } catch(err){
    res.status(500).send({
      message:"Error"
    })
  }
  };

  async function createDesignQuestionFunction(req,res,next) {
    const quizData = {
      ...req.body
    };
    try{
      const dQuiz = new dQuestion({
        ...quizData,
        questionImage: {
          filename: req.file.filename,
          url: req.file.url
        }
      });
      await dQuiz.save();
      return res.status(201).send(dQuiz);
    } catch(err){
      res.status(500).send({
        message: "Error"
      })
    }
    };
    
  


//GET REQUEST TO GET ALL QUESTIONS
async function getAllTechnicalQuestionsFunction(req,res,next) {
  try{
    tQuestion.find({},function(err,questions){
      console.log(questions);
        
        res.status(200).json({
          questions: questions
        })
      });
  } catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}
//GET REQUEST TO GET SPECIFIC QUESTION
async function getSpecificTechnicalQuestionFunction(req,res,next){
  try{
    const questionId = req.params.questionId
    const tSpecificQuestion = await tQuestion.findById(questionId)
    if(!tSpecificQuestion){
      res.status(400).send({
        message: 'Question Id Wrong!'
      })
    } else{
      res.status(200).send(tSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}

/* //GET REQUEST TO GET QUESTIONS OF A CERTAIN YEAR AND DIFFICULTY LEVEL
async function getSpecificYearAndDifficultyTechnicalQuestionFunction(req,res,next){
  try{
    const yearofstudy = req.params.yearofstudy
    const difficultyLevel = req.params.difficultyLevel
    const tSpecificQuestion = await tQuestion.find({yearofstudy:yearofstudy, difficulty:difficultyLevel})
    if(!tSpecificQuestion){
      res.status(400).send({
        success: false,
        message: 'No questions available!'
      })
    } else{
      res.status(200).send(tSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      success: false,
      message: 'Failed'
    })
  }
}

async function getSpecificYearAndDifficultyDesignQuestionFunction(req,res,next){
  try{
    const yearofstudy = req.params.yearofstudy
    const difficultyLevel = req.params.difficultyLevel
    const dSpecificQuestion = await dQuestion.find({yearofstudy:yearofstudy, difficulty:difficultyLevel})
    if(!dSpecificQuestion){
      res.status(400).send({
        success: false,
        message: 'No questions available!'
      })
    } else{
      res.status(200).send(dSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      success: false,
      message: 'Failed'
    })
  }
}

async function getSpecificYearAndDifficultyManagementQuestionFunction(req,res,next){
  try{
    const yearofstudy = req.params.yearofstudy
    const difficultyLevel = req.params.difficultyLevel
    const mSpecificQuestion = await mQuestion.find({yearofstudy:yearofstudy, difficulty:difficultyLevel})
    if(!mSpecificQuestion){
      res.status(400).send({
        success: false,
        message: 'No questions available!'
      })
    } else{
      res.status(200).send(mSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      success: false,
      message: 'Failed'
    })
  }
}
 */

async function getSpecificManagementQuestionFunction(req,res,next){
  try{
    const questionId = req.params.questionId
    const mSpecificQuestion = await mQuestion.findById(questionId)
    if(!mSpecificQuestion){
      res.status(400).send({
        message: 'Question Id Wrong!'
      })
    } else{
      res.status(200).send(mSpecificQuestion)
    }
  } catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}

async function getSpecificDesignQuestionFunction(req,res,next){
  try{
    const questionId = req.params.questionId
    const dSpecificQuestion = await dQuestion.findById(questionId)
    if(!dSpecificQuestion){
      res.status(400).send({
        message: 'Question Id Wrong!'
      })
    } else{
      res.status(200).send(dSpecificQuestion)
    }
  } catch(error){
    console.log(error)
    res.status(500).send({
      message: "Error"
    })
  }
}
//PUT REQUEST TO UPDATE QUESTION
async function updateSpecificTQuestionFunction(req,res,next) {
  try{
  const updateQuestion = req.params.questionId
  let questiontoBeUpdated = await tQuestion.findById(updateQuestion)
  if(!questiontoBeUpdated){
    res.status(400).send({
      message: "Question to be Updated Not Found!"
    })
  } else {
    questiontoBeUpdated.questionDescription = req.body.questionDescription;

    questiontoBeUpdated.options = req.body.options;

    questiontoBeUpdated.correctOption= req.body.correctOption;

    questiontoBeUpdated.questionImage= req.body.questionImage;

    questiontoBeUpdated.yearofstudy = req.body.yearofstudy;

    if (req.file.filename && req.file.url) {
      questiontoBeUpdated.questionImage = {
        filename: req.file.filename,
        url: req.file.url
      }
    }

    //questiontoBeUpdated.difficulty = req.body.difficulty;
    
    await questiontoBeUpdated.save();
    res.status(200).send(questiontoBeUpdated)
  }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function updateSpecificMQuestionFunction(req,res,next) {
  try{
  const updateQuestion = req.params.questionId
  let questiontoBeUpdated = await mQuestion.findById(updateQuestion)
  if(!questiontoBeUpdated){
    res.status(400).send({
      message: "Question to be Updated Not Found!"
    })
  } else {
    questiontoBeUpdated.description = req.body.description;

    if (req.file.filename && req.file.url) {
      questiontoBeUpdated.questionImage = {
        filename: req.file.filename,
        url: req.file.url
      }
    }

    /* questiontoBeUpdated.yearofstudy = req.body.yearofstudy;

    questiontoBeUpdated.difficulty = req.body.difficulty; */
    
    await questiontoBeUpdated.save();
    res.status(200).send(questiontoBeUpdated)
  }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function updateSpecificDQuestionFunction(req,res,next) {
  try{
  const updateQuestion = req.params.questionId
  let questiontoBeUpdated = await dQuestion.findById(updateQuestion)
  if(!questiontoBeUpdated){
    res.status(400).send({
      message: "Question to be Updated Not Found!"
    })
  } else {
    questiontoBeUpdated.questionDescription = req.body.questionDescription;

    questiontoBeUpdated.options = req.body.options;

    questiontoBeUpdated.correctOption= req.body.correctOption;

    questiontoBeUpdated.questionImage= req.body.questionImage;

    questiontoBeUpdated.yearofstudy = req.body.yearofstudy;

    if (req.file.filename && req.file.url) {
      questiontoBeUpdated.questionImage = {
        filename: req.file.filename,
        url: req.file.url
      }
    }

    await questiontoBeUpdated.save();
    res.status(200).send({
      questiontoBeUpdated
    })
  }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}
//DELETE REQUEST TO DELETE QUESTION
async function deleteSpecificTQuestionFunction(req,res,next) {
  try{
    const deletedId = req.params.questionId;
    let questionDelete = await tQuestion.findByIdAndDelete(deletedId)
    if(!questionDelete){
      res.status(400).send({
        message: "Question does not Exist"
      })
    } else {
      res.status(200).send({
        message: "Question Deleted Successfully!"
      })
    }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function deleteSpecificMQuestionFunction(req,res,next) {
  try{
    const deletedId = req.params.questionId;
    let questionDelete = await mQuestion.findByIdAndDelete(deletedId)
    if(!questionDelete){
      res.status(400).send({
        message: "Question does not Exist"
      })
    } else {
      res.status(200).send({
        message: "Question Deleted Successfully!"
      })
    }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

async function deleteSpecificDQuestionFunction(req,res,next) {
  try{
    const deletedId = req.params.questionId;
    let questionDelete = await dQuestion.findByIdAndDelete(deletedId)
    if(!questionDelete){
      res.status(400).send({
        message: "Question does not Exist"
      })
    } else {
      res.status(200).send({
        message: "Question Deleted Successfully!"
      })
    }
  } catch(error) {
    res.status(500).send({
      message: "Error"
    })
  }
}

//GET REQUEST TO VIEW 10 QUESTIONS FROM THE SCHEMA IN A RANDOM MANNER

async function getRandomAllTechnicalQuestionsFunction(req,res,next) {
  try{
    //if the user's isAttempted has already been set to true then he cannot take the test again
    const attemptedTestAlready = await User.findOne({_id: req.user._id, attemptedTechnical: true})
    if(attemptedTestAlready){
      return res.status(400).send({
        message:"You have Already Taken this Test!"
      })
    } else {
      console.log(req.params.device);
      if(req.params.device === "mobile"){
        var tQuestions = await tQuestion.aggregate([  
          { $match:  {"yearofstudy": Number(req.params.yearOfStudy)} },
          { $sample: {size: 10} },
          {$project: {"correctOption":0, "questionImage":0}}
        ])
      } else{
    var tQuestions = await tQuestion.aggregate([  
      { $match:  {"yearofstudy": Number(req.params.yearOfStudy)} },
      { $sample: {size: 10} },
      {$project: {"correctOption":0}}
    ])
      }
      console.log(tQuestions)
    User.findOneAndUpdate({_id: req.user._id},{attemptedTechnical:true},function(err,updateduser){
      if(err)
      console.log(err)
      else
      console.log(updateduser)
    });
    res.status(200).send(tQuestions)
   }}
  catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}

async function getRandomAllManagementQuestionsFunction(req,res,next) {
  try{
    const attemptedTestAlready = await User.findOne({_id: req.user._id, attemptedManagement: true})
    if(attemptedTestAlready){
      return res.status(400).send({
        message:"You have Already Taken this Test!"
      })
    } 
    else {
      if(req.params.device === "mobile"){
        var mQuestions = await mQuestion.aggregate([{ $sample: { size: 5 } },{$project: {"questionImage":0}}]);
      } else{
    var mQuestions = await mQuestion.aggregate([{ $sample: { size: 5 } }]);
      }
    User.findByIdAndUpdate(req.user._id,{attemptedManagement:true},function(err,updateduser){
      if(err)
      console.log(err)
      else
      console.log(updateduser)
    });
    res.status(200).send(mQuestions)
    }}
  catch(error){
    res.status(500).send({
      message: "Error"
    })
  }
}
async function getRandomAllDesignQuestionsFunction(req,res,next) {
  try{
    const attemptedTestAlready = await User.findOne({_id: req.user._id, attemptedDesign: true})
    if(attemptedTestAlready){
      return res.status(400).send({
        message:"You have Already Taken this Test!"
      })
    } else {
      if(req.params.device === "mobile"){
        var dQuestions = await dQuestion.aggregate([  
          { $sample: {size: 10} }, 
          /* { $match:  {"yearofstudy": Number(req.params.yearOfStudy)} }, */
          {$project: {"correctOption":0, "questionImage":0}}
        ]);
      } else{
    var dQuestions = await dQuestion.aggregate([  
      { $sample: {size: 10} }, 
      /* { $match:  {"yearofstudy": Number(req.params.yearOfStudy)} }, */
      {$project: {"correctOption":0}}
    ]);
      }
    User.findByIdAndUpdate(req.user._id,{attemptedDesign:true},function(err,updateduser){
      if(err)
      console.log(err)
      else
      console.log(updateduser)
    });
    res.status(200).send(dQuestions)
    } }
  catch(error){
    res.status(500).send({
      message: 'Failed'
    })
  }
}

//cronjob
async function helloFunction(req,res,next){
  try{
    res.status(200).send({message:"Hello!"});
  }
  catch{
    res.status(500).send({message:"error"});
  }
}

//recruitments status
async function recruitmentsStatusFunction(req,res,next){
  try{
    Response.findById('5fe6fc973ecf810a52e90d5f',function(err,result){
      if(err)
      console.log(err)
      else
      res.status(200).send({status:result.status});
    })
   
  
    
  }
  catch(err){
    console.log(err)
    res.status(500).send({message:err})
  }
}

async function  updateStatusFunction(req,res,next){
  try{
    Response.findByIdAndUpdate('5fe6fc973ecf810a52e90d5f',{status:req.query.recruitment},function(err,updated){
      if(err)
      console.log(err)
      else
      console.log(updated.status);

    })
    res.status(200).send({message:"updated status"});

  }
  catch{
    res.status(500).send({message:"error"});
  }
}



async function getUserDetailsAdmin(req,res,next) {
  //to check with domain and year
  //sort the response based on highest scores first
  try{
  if(req.query.domain == 'technical'){
    var userDetails = await User.find({yearofstudy: req.query.year,attemptedTechnical:true}).sort({techscore: 'desc'}).select('name regno email techscore phone isSelectedTechnical')
    if(userDetails){
      res.status(200).send({
        details: userDetails
      })
    } else{
      res.status(400).send({
        message: "No User Details Exist for Technical!"
      })
    }
  } else if(req.query.domain == 'design'){
    var userDetails = await User.find({yearofstudy: req.query.year,attemptedDesign:true}).sort({designscore: 'desc'}).select('name regno email designscore phone isSelectedDesign')
    if(userDetails){
      res.status(200).send({
        details: userDetails
      })
    } else{
      res.status(400).send({
        message: "No User Details Exist for Technical!"
      })
    }
  } else if(req.query.domain == 'management') {
    var userDetails = await User.find({yearofstudy: req.query.year,attemptedManagement:true}).select('name regno email responseManagement phone isSelectedManagement')
    if(userDetails){
      res.status(200).send({
        details: userDetails
      })
    } else{
      res.status(400).send({
        message: "No User Details Exist for Technical!"
      })
    }
  } else {
    return res.status(400).send({
      message: "Incorrect Domain Entered!"
    })
  }
} catch(err){
  res.status(500).send({
    message:"Error"
  })
}
}

async function getSpecificUserDetailsAdmin(req,res,next){
  try{
    const specificUserDetails = await User.findOne({ regno:req.query.regno}).select('name regno email techscore designscore responseManagement phone isSelectedManagement isSelectedDesign isSelectedTechnical')
    if(specificUserDetails){
      return res.status(200).send({
        details: specificUserDetails
      })
    } else{
      return res.status(400).send({
        message:"Not able to find User"
      })
    }
  }
  catch{
    return res.status(500).send({
      message:"Error"
    })
  }
}

async function getResponsesOfUser(req,res,next){
  try{
    if(req.query.domain == 'technical'){
      var userResponses = await User.findOne({regno:req.query.regno}).select("responseTech")
      // console.log(userResponses.responseTech)
      if(userResponses.responseTech){
        async function getUserDetails(responseTech) {
          // console.log(responseTech)
        var responses =[];
        var i=0;
        
        async function generateResponse(arr){

          for(let i=0;i<arr.length;i++){
            var data =  await tQuestion.findById(arr[i].qid)
            // console.log(data);
            var answer = await arr[i].response
            responses.push({
              "question":  await data.questionDescription,
              "correctAnswer":  await data.options[data.correctOption],
              "attemptedAnswer":  await data.options[answer]
            })
            // i++;
            //  console.log(i);
          console.log(responses)

          }
          return responses;

        }
        res=await generateResponse(responseTech);
    
    
        return res;
        
        
        }
        
        return res.status(200).send({
          responses:await getUserDetails(userResponses.responseTech)
        })

    }else{
        return res.status(400).send({
          message:"User Not Found!"
        })
      }

    } else if(req.query.domain == 'design'){
       var userResponses = await User.findOne({regno:req.query.regno}).select("responseDesign")
    // console.log(userResponses.responseTech)
    if(userResponses.responseDesign){
      async function getUserDetails(responseDesign) {
       console.log(responseDesign)
      var responses =[];
      var i=0;
      
      async function generateResponse(arr){

        for(let i=0;i<arr.length;i++){
          var data =  await dQuestion.findById(arr[i].qid)
          // console.log(data);
          var answer = await arr[i].response
          responses.push({
            "question":  await data.questionDescription,
            "correctAnswer":  await data.options[data.correctOption],
            "attemptedAnswer":  await data.options[answer]
          })
          // i++;
          //  console.log(i);
        console.log(responses)

        }
        return responses;

      }
     return  await generateResponse(responseDesign);
  
  
      
      
      }
      
      return res.status(200).send({
        responses:await getUserDetails(userResponses.responseDesign)
      })

  }else{
      return res.status(400).send({
        message:"User Not Found!"
      })
    }
    }else if(req.query.domain == 'management'){
      var userResponses = (await User.findOne({regno:req.query.regno})).select("responseManagement")
      if(userResponses){
        return res.status(200).send({
          userAnswers: userResponses
        })
      } else{
        return res.status(400).send({
          message:"User Not Found!"
        })
      }
    }
  }
  catch(error){
    return res.status(500).send(error)

  }
}
async function acceptAUser(req,res,next){
  try{
    if(req.query.domain == 'technical'){
      var userUpdate = await User.findOneAndUpdate({ regno: req.query.regno},{isSelectedTechnical:true})
      console.log(userUpdate)
      if(userUpdate){
        return res.status(200).send({
          message:"User has been Accepted into Technical Domain"
        })
      } else{
        return res.status(400).send({
          message:"User Cannot be Found!"
        })
      }
    }else if(req.query.domain == 'design'){
      var userUpdate = await User.findOneAndUpdate({ regno: req.query.regno},{isSelectedDesign:true})
      console.log(userUpdate)
      if(userUpdate){
        return res.status(200).send({
          message:"User has been Accepted into Design Domain"
        })
      } else{
        return res.status(400).send({
          message:"User Cannot be Found!"
        })
      }
    } else if(req.query.domain == 'management'){
      var userUpdate = await User.findOneAndUpdate({ regno: req.query.regno},{isSelectedManagement:true})
      console.log(userUpdate)
      if(userUpdate){
        return res.status(200).send({
          message:"User has been Accepted into Management Domain"
        })
      } else{
        return res.status(400).send({
          message:"User Cannot be Found!"
        })
      }
    }else {
      return res.status(400).send({
        message: "Incorrect Domain Entered!"
      })
    }
  }
  catch{
    return res.status(500).send({
      message:"Error"
    })
  }
}

 async function rejectUser(req,res,next){
  try{
    if(req.query.domain == 'technical'){
      var userUpdate2 = await User.findOneAndUpdate({regno: req.query.regno},{isSelectedTechnical:false})
      if(userUpdate2){
        return res.status(200).send({
          message:"User has been Rejected into Technical Domain"
        })
      } else{
        return res.status(400).send({
          message:"User Cannot be Found!"
        })
      }
    }else if(req.query.domain == 'design'){
      var userUpdate2 = await User.findOneAndUpdate({regno: req.query.regno},{isSelectedDesign:false})
      if(userUpdate2){
        return res.status(200).send({
          message:"User has been Rejected into Design Domain"
        })
      } else{
        return res.status(400).send({
          message:"User Cannot be Found!"
        })
      }
    } else{
      var userUpdate2 = await User.findOneAndUpdate({regno: req.query.regno},{isSelectedManagement:false})
      if(userUpdate2){
        return res.status(200).send({
          message:"User has been Rejected into Management Domain"
        })
      } else{
        return res.status(400).send({
          message:"User Cannot be Found!"
        })
      }
    }
  }
  catch{
    return res.status(500).send({
      message: "Error!"
    })
  }
}


//Display all the Selected or Rejected Candidates of a particular domain

async function getSelectedOrRejected(req,res,next){
  try{
    if(req.query.choice == 'selected'){
      if(req.query.domain == 'technical'){
        var selectedDetails = await User.find({isSelectedTechnical:true}).sort({techscore: 'desc'}).select('name regno email phone')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else if(req.query.domain == 'design'){
        var selectedDetails = await User.find({isSelectedDesign:true}).sort({designscore: 'desc'}).select('name regno email phone')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else if(req.query.domain == 'management'){
        var selectedDetails = await User.find({isSelectedManagement:true}).select('name regno email phone')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else {
        return res.status(400).send({
          message: "Incorrect Domain Entered!"
        })
      }
    }else if(req.query.choice == 'rejected'){
      if(req.query.domain == 'technical'){
        var selectedDetails = await User.find({isSelectedTechnical:false}).sort({techscore: 'desc'}).select('name regno email phone')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else if(req.query.domain == 'design'){
        var selectedDetails = await User.find({isSelectedDesign:false}).sort({designscore: 'desc'}).select('name regno email phone')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        } 
      } else if(req.query.domain == 'management'){
        var selectedDetails = await User.find({isSelectedManagement:false}).select('name regno email phone')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else {
        return res.status(400).send({
          message: "Incorrect Domain Entered!"
        })
      }
    }
  }
  catch{
    return res.status(500).send({
      message:"Error"
    })
  }
}


async function resetAttempt(req,res,next){
  try{
  //check domain and regno(to find user)
  //update the isAttempted and the responses of that particular domain
  if(req.query.domain == "technical"){
    await User.findOneAndUpdate({regno:req.query.regno},{attemptedTechnical:false , responseTech:[]},(err,result)=> {
      if(err){
        return res.status(400).send({
          message: err.message
        })
      } else {
        return res.status(200).send({
          message:"Tech Attempt for the User has been reset!"
        })
      }
    })
  } else if(req.query.domain == "design"){
    await User.findOneAndUpdate({regno:req.query.regno},{attemptedDesign:false , responseDesign:[]},(err,result)=> {
      if(err){
        return res.status(400).send({
          message: err.message
        })
      } else {
        return res.status(200).send({
          message:"Design Attempt for the User has been reset!"
        })
      }
    })
  }else if(req.query.domain == "management") {
    await User.findOneAndUpdate({regno:req.query.regno},{attemptedManagement:false , responseManagement:[]},(err,result)=> {
      if(err){
        return res.status(400).send({
          message: err.message
        })
      } else {
        return res.status(200).send({
          message:"Management Attempt for the User has been reset!"
        })
      }
    })
  } else {
    return res.status(400).send({
      message: "Incorrect Domain Entered!"
    })
  }
}catch(err){
  res.status(500).send({
    message:"Error"
  })
}}

async function yearwiseSelectedRejected(req,res,next){
  try{
    if(req.query.choice == 'selected'){
      if(req.query.domain == 'technical'){
        var selectedDetails = await User.find({isSelectedTechnical:true,yearofstudy:req.query.year}).sort({techscore: 'desc'}).select('-password -isEmailVerified -attemptedTechnical -attemptedManagement -attemptedDesign -isAdmin -resetToken -resetExpires')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else if(req.query.domain == 'design'){
        var selectedDetails = await User.find({isSelectedDesign:true,yearofstudy:req.query.year}).sort({designscore: 'desc'}).select('-password -isEmailVerified -attemptedTechnical -attemptedManagement -attemptedDesign -isAdmin -resetToken -resetExpires')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else if(req.query.domain == 'management'){
        var selectedDetails = await User.find({isSelectedManagement:true,yearofstudy:req.query.year}).select('-password -isEmailVerified -attemptedTechnical -attemptedManagement -attemptedDesign -isAdmin -resetToken -resetExpires')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else {
        return res.status(400).send({
          message: "Incorrect Domain Entered!"
        })
      }
    }else if(req.query.choice == 'rejected'){
      if(req.query.domain == 'technical'){
        var selectedDetails = await User.find({isSelectedTechnical:false,yearofstudy:req.query.year}).sort({techscore: 'desc'}).select('-password -isEmailVerified -attemptedTechnical -attemptedManagement -attemptedDesign -isAdmin -resetToken -resetExpires')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else if(req.query.domain == 'design'){
        var selectedDetails = await User.find({isSelectedDesign:false,yearofstudy:req.query.year}).sort({designscore: 'desc'}).select('-password -isEmailVerified -attemptedTechnical -attemptedManagement -attemptedDesign -isAdmin -resetToken -resetExpires')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        } 
      } else if(req.query.domain == 'management'){
        var selectedDetails = await User.find({isSelectedManagement:false,yearofstudy:req.query.year}).select('-password -isEmailVerified -attemptedTechnical -attemptedManagement -attemptedDesign -isAdmin -resetToken -resetExpires')
        console.log(selectedDetails)
        if(selectedDetails){
          return res.status(200).send({
            details: selectedDetails
          })
        }
      } else {
        return res.status(400).send({
          message: "Incorrect Domain Entered!"
        })
      }
    }
  }
  catch{
    return res.status(500).send({
      message:"Error"
    })
  }
}

const sendQnForCorrection = async (req , res) => {
  try{
    const {regno} = req.params;
    const student = await User.findOne({regno: regno});

    if (!student) return res.status(400).send({Error: "Not Able to Find the User"});
    if (student.isAdmin) return res.status(400).send({Error: "User is not a student"});
    if (!student.isSelectedManagement) return res.status(400).send({Error: "User has not selected design domain"});
    if (!student.attemptedManagement) return res.status(400).send({Error: "User has not attempted the management test"});
    const responses = student.responseManagement.map(async (response) => {
      const question = await mQuestion.findById(response.qid);
      return {...response , questionImage: question.questionImage};
    });

    return res.status(200).send({responses});
  } catch (err) {
    res.status(500).send({err});
  }
}

const updateManagementScore = async (req , res , next) => {
  try {
    const {regno} = req.params;
    const student = await User.findOne({regno});
    const {totalMarksManagement} = req.body;

    if (!student) return res.status(400).send({Error: "Not Able to Find the User"});
    if (student.isAdmin) return res.status(400).send({Error: "User is not a student"});
    if (!student.isSelectedManagement) return res.status(400).send({Error: "User has not selected design domain"});
    if (!student.attemptedManagement) return res.status(400).send({Error: "User has not attempted the management test"});

    student.managementScore = parseInt(totalMarksManagement);

    await student.save();
    return res.status(201).send(student);
  } catch (e) {
    return res.status(500).send({e});
  }
}

// module.exports.sendQnForCorrection = async (req , res) => {
//   try{
//     const {regno} = req.params;
//     const student = await User.findOne({regno: regno});

//     if (!student) return res.status(400).send({Error: "Not Able to Find the User"});
//     if (student.isAdmin) return res.status(400).send({Error: "User is not a student"});
//     if (!student.isSelectedManagement) return res.status(400).send({Error: "User has not selected design domain"});
//     if (!student.attemptedManagement) return res.status(400).send({Error: "User has not attempted the management test"});
//     const responses = student.responseManagement.map(async (response) => {
//       const question = await mQuestion.findById(response.qid);
//       return {...response , questionImage: question.questionImage};
//     });

//     return res.status(200).send({responses});
//   } catch (err) {
//     res.status(200).send({err});
//   }
// }

// async function  getResponseFunction(req,res,next){
//   try{
//     var responses=[];
//     if(req.query.domain === 'technical'){
//       var res=await User.findOne({regno:req.query.regno}).select('responseTech')
//       .then()
//       {
//         res.forEach(x => {


          
//         });
        
//       }
      
        
      

//     }

//   }

// }

module.exports ={
    getAllDesignQuestionsFunction,
    getAllManagementQuestionsFunction,
    createTechnicalQuestionFunction,
    createDesignQuestionFunction,
    createManagementQuestionFunction,
    getAllTechnicalQuestionsFunction,
    getSpecificTechnicalQuestionFunction,
    getSpecificManagementQuestionFunction,
    getSpecificDesignQuestionFunction,
    /* getSpecificYearAndDifficultyTechnicalQuestionFunction,
    getSpecificYearAndDifficultyDesignQuestionFunction,
    getSpecificYearAndDifficultyManagementQuestionFunction, */
    updateSpecificTQuestionFunction,
    updateSpecificDQuestionFunction,
    updateSpecificMQuestionFunction,
    deleteSpecificTQuestionFunction,
    deleteSpecificMQuestionFunction,
    deleteSpecificDQuestionFunction,
    getRandomAllTechnicalQuestionsFunction,
    getRandomAllManagementQuestionsFunction,
    getRandomAllDesignQuestionsFunction,
    helloFunction,
    recruitmentsStatusFunction,
    updateStatusFunction,
    getUserDetailsAdmin,
    getSpecificUserDetailsAdmin,
    acceptAUser,
    rejectUser,
    getSelectedOrRejected,
    resetAttempt,
    yearwiseSelectedRejected,
    getResponsesOfUser,
    sendQnForCorrection,
    updateManagementScore
  }




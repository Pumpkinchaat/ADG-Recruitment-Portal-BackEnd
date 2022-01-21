const express= require("express");
const router = express.Router();
const checkAdmin = require('../middleware/checkAdmin')
const multer = require('multer');
const {storage} = require('../../cloudinaryConfig');
const upload = multer({storage});

const getmQuestion = require('../handlers/questions')
const getdQuestion = require('../handlers/questions')
const createTechnicalQuestion = require('../handlers/questions')
const createManagementQuestion = require('../handlers/questions')
const createDesignQuestion = require('../handlers/questions')
const getAllTechnicalQuestions = require('../handlers/questions')
const getSpecificTechnicalQuestion = require('../handlers/questions')
const getSpecificManagementQuestion = require('../handlers/questions')
const getSpecificDesignQuestion = require('../handlers/questions')
const updateSpecificTQuestion = require('../handlers/questions')
const updateSpecificDQuestion = require('../handlers/questions')
const updateSpecificMQuestion = require('../handlers/questions')
const deleteSpecificDQuestion = require('../handlers/questions')
const deleteSpecificMQuestion = require('../handlers/questions')
const deleteSpecificTQuestion = require('../handlers/questions')
const getYearDifficultyTQuestion = require('../handlers/questions')
const getYearDifficultyMQuestion = require('../handlers/questions')
const getYearDifficultyDQuestion = require('../handlers/questions')
const getExcelSheetResponses = require('../handlers/submission')
const checkstatus= require('../handlers/questions')
const getUserDetails = require('../handlers/questions')
const getSpecificUser = require('../handlers/questions')
const acceptAUser = require('../handlers/questions')
const rejectUser = require('../handlers/questions')
const getSelectedOrRejected = require('../handlers/questions')
const resetUser = require('../handlers/questions')
const correctManagementStudents = require('../handlers/questions');

const login = require('../handlers/admin-auth.js')

// const logout = require();
router.post('/login',login.loginAdminFunction);

//Management Questions
router.get('/management/:regno/correct-qn' , checkAdmin , correctManagementStudents.sendQnForCorrection);
router.post('/management/:regno/correct-qn' , checkAdmin , correctManagementStudents.updateManagementScore);
router.get('/management/get-all-questions',checkAdmin,getmQuestion.getAllManagementQuestionsFunction);
router.post('/management/add-question',checkAdmin, upload.single('questionImage') ,createManagementQuestion.createManagementQuestionFunction);
router.get('/management/get-specific-question/:questionId',checkAdmin,getSpecificManagementQuestion.getSpecificManagementQuestionFunction);
router.put('/management/update-question/:questionId',checkAdmin, upload.single('questionImage') ,updateSpecificMQuestion.updateSpecificMQuestionFunction)
router.delete('/management/delete-question/:questionId',checkAdmin,deleteSpecificMQuestion.deleteSpecificMQuestionFunction)
/* router.get('/management/get-specific-questions/:yearofstudy/:difficultyLevel',checkAdmin,getYearDifficultyMQuestion.getSpecificYearAndDifficultyManagementQuestionFunction) */

//Design Questions
router.get('/design/get-all-questions',checkAdmin,getdQuestion.getAllDesignQuestionsFunction)
router.post('/design/add-question',checkAdmin, upload.single('questionImage') ,createDesignQuestion.createDesignQuestionFunction)
router.get('/design/get-specific-question/:questionId',checkAdmin,getSpecificDesignQuestion.getSpecificDesignQuestionFunction)
router.put('/design/update-question/:questionId',checkAdmin, upload.single('questionImage') ,updateSpecificDQuestion.updateSpecificDQuestionFunction)
router.delete('/design/delete-question/:questionId',checkAdmin,deleteSpecificDQuestion.deleteSpecificDQuestionFunction)
/* router.get('/design/get-specific-questions/:yearofstudy/:difficultyLevel',checkAdmin,getYearDifficultyDQuestion.getSpecificYearAndDifficultyDesignQuestionFunction) */

//Technical Questions
router.post('/technical/add-question',checkAdmin, upload.single('question-upload') ,createTechnicalQuestion.createTechnicalQuestionFunction)
router.get('/technical/get-all-questions',checkAdmin,getAllTechnicalQuestions.getAllTechnicalQuestionsFunction)
router.get('/technical/get-specific-question/:questionId',checkAdmin,getSpecificTechnicalQuestion.getSpecificTechnicalQuestionFunction)
router.put('/technical/update-question/:questionId',checkAdmin, upload.single('questionImage') ,updateSpecificTQuestion.updateSpecificTQuestionFunction)
router.delete('/technical/delete-question/:questionId',checkAdmin,deleteSpecificTQuestion.deleteSpecificTQuestionFunction)
/* router.get('/technical/get-specific-questions/:yearofstudy/:difficultyLevel',checkAdmin,getYearDifficultyTQuestion.getAllTechnicalQuestionsFunction) */


//update recruitment status
router.get('/statusupdate',checkAdmin,checkstatus.updateStatusFunction);

//Get User Data in excel Sheet
router.get('/getData',checkAdmin,getExcelSheetResponses.getExcelSheetResponses)

//Get Data of all Students who attempted a particular domain
router.get('/getalldetailsuser',checkAdmin,getUserDetails.getUserDetailsAdmin)

//Get Data of a Specific Student
router.get('/getspecificuser',checkAdmin, getSpecificUser.getSpecificUserDetailsAdmin)
router.get('/getuserdata', getSpecificUser.getSpecificUserDetailsAdmin)

//accept a user
router.post('/acceptuser',checkAdmin,acceptAUser.acceptAUser);

//reject a user
router.post('/rejectuser',checkAdmin,rejectUser.rejectUser)
 

//Get Selected or Rejected People
router.get('/getresults',checkAdmin,getSelectedOrRejected.getSelectedOrRejected);

//Modify isAttempted and Responses of User
router.get('/resetattempt',checkAdmin,resetUser.resetAttempt)

//yearwise selected rejected
router.get('/results',checkAdmin,resetUser.yearwiseSelectedRejected)

//get Specific Users Responses for three domains

router.get('/getuseranswers',checkAdmin,getSpecificUser.getResponsesOfUser)


module.exports = router

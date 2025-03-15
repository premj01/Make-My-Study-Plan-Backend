const express = require('express');
const router = express.Router();
const { varifyUser } = require('../middleware/authMiddleware');
const { getPerferencesAndSendQuestions, varifyAnswersAndSendGeneratedStudyPlan, fetchStudyPlan, subTopicUpdate, dashBoardContents } = require('../controller/study_plan_creator.controller');
const { userProfile, updateUserName } = require('../controller/user_profile');
const leaderBoard = require('../controller/leaderBoard');


router.post("/get-preferences", varifyUser, getPerferencesAndSendQuestions);
router.post("/get-study-plan", varifyUser, varifyAnswersAndSendGeneratedStudyPlan);
router.post('/fetch-my-study-plan', varifyUser, fetchStudyPlan)
router.post('/update-record', varifyUser, subTopicUpdate)
router.post('/dash-board-content', varifyUser, dashBoardContents)
router.post('/profile_data', varifyUser, userProfile)
router.post('/update_profile', varifyUser, updateUserName)
router.post('/leader-board', varifyUser, leaderBoard)

module.exports = router;
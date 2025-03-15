const gemini_results = require('../utils/gemini')
const Studyplan = require('../model/studyPlan.model')


// make sure you are storing incomming data at frontend
const getPerferencesAndSendQuestions = async (req, res, next) => {

  const { language, duration, difficultyLevel, startDate, email, timecanSpentDaily } = req.body;

  if (!(language && duration && difficultyLevel && startDate && email && timecanSpentDaily)) {
    return res.status(400).json({ msg: "Bad Request what are you doint ... Every parameter is Important" });
  }

  try {

    // generating questions on custom set 
    const prompt = `
    ask a 3 AI generated one liner questions with 4 options in minumum words like MCQ where one is correct to generate customize study plan 
    topic or language is : ${language},
    difficultylevel is : ${difficultyLevel},
    duration is : ${duration} weeks ,
    
    
    questions = {
      Question : String ,
      options :Array<String>}
      
      Give me JSON object of question in perdefiend structure and structure is strictly bounded so use 
      Question and options array as it is naming .

      Return : Array<questions>
      `
    let questionObj = await gemini_results(prompt);
    questionObj = JSON.parse(questionObj.replace("```json", "").replace("```", ""))

    const dataToStore = new Studyplan({
      email: email,
      language: language,
      duration: duration,
      difficultyLevel: difficultyLevel,
      startDate: new Date(startDate),
      timecanSpentDaily: timecanSpentDaily
    })
    const savedData = await dataToStore.save();


    return res.status(200).json({
      questionObj,
      isQeustionGenerated: true,
      uuid: savedData._id
    });

  } catch (error) {
    return res.status(500).json({ msg: "Please try again. Something is happened", isQeustionGenerated: false })
  }
}

const varifyAnswersAndSendGeneratedStudyPlan = async (req, res, next) => {
  let { email, answers, uuid } = req.body;

  if (!email || !answers || !uuid) {
    return res.status(400).json({ msg: "You should provide proper key-value pais if you want to do malacious activity" })
  }
  answers = JSON.stringify(answers);

  const data = await Studyplan.findById(uuid);

  const prompt = `
    generate study plan and every asked component in accurate manner in follwind structure and return only JSON objcet 
    topic or language is : ${data.language},
    difficultylevel is : ${data.difficultyLevel},
    duration is : ${data.duration} weeks so we can divide studyplan array in days of week,
    start date : ${data.startDate}
    he can spend ${data.timecanSpentDaily} hours daily on this plan 
    we have total 100 points for entire study plan so you need to devide it in subTopics arrays so that we have addtion of all subTopics points is 100.

     also suggest some projects as he completing tasks you can add last subtopic as project and give project for that conepts and also in description how to build that project.

    i asked some questions perviously which are with his given answers
    ${answers} consider this while generating studyplan. 

    to generate study plan we will coverd points according to difficulty levels ( beginner , intermidiate and advanced ). for beginner focus on basics more and for advance focus more on advanced topics so we can cover basics fast forward in less time.
    
   

    we can consider minimum 8 main topic and maximum any number of topics

    give me json object of following format 


  subTopics = {
                topicid:Number, // like 1,2,3,4,
                subTopicId : Number, // like 1,2,3,4,
                subTopicname : "String",
                subTopicPointsWiseDescription: "String",
                isCompleted:false,
                points : "Number",
                completedAt : "Date" //add expected to complete this task 
              }


    studyPlan = 
                {
                  topicid:Number like 1,2,3,4
                  topic : "String" for example basics of java , jwt in java,
                  difficulty:"String",
                  isCompleted : "Boolean",
                  pointsToEarn : "Number",
                  earnedPoints:"Number",
                  subTopics :   Array<subTopics>                                   
                } 
                
       
    Return :  Array<studyPlanList>
  `;

  let studyPlanObj = await gemini_results(prompt);
  studyPlanObj = JSON.parse(studyPlanObj.replace("```json", "").replace("```", ""))

  const updateStatus = await Studyplan.findOneAndUpdate({ _id: uuid }, { studyPlan: studyPlanObj, isPlanGenerated: true })

  // console.log(studyPlanObj);


  return res.status(200).json({ email: email, studyPlan: studyPlanObj, id: data._id })

}


const fetchStudyPlan = async (req, res) => {
  const { uuid, email } = req.body;

  try {

    if (!uuid || !email) {
      console.log("malacious request atfetchStudyPlan");
      return res.status(400).json({ msg: "Incorrect parameter" })
    }

    const data = await Studyplan.findById(uuid);

    if (!data.isPlanGenerated) {
      return res.status(500).json({ msg: "try Again one more time" })
    }

    const { language, duration, difficultyLevel, startDate, timecanSpentDaily, currentPoints, totalPoints, studyPlan } = data;
    res.status(200).json({
      language, duration, difficultyLevel, startDate, timecanSpentDaily, currentPoints, totalPoints, studyPlan
    })
  } catch (error) {
    console.log(error);
    res.status(501).json({ msg: "Internal service problem : Database" })

  }

}













const subTopicUpdate = async (req, res) => {
  const { topicid, subTopicId, uuid, email, isCompleted, completedAt } = req.body;

  // console.log(topicid, "  ", subTopicId, " ", uuid, " ", email, " ", isCompleted, " ", completedAt);
  try {

    if (!topicid || !subTopicId || !uuid || !email || !completedAt) {
      console.log("invalid request at subTopicUpdate");
      return res.status(400).json({ msg: "bad request ... do some meaning full work" })
    }

    const updatedData = await Studyplan.updateOne(
      { _id: uuid, "studyPlan.topicid": topicid, "studyPlan.subTopics.subTopicId": subTopicId },
      {
        $set: {
          "studyPlan.$[topic].subTopics.$[subTopic].isCompleted": isCompleted,
          "studyPlan.$[topic].subTopics.$[subTopic].completedAt": completedAt
        }
      },
      {
        arrayFilters: [
          { "topic.topicid": topicid },
          { "subTopic.subTopicId": subTopicId },
        ]
      }
    );

    if (updatedData.modifiedCount > 0) {
      const updatedDocument = await Studyplan.findOne({ _id: uuid });

      if (updatedDocument) {
        const topic = updatedDocument.studyPlan.find((t) => t.topicid === topicid)
        const subtopic = topic.subTopics.find((t) => t.subTopicId === subTopicId)

        if (topic && subtopic) {
          if (isCompleted) {
            topic.earnedPoints += subtopic.points;
          } else {
            topic.earnedPoints -= subtopic.points;
          }
          const currentPoints = updatedDocument.studyPlan.reduce((sum, t) => sum + t.earnedPoints, 0);

          const pointsUpdated = await Studyplan.updateOne(
            { _id: uuid },
            {
              $set: {
                "studyPlan.$[topic].earnedPoints": topic.earnedPoints,
                currentPoints: currentPoints
              }
            },
            {
              arrayFilters: [
                { "topic.topicid": topicid }
              ]
            }
          )
          if (pointsUpdated.modifiedCount === 0) {
            console.error("Failed to update points in Studyplan");
            return res.status(500).json({ msg: "Failed to update points" });
          }

        }

      }

      console.log("SubTopic updated successfully!");
      res.status(200).json({ msg: "SubTopic and points updated successfully!" });
    }

  } catch (error) {
    console.error("Error updating subTopic:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}








//     id: "2",
//     topicName: "Node.js Basics",
//     topicProgress: 45,
//     topicDuration: 20,
//     topicDifficulty: "Beginner",
//     topicEndDate: "2024-05-15",
//     lastUpdated: "2024-03-14",
//     totalLessons: 20,
//     completedLessons: 9,

const dashBoardContents = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.log("malacious request at dashBoardContents");
    return res.status(400).json("Malacious request");
  }

  try {
    const data = await Studyplan.find({ email: email, isPlanGenerated: true });
    const filteredArray = data.map(obj => {
      return {
        id: obj._id,
        topicName: obj.language,
        topicProgress: obj.currentPoints,
        topicDuration: obj.duration,
        topicDifficulty: obj.difficultyLevel,
        topicEndDate: obj.startDate,
        lastUpdated: obj.updatedAt,
      }
    }
    );
    filteredArray.reverse()

    return res.status(200).json({ topicListContent: filteredArray })

  } catch (error) {
    console.log("content not fetched at dashBoardContents");
    return res.status(500).json({ msg: 'internal server error' });
  }
}


module.exports = { getPerferencesAndSendQuestions, varifyAnswersAndSendGeneratedStudyPlan, fetchStudyPlan, subTopicUpdate, dashBoardContents }
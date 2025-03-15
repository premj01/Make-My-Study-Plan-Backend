const { GoogleGenerativeAI } = require("@google/generative-ai");
const { gemini_api_key } = require('../config/config');

const gemini_results = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(gemini_api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    throw new Error('Error: ' + error);
  }
};

module.exports = gemini_results



// const mde = async () => {
//   const prompt = `
//     generate study plan and every asked component in accurate manner in follwind structure and return only JSON objcet 
//     topic or language is : ${'java'},
//     difficultylevel is : ${'Beginner'},
//     duration is : ${10} weeks so we can divide studyplan array in days of week,
//     start date : ${new Date()}
//     he can spend ${2} hours daily on this plan 
//     we have total 100 points for entire study plan so you need to devide it in subTopics arrays so that we have addtion of all subTopics points is 100

//     to generate study plan we will coverd points according to difficulty levels ( beginner , intermidiate and advanced ). for beginner focus on basics more and for advance focus more on advanced topics so we can cover basics fast forward in less time.
    
//     also suggest some projects as he completing tasks you can add last subtopic as project and give project for that conepts and also in description how to build that project.

//     give me json object of following format 


//   subTopics = {
//                 subTopicname : "String",
//                 subTopicPointsWiseDescription: "String",
//                 isCompleted:false,
//                 points : "Number",
//                 completedAt : "Date" //add expected to complete this task 
//               }


//     studyPlan = 
//                 {
//                   topic : "String" for example basics of java , jwt in java,
//                   difficulty:"String",
//                   isCompleted : "Boolean",
//                   pointsToEarn : "Number",
//                   earnedPoints:"Number",
//                   subTopics :   Array<subTopics>                                   
//                 } 
                
       
//     Return :  Array<studyPlanList>
  
//   `
//   let text = await gemini_results(prompt);
//   // text = JSON.parse(text.replace("```json", "").replace("```", ""))
//   console.log(text);

// }
// mde()


// const mde = async () => {
//   const prompt = `
//     ask a 3 AI generated one liner questions with 4 options in minumum words like MCQ where one is correct to generate customize study plan 
//     topic or language is : java,
//     difficultylevel is : Advance,
//     duration is : 10 weeks ,
    
    
//     questions = {
//       Question : String ,
//       option :Array<String>}
      
//     Give me JSON object of question in perdefiend structure

//     Return : Array<questions>
  
//   `
//   let text = await gemini_results(prompt);
//   text = JSON.parse(text.replace("```json", "").replace("```", ""))
//   console.log(text);

// }
// mde()


// `List a few popular cookie recipes using this JSON schema:

//     Recipe = {'recipeName': string}
//     Return: Array<Recipe>`



// studyPlan = 
  // {
  //   topic : "String",
  //   difficulty:"String",
  //   isCompleted : "Boolean",
  //   pointsToEarn : "Number",
  //   earnedPoints:"Number",
  //   subTopics : [
  //     {
  //       subTopicname : "String",
  //       isCompleted:"Boolean",
  //       points : "Number",
  //       completedAt : "Date"
  //     }
  //   ]
  // },{
  //   topic : "String",
  //   difficulty:"String",
  //   isCompleted : "Boolean",
  //   pointsToEarn : "Number",
  //   earnedPoints:"Number",
  //   subTopics : [
  //     {
  //       subTopicname : "String",
  //       isCompleted:"Boolean",
  //       points : "Number",
  //       completedAt : "Date"
  //     }
  //   ]
  // }



const mongoose = require('mongoose');


const subTopicSchema = new mongoose.Schema({
  topicid: { type: Number },
  subTopicId: { type: Number },
  subTopicname: { type: String, required: true },
  subTopicPointsWiseDescription: { type: String },
  isCompleted: { type: Boolean, default: false },
  points: { type: Number, required: true },
  completedAt: { type: Date },
});

const PlanStructureSchema = new mongoose.Schema({
  topicid: { type: Number },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  isCompleted: { type: Boolean, default: false },
  pointsToEarn: { type: Number, required: true },
  earnedPoints: { type: Number, default: 0 },
  subTopics: { type: [subTopicSchema], default: [] },
});

const studyPlanSchema = new mongoose.Schema({
  email: { type: String, required: true },
  language: { type: String, required: true },
  duration: { type: Number, required: true },
  difficultyLevel: { type: String, required: true },
  startDate: { type: Date, required: true },
  timecanSpentDaily: { type: Number, default: 1 },
  studyPlan: { type: [PlanStructureSchema], default: [] },
  currentPoints: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 100 },
  globalRank: { type: Number, default: 0 },
  remainingDuration: { type: Number },
  isPlanGenerated: { type: Boolean, default: false }
}, {
  timestamps: true,
});

const Studyplan = mongoose.model('Studyplan', studyPlanSchema);

module.exports = Studyplan;


// [
//   {
//     topic : "String",
//     difficulty:"String",
//     isCompleted : "Boolean",
//     pointsToEarn : "Number",
//     earnedPoints:"Number",
//     subTopics : [
//       {
//         subTopicname : "String",
//         isCompleted:"Boolean",
//         points : "Number",
//         completedAt : "Date"
//       }
//     ]
//   },{
//     topic : "String",
//     difficulty:"String",
//     isCompleted : "Boolean",
//     pointsToEarn : "Number",
//     earnedPoints:"Number",
//     subTopics : [
//       {
//         subTopicname : "String",
//         isCompleted:"Boolean",
//         points : "Number",
//         completedAt : "Date"
//       }
//     ]
//   },...
// ]
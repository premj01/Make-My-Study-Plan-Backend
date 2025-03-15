const Studyplan = require("../model/studyPlan.model");
const { userModel } = require("../model/user.model");

const userProfile = async (req, res) => {

  const { email } = req.body;

  if (!email) {
    console.log("error : parameter not present in UserProfile request");
    return res.status(400).json({ msg: "Wrong Attempt without proper info" })
  }

  try {
    const studyPlansList = await Studyplan.find({ email: email, isPlanGenerated: true })

    const usersTotalPoints = studyPlansList.reduce((add, t) => add + t.currentPoints, 0)
    const totalPoints = studyPlansList.reduce((add, t) => add + t.totalPoints, 0)

    const updateUserRecords = await userModel.findOneAndUpdate(
      { mail: email },
      {
        $set: {
          userpoints: usersTotalPoints
        }
      },
      {
        new: true,
        upsert: false
      }
    );


    res.status(200).json({
      email: updateUserRecords.mail,
      userName: updateUserRecords.userName,
      userpoints: updateUserRecords.userpoints,
      userRank: updateUserRecords.userRank,
      createdAt: updateUserRecords.createdAt,
      updatedAt: updateUserRecords.updatedAt,
      TotalStudyPlans: studyPlansList.length,

    });

  } catch (error) {
    console.log(error);
    console.log("Error of user profile");

    res.status(200).json({ count: studyPlansList.length, studyPlansList });
  }

}


const updateUserName = async (req, res) => {

  const { email, userName, TotalStudyPlans } = req.body;

  if (!email || !userName || !TotalStudyPlans) {
    console.log("error : parameter not present in Update UserProfile request");
    return res.status(400).json({ msg: "Wrong Attempt without proper info" })
  }

  try {

    const updateUserRecords = await userModel.findOneAndUpdate(
      { mail: email },
      {
        $set: {
          userName: userName
        }
      },
      {
        new: true,
        upsert: false
      }
    );

    res.status(200).json({
      email: updateUserRecords.mail,
      userName: updateUserRecords.userName,
      userpoints: updateUserRecords.userpoints,
      userRank: updateUserRecords.userRank,
      createdAt: updateUserRecords.createdAt,
      updatedAt: updateUserRecords.updatedAt,
      TotalStudyPlans: TotalStudyPlans,

    });

  } catch (error) {
    console.log(error);
    console.log("Error of user profile");
    res.status(200).json({ count: studyPlansList.length, studyPlansList });
  }
}

module.exports = { userProfile, updateUserName };
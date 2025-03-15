const { userModel } = require("../model/user.model");

const leaderBoard = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const allUsers = await userModel.find({}).lean();

    const sortedUsers = allUsers
      .sort((a, b) => b.userpoints - a.userpoints)
      .map((user, index) => ({
        userName: user.userName,
        userpoints: user.userpoints,
        mail: user.mail,
        rank: index + 1
      }));

    const filteredUsers = sortedUsers.filter(
      user => user.userpoints > 0 || user.mail === userEmail
    );

    const userRank = filteredUsers.findIndex(user => user.mail === userEmail) + 1;

    let leaderboardData;
    if (userRank > 0 && userRank <= 11) {
      leaderboardData = filteredUsers.slice(0, 11);
    } else {
      leaderboardData = [...filteredUsers.slice(0, 10)];
      if (userRank > 0) {
        const userRecord = filteredUsers[userRank - 1];
        leaderboardData.push({
          userName: userRecord.userName,
          userpoints: userRecord.userpoints,
          rank: userRank
        });
      }
    }

    if (userRank > 0) {
      await userModel.updateOne(
        { mail: userEmail },
        { $set: { userRank: userRank } }
      );
    }

    const finalLeaderboard = leaderboardData.map(({ mail, ...rest }) => rest);

    return res.status(200).json({
      msg: "Leaderboard loaded successfully",
      leaderboard: finalLeaderboard,
      userRank: userRank > 0 ? userRank : "Not ranked"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "An error occurred while generating the leaderboard"
    });
  }
};

module.exports = leaderBoard;

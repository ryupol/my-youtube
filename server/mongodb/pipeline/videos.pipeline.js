export default [
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $unwind: "$user",
  },
  {
    $lookup: {
      from: "popularities",
      localField: "_id",
      foreignField: "video_id",
      as: "popular",
    },
  },
  {
    $unwind: "$popular",
  },
  {
    $addFields: {
      user_name: "$user.name",
      user_profile_url: "$user.profile_url",
      views: "$popular.views",
      likes: "$popular.likes",
      dislikes: "$popular.dislikes",
    },
  },
  {
    $project: {
      user: 0,
      popular: 0,
    },
  },
]
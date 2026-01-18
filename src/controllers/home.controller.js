import HomeStat from "../models/HomeStat.js";

export const getStats = async (req, res) =>
  res.json(await HomeStat.find());

export const updateStats = async (req, res) => {
  await HomeStat.deleteMany();
  await HomeStat.insertMany(req.body);
  res.json({ success: true });
};

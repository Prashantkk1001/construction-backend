import About from "../models/About.js";

/* ===============================
   GET ABOUT (ADMIN & PUBLIC)
================================ */
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch about data" });
  }
};

/* ===============================
   CREATE / UPDATE ABOUT (ADMIN)
   - Single document only
================================ */
export const saveAbout = async (req, res) => {
  try {
    const existing = await About.findOne();

    if (existing) {
      const updated = await About.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const created = await About.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Failed to save about data" });
  }
};

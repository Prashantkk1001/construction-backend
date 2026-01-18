import express from "express";
import About from "../../models/About.js";

const router = express.Router();

/* ================= GET ABOUT ================= */
router.get("/", async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch about data" });
  }
});

/* ================= UPDATE ABOUT (FIXED) ================= */
router.put("/", async (req, res) => {
  try {
    const existing = await About.findOne();

    const updatedData = {
      constructionInfo: {
        ...existing?.constructionInfo?.toObject(),
        ...req.body.constructionInfo,
      },
      ownerInfo: {
        ...existing?.ownerInfo?.toObject(),
        ...req.body.ownerInfo, // ✅ OWNER IMAGE PRESERVED
      },
      projectInfo: {
        ...existing?.projectInfo?.toObject(),
        ...req.body.projectInfo,
      },
    };

    const updated = await About.findOneAndUpdate(
      {},
      updatedData,
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update about data" });
  }
});

export default router;

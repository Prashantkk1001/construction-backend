import ServiceImage from "../models/ServiceImage.js";

/**
 * 🔓 PUBLIC – User साठी (फक्त पाहण्यासाठी)
 */
export const getServiceImages = async (req, res) => {
  try {
    const images = await ServiceImage.findOne();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Service images fetch error" });
  }
};

/**
 * 🔒 ADMIN – Images create / update
 */
export const updateServiceImages = async (req, res) => {
  try {
    const data = req.body;

    const images = await ServiceImage.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Service images update error" });
  }
};

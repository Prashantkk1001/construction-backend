import Contact from "../models/Contact.js";


/* ===============================
   GET CONTACT (ADMIN & PUBLIC)
================================ */
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact data" });
  }
};

/* ===============================
   CREATE / UPDATE CONTACT (ADMIN)
   - Single document only
================================ */
export const saveContact = async (req, res) => {
  try {
    const existing = await Contact.findOne();

    if (existing) {
      const updated = await Contact.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const created = await Contact.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Failed to save contact data" });
  }
};

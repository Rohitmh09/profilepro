// dataRoutes.js
import express from "express";
import pool from "./db.js"; // Ensure you have the correct path to your db.js
import multer from "multer";
import logger from "./logFile/logger.js";

const router = express.Router();

// Configure multer for image uploads
let imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

let upload = multer({ storage: imgconfig }); //Multer is configured with a diskStorage option to determine where to store the uploaded files (./uploads directory) and how to name them.

// Route to save contact data
router.post("/saveData", upload.single("image"), async (req, res) => {
  try {
    // Extract the logged-in user's email from the request
    const userEmail = req.email; // Assuming this is being passed via middleware after verification

    // Fetch the user ID from the login table based on email
    const userQuery = "SELECT id FROM login WHERE email = ?";
    const [rows] = await pool.query(userQuery, [userEmail]);

    if (!Array.isArray(rows) || rows.length === 0) {
      logger.warn("User not found: " ,userEmail);
      return res.status(404).json({ Error: "User not found" });
    }

    const userId = rows[0].id;

    // Extract contact data from request body
    const { name, phone, email, address, designation, oldEmail } = req.body; // we cant access the image from req.body need to use req.file
    const image = req.file ? `/uploads/${req.file.filename}` : null; ///uploads is not an API; it's a path where the uploaded files are stored on the server.

    // Check if the email already exists for the user (excluding the current contact being updated)
    const checkEmailQuery = `SELECT * FROM contacts WHERE email = ? AND user_id = ? AND email != ?`;
    const [existingContact] = await pool.query(checkEmailQuery, [
      email,
      userId,
      oldEmail || "",
    ]);

    if (existingContact.length > 0) {
      logger.warn(`Email already exists in contacts: ${email}`);
      return res
        .status(400)
        .json({ Error: "Email already exists in your contacts" });
    }

    if (oldEmail) {
      // Update existing contact
      if (image != null) {
        const updateQuery = "CALL updateContact(?, ?, ?, ?, ?, ?, ?, ?)";

        await pool.query(updateQuery, [
          name,
          phone,
          email,
          address,
          designation,
          image,
          oldEmail,
          userId,
        ]);
        logger.info(`Contact updated with image: ${email}`);
      } else {
        const updateQuery = "CALL NoimgUpdate(?, ?, ?, ?, ?, ?, ?)";

        await pool.query(updateQuery, [
          name,
          phone,
          email,
          address,
          designation,
          oldEmail,
          userId,
        ]);
        logger.info(`Contact updated without image: ${email}`);
      }

      return res
        .status(200)
        .json({ Status: "Success", Message: "Contact updated successfully" });
    } else {
      // Insert new contact
      const insertQuery = "CALL insertContacts(?, ?, ?, ?, ?, ?, ?)";

      await pool.query(insertQuery, [
        userId,
        name,
        email,
        phone,
        address,
        designation,
        image,
      ]);
      logger.info(`New Contact Added: ${email}`);
      return res
        .status(200)
        .json({ Status: "Success", Message: "Contact saved successfully" });
    }
  } catch (err) {
    logger.error(`Error saving or updating contact data: ${err.message}`);
    return res
      .status(500)
      .json({
        Error: "Error saving or updating contact data",
        Details: err.message,
      });
  }
});

// dataRoutes.js
router.get("/fetchData", async (req, res) => {
  try {
    const userEmail = req.email; // Extract the logged-in user's email

    const query = "CALL fetchContacts(?)";

    const [contacts] = await pool.query(query, [userEmail]);
    

    if (contacts.length === 0) {
      logger.warn(`No contacts found for user: ${userEmail}`);
      return res.status(404).json({ Error: "No contacts found" });
    }
    logger.info(`Contacts fetched for user: ${userEmail}`);
    return res.status(200).json(contacts);
  } catch (err) {
    logger.error(`Error fetching contact data: ${err.message}`);
    return res
      .status(500)
      .json({ Error: "Error fetching contact data", Details: err.message });
  }
});

// code for delete Contact from database
router.delete("/deleteContact", async (req, res) => {
  try {
    const { contact_id } = req.body;
    const deleteQuery = "CALL deleteContact(?)";

    const [result] = await pool.query(deleteQuery, contact_id);

    if (result.affectedRows === 0) {
      logger.warn(`Contact not found for ID: ${contact_id}`);
      return res.status(404).json({ Error: "Contact not found" });
    }
    logger.info(`Contact deleted with ID: ${contact_id}`);
    return res
      .status(200)
      .json({ Status: "Success", Message: "Contact deleted successfully" });
  } catch (err) {
    logger.error(`Error deleting contacts: ${err.message}`);
    return res
      .status(500)
      .json({ Error: "Error deleting contact", Details: err.message });
  }
});

export default router;

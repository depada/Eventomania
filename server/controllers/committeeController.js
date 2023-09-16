import { validationResult } from "express-validator";
import Committee from "../models/Committee.js";

//@desc     create a new committee
//@route    POST /committee/addCommittee
//@access   private {admin}
export const addCommittee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    const newCommittee = new Committee({ name, description });
    const savedCommittee = await newCommittee.save();
    res.status(201).json(savedCommittee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get list of committees
//@route    GET /committee/getCommittees
//@access   public
export const getCommittees = async (req, res) => {
  console.log("getCommitte called"); // Log a message to confirm that the function is called.

  try {
    const committees =
      // console.log("committees==>", committees); // Log the committees to the console.
      await Committee.find(); // Attempt to find and retrieve committees from the database.

    res.status(200).json(committees); // Respond with a JSON containing the committees.
  } catch (error) {
    // Handle errors if any occur.
    res.status(500).json({ error: error.message }); // Respond with an error message.
    console.log("Error while fetching committees:", error); // Log the error for debugging.
  }
};

//@desc     delete a committee
//@route    POST /committee/deleteCommittee
//@access   private {admin}
export const deleteCommittee = async (req, res) => {
  try {
    const { committeeId } = req.body;
    const deletedCommittee = await Committee.deleteOne({ _id: committeeId });
    if (deletedCommittee) {
      res.status(201).json({ msg: "Deleted Successfully" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

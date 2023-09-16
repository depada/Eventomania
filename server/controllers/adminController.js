import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import Admin from "../models/Admin.js";
import Committee from "../models/Committee.js";
import generateToken from "../utils/generateToken.js";
import { adminData, committeeData, hashedPassword } from "../dummyData.js";

//@desc     login user
//@route    POST /admin/login
//@access   Public
export const verifyAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lcEmail = email.toLowerCase();

    const admin = adminData.find((eventItem) => eventItem.email === lcEmail);
    generateToken(res, admin._id);
    //  await Admin.findOne({ email: lcEmail });
    if (!admin) return res.status(400).json({ msg: "Invalid Credentials. " });

    const isMatch = admin.password === hashedPassword;
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials. " });

    // Return a success response without generating a token
    res.status(201).json({ user: admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//@desc     logout user
//@route    POST /admin/logout
//@access   Public
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//@desc     add a new convenor
//@route    POST /admin/addConvenor
//@access   private {admin}
export const addConvenor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, committeeId, committeeName, role, mobile } =
      req.body;
    const lcEmail = email.toLowerCase();

    // Check if the email already exists in the dummy data
    const existingUser = adminData.find((admin) => admin.email === lcEmail);

    if (existingUser) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      // Hash the password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      // Check if a convenor with the same committeeId exists in the dummy data
      const existingConvenor = adminData.find(
        (user) => user.committeeId === committeeId
      );

      if (existingConvenor) {
        // Update the existing convenor
        const updatedConvenor = {
          ...existingConvenor,
          email: lcEmail,
          password: passwordHash,
          name,
          role,
          mobile,
        };

        // Find and update the committee in the dummy data
        const updatedCommittee = committeeData.find(
          (committee) => committee._id === committeeId
        );
        updatedCommittee.convenorName = name;
        updatedCommittee.convenorId = updatedConvenor._id;

        res.status(201).json({ updatedConvenor, updatedCommittee });
      } else {
        // Create a new convenor
        const newConvenor = {
          _id: `convenor${Date.now()}`, // Generate a unique _id
          email: lcEmail,
          password: passwordHash,
          name,
          role,
          committeeName,
          committeeId,
          mobile,
        };

        adminData.push(newConvenor);

        // Find and update the committee in the dummy data
        const updatedCommittee = committeeData.find(
          (committee) => committee._id === committeeId
        );
        updatedCommittee.convenorName = name;
        updatedCommittee.convenorId = newConvenor._id;

        res.status(201).json({ savedConvenor: newConvenor, updatedCommittee });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// catch (err) {
//   res.status(500).json({ error: err.message });
// }
// };

//@desc     get list of convenors
//@route    GET /admin/convenors
//@access   private {admin}
export const getConvenors = async (req, res) => {
  try {
    // const convenors =
    // await Admin.find({ role: "convenor" }).select(
    //   "-password"
    // );
    const convenors = adminData.filter((admin) => admin.role === "convenor");
    res.status(200).json(convenors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     delete a  convenor
//@route    POST /admin/deleteConvenor
//@access   private {admin}
export const deleteConvenor = async (req, res) => {
  try {
    const { convenorId, committeeId } = req.body;
    const deletedConvenor = await Admin.deleteOne({ _id: convenorId });
    if (deletedConvenor) {
      const filter = { _id: committeeId };
      const update = { convenorName: "-", convenorId: "-" };
      const updatedCommittee = await Committee.findOneAndUpdate(
        filter,
        update,
        { new: true }
      );
      res.status(201).json({ msg: "Deleted Successfully" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, msg: error.message });
  }
};

//@desc     add a new member
//@route    POST /admin/addMember
//@access   private {admin,convenor}
export const addMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      memberName,
      memberEmail,
      memberPassword,
      committeeId,
      committeeName,
      role,
      mobile,
    } = req.body;
    const lcEmail = memberEmail.toLowerCase();

    // Check if the email already exists in the dummy data
    const existingUser = adminData.find((admin) => admin.email === lcEmail);
    console.log("existingUsrerrf==>", existingUser);

    if (existingUser) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      // Hash the password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(memberPassword, salt);

      // Create a new member
      const newMember = {
        _id: `member${Date.now()}`, // Generate a unique _id
        email: lcEmail,
        password: passwordHash,
        name: memberName,
        role,
        committeeName,
        committeeId,
        mobile,
      };

      adminData.push(newMember);

      res.status(201).json({ savedMember: newMember });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//@desc     get list of members
//@route    GET /admin/members
//@access   private {admin}
export const getMembers = async (req, res) => {
  try {
    const members = adminData.filter((admin) => admin.role === "member");
    // await Admin.find({ role: "member" }).select("-password");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     delete a  member
//@route    POST /admin/deleteMember
//@access   private {admin,convenor}
export const deleteMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const deletedMember = await Admin.deleteOne({ _id: memberId });
    if (deletedMember) {
      res.status(201).json({ msg: "Deleted Successfully" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get list of members of a particular committee
//@route    POST /admin/committeeMembers
//@access   private {convenor, member}
export const getCommitteeMembers = async (req, res) => {
  try {
    const { committeeId } = req.body;
    const filter = { committeeId: committeeId };
    const committeeMembers = await Admin.find(filter).select("-password");
    if (committeeMembers.length === 0) {
      return res.status(404).json({
        message: "No committee members found for the given committee ID",
      });
    }
    res.status(200).json(committeeMembers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

//@desc     changed password
//@route    POST /admin/changePassword
//@access   private {admin, convenor, member}
export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { currentPassword, newPassword, cNewPassword, userId } = req.body;

    // Find the user by userId in the dummy data
    const user = adminData.find((admin) => admin._id === userId);
    console.log("userChnagePass==>", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = user.password === currentPassword;
    if (!isMatch) {
      return res.status(400).json({ msg: "Current Password is Not Valid!" });
    }

    if (newPassword !== cNewPassword) {
      return res.status(400).json({ msg: "New Passwords do not match!" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update the password in the dummy data
    user.password = passwordHash;

    res.status(201).json({ msg: "Password Changed Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

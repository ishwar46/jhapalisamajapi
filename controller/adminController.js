const User = require("../models/User");

/**
 * Promote or demote a user to admin.
 * POST /api/admin/promote
 */
exports.promoteUser = async (req, res) => {
    try {
        const { userIdToPromote, makeAdmin } = req.body;

        if (!userIdToPromote) {
            return res.status(400).json({ error: 'userIdToPromote is required.' });
        }

        const user = await User.findById(userIdToPromote);
        if (!user) {
            return res.status(404).json({ error: 'User to promote not found.' });
        }

        // Decide role based on makeAdmin
        user.role = makeAdmin ? 'admin' : 'user';
        await user.save();

        return res.status(200).json({
            message: `User ${makeAdmin ? 'promoted to admin' : 'demoted to user'}.`,
            user: {
                _id: user._id,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('PromoteUser Error:', error);
        return res.status(500).json({ error: 'Server error promoting user.' });
    }
};

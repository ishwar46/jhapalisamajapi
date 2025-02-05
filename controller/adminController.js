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

/**
 * Verify a user (approve or set status to something else)
 * PATCH /api/admin/verify-user
 *
 */
exports.verifyUser = async (req, res) => {
    try {
        const { userId, newStatus, membershipPaid, setExpiryInDays } = req.body;

        if (!userId || !newStatus) {
            return res.status(400).json({
                error: 'userId and newStatus fields are required.',
            });
        }

        // Allowed statuses might be: "active", "suspended", "rejected"
        const ALLOWED_STATUSES = ['active', 'suspended', 'rejected', 'deactivated'];
        if (!ALLOWED_STATUSES.includes(newStatus)) {
            return res.status(400).json({ error: 'Invalid status.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Update status
        user.accountStatus = newStatus;

        // If membershipPaid is provided, update
        if (typeof membershipPaid !== 'undefined') {
            user.membershipPaid = !!membershipPaid;
            if (user.membershipPaid) {
                user.membershipPaidAt = new Date();
            }
        }

        // If setExpiryInDays is provided, set accountExpiry
        if (setExpiryInDays) {
            // e.g., 1 year from now
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + setExpiryInDays);
            user.accountExpiry = expiryDate;
        }

        await user.save();

        return res.status(200).json({
            message: 'User status updated successfully.',
            user: {
                _id: user._id,
                username: user.username,
                accountStatus: user.accountStatus,
                accountExpiry: user.accountExpiry,
                membershipPaid: user.membershipPaid,
            },
        });
    } catch (error) {
        console.error('VerifyUser Error:', error);
        return res.status(500).json({
            error: 'Server error while updating user status.',
        });
    }
};

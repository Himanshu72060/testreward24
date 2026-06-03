const Leaderboard =
    require(
        "../models/Leaderboard"
    );

// ================= CREATE =================

exports.createLeaderboard =
    async (req, res) => {

        try {

            const leaderboard =
                await Leaderboard.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                data: leaderboard

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// ================= GET ALL =================

exports.getLeaderboards =
    async (req, res) => {

        try {

            const leaderboards =
                await Leaderboard.find()

                    .populate(
                        "category"
                    )

                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                data: leaderboards

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// ================= GET BY CATEGORY =================

exports.getLeaderboardByCategory =
    async (req, res) => {

        try {

            const data =
                await Leaderboard.find({

                    category:
                        req.params.categoryId

                })

                    .populate(
                        "category"
                    )

                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                data

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// ================= GET SINGLE =================

exports.getSingleLeaderboard =
    async (req, res) => {

        try {

            const leaderboard =
                await Leaderboard.findById(
                    req.params.id
                )

                    .populate(
                        "category"
                    );

            res.status(200).json({

                success: true,

                data: leaderboard

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// ================= UPDATE =================

exports.updateLeaderboard =
    async (req, res) => {

        try {

            const leaderboard =
                await Leaderboard.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({

                success: true,

                data: leaderboard

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// ================= DELETE =================

exports.deleteLeaderboard =
    async (req, res) => {

        try {

            await Leaderboard.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message:
                    "Leaderboard Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
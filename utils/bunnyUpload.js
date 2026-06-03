// // utils/bunnyUpload.js

// const axios = require("axios");

// // ================= BUNNY UPLOAD FUNCTION =================

// const uploadToBunny = async (
//     fileBuffer,
//     fileName
// ) => {

//     try {

//         // STORAGE ZONE NAME
//         const storageZone =
//             process.env.BUNNY_STORAGE_ZONE;

//         // ACCESS KEY
//         const accessKey =
//             process.env.BUNNY_ACCESS_KEY;

//         // PULL ZONE URL
//         // const pullZone =
//             // process.env.BUNNY_PULL_ZONE;

//         // FILE UPLOAD URL
//         const uploadUrl =
//             `https://storage.bunnycdn.com/${storageZone}/${fileName}`;

//         // UPLOAD FILE TO BUNNY.NET
//         await axios.put(
//             uploadUrl,
//             fileBuffer,
//             {
//                 headers: {
//                     AccessKey:
//                         accessKey,
//                     "Content-Type":
//                         "application/octet-stream"
//                 },

//                 maxContentLength:
//                     Infinity,

//                 maxBodyLength:
//                     Infinity
//             }
//         );

//         // RETURN FILE URL
//         return `${pullZone}/${fileName}`;

//     } catch (error) {

//         console.log(
//             "Bunny Upload Error =>",
//             error.message
//         );

//         throw new Error(
//             "File upload failed"
//         );

//     }

// };

// module.exports =
//     uploadToBunny;

const axios =
    require("axios");

const uploadToBunny =
    async (
        file,
        folder = "uploads"
    ) => {

        try {

            const fileName =

                Date.now() +
                "-" +
                file.originalname;

            let baseUrl =
                "https://storage.bunnycdn.com";

            // REGION

            if (

                process.env.BUNNY_REGION &&

                process.env.BUNNY_REGION !== "de"

            ) {

                baseUrl =

                    `https://${process.env.BUNNY_REGION}.storage.bunnycdn.com`;

            }

            // STORAGE URL

            const storageUrl =

                `${baseUrl}/${process.env.BUNNY_STORAGE_ZONE}/${folder}/${fileName}`;

            // UPLOAD

            const response =
                await axios.put(

                    storageUrl,

                    file.buffer,

                    {

                        headers: {

                            accesskey:

                                process.env.BUNNY_ACCESS_KEY.trim(),

                            "Content-Type":
                                file.mimetype,

                            Accept:
                                "application/json",

                        },

                        maxBodyLength:
                            Infinity,

                    }

                );

            // CHECK RESPONSE

            if (

                response.status !== 200 &&

                response.status !== 201

            ) {

                throw new Error(

                    `Bunny upload failed`

                );

            }

            // RETURN CDN URL

            return (

                `${process.env.BUNNY_CDN}/${folder}/${fileName}`

            );

        } catch (error) {

            console.log(error);

            throw new Error(

                "Bunny Upload Failed"

            );

        }

    };

module.exports =
    uploadToBunny;
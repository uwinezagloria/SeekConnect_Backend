//update a photo
export const updatePhoto = asyncWrapper(async (req, res, next) => {
    //check if one want to update a photo
    if (req.file) {
        const result = cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                return res.status(500).json({ message: "there is error in updating photo !try again" })
            }
        })
        Photo.public_id = result.public_id
        Photo.url = result.url
        Photo.asset_id = result.asset_id
    }
    next()
})
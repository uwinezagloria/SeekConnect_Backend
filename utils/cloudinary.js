import { v2 as cloudinary} from "cloudinary"
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'daiihmgov',
    api_key: process.env.CLOUD_KEY || 314656112536513,
    api_secret: process.env.CLOUD_SECRET || 'eWFYuxTUHUwZ7QSkz1cRyuzPoCw'
  });
export default cloudinary
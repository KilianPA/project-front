// import something here
import cloudinary from 'cloudinary'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.prototype.$cloudinary = cloudinary.config({
    cloud_name: process.env.name,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  })
}

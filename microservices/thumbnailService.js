const cote = require('cote');
const Jimp = require('jimp');
const path = require('path');

// declare microservice
const responder = new cote.Responder({ name: 'Thumbnail generator responder' });

// microservice logic
responder.on('Thumbnail creation', async (req, done) => {
  const splitImgPath = req.img.split('/');
  const fileName = splitImgPath[splitImgPath.length - 1];

  const imagesFolder = path.join(req.img, '../');

  const image = await Jimp.read(req.img);
  image.resize(100, Jimp.AUTO);
  image.write(path.join(imagesFolder, `thumbnails/100x100-${fileName}`));

  // const result = `thumbnails/100x100-${fileName}`;

  // done(result);
});

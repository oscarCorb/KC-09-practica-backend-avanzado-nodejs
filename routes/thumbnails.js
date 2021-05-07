const cote = require('cote');

const requester = new cote.Requester({ name: 'Thumbnail generator requester' });

module.exports = (imageURL) => {
  const request = {
    type: 'Thumbnail creation',
    img: imageURL,
  };

  requester.send(request, (err, res) => {
    if (err) {
      console.log('---> ha habido un error -->', err);
      return;
    }
    console.log('---> ha ido bien --> ', res);
  });
};

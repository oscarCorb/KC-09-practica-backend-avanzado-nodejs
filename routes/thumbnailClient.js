const cote = require('cote');

const requester = new cote.Requester({ name: 'Thumbnail generator requester' });

module.exports = (imageURL) => {
  const request = {
    type: 'Thumbnail creation',
    img: imageURL,
  };

  requester.send(request, (err, res) => {
    console.log(res);
  });
};

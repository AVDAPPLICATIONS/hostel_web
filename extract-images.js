const https = require('https');

https.get('https://www.avdvvn.org/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src="([^">]+)"/g);
    if (matches) {
      matches.forEach(match => {
        const src = match.match(/src="([^">]+)"/)[1];
        console.log(src);
      });
    } else {
      console.log('No images found');
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

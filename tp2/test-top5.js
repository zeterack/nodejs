import http from 'http';

console.log('Testing /api/v1/tours/top-5-cheap route...');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/v1/tours/top-5-cheap',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const responseData = JSON.parse(data);
      console.log('Total tours returned:', responseData.results);
      
      console.log('\nTours:');
      responseData.data.tours.forEach((tour, i) => {
        console.log(`${i+1}. ${tour.name} - Rating: ${tour.ratingsAverage}, Price: ${tour.price}`);
      });
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.end();

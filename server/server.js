
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Import route files
const hospitalRoutes = require('./routes/hospitalRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/v1', hospitalRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

// Basic API documentation route
app.get('/api/docs', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Hospital Management API Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
          h1 { color: #0284c7; }
          h2 { color: #0369a1; margin-top: 30px; }
          .endpoint { background: #f0f9ff; padding: 10px; border-radius: 5px; margin-bottom: 10px; }
          .method { font-weight: bold; color: #0ea5e9; }
          pre { background: #f1f5f9; padding: 10px; border-radius: 5px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>Hospital Management API Documentation</h1>
        
        <h2>Hospitals</h2>
        
        <div class="endpoint">
          <p><span class="method">GET</span> /api/v1/hospitals</p>
          <p>Get all hospitals</p>
        </div>
        
        <div class="endpoint">
          <p><span class="method">GET</span> /api/v1/hospitals/:id</p>
          <p>Get a specific hospital by ID</p>
        </div>
        
        <div class="endpoint">
          <p><span class="method">GET</span> /api/v1/hospitals?city=:city</p>
          <p>Get hospitals by city</p>
        </div>
        
        <div class="endpoint">
          <p><span class="method">POST</span> /api/v1/hospitals/create</p>
          <p>Create a new hospital</p>
          <pre>
{
  "name": "Hospital Name",
  "city": "City Name",
  "image": "Image URL",
  "specialty": ["Specialty1", "Specialty2"],
  "rating": 4.5
}
          </pre>
        </div>
        
        <div class="endpoint">
          <p><span class="method">PUT</span> /api/v1/hospitals/update?id=:id</p>
          <p>Update a hospital</p>
        </div>
        
        <div class="endpoint">
          <p><span class="method">DELETE</span> /api/v1/hospitals/delete?id=:id</p>
          <p>Delete a hospital</p>
        </div>
        
        <h2>Hospital Details</h2>
        
        <div class="endpoint">
          <p><span class="method">GET</span> /api/v1/hospitals/details/:id</p>
          <p>Get details for a specific hospital</p>
        </div>
        
        <div class="endpoint">
          <p><span class="method">POST</span> /api/v1/hospitals/details?id=:id</p>
          <p>Add details to a hospital</p>
          <pre>
{
  "description": "Hospital description",
  "images": ["Image URL 1", "Image URL 2"],
  "numberOfDoctors": 45,
  "numberOfDepartments": 12
}
          </pre>
        </div>
        
        <div class="endpoint">
          <p><span class="method">PUT</span> /api/v1/hospitals/details/update?id=:id</p>
          <p>Update details for a hospital</p>
        </div>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

connectDB();

app.use('/', routes);

app.get('/about', (req, res) => {
  res.status(200).json({
    name: 'Rohit Sinha',
    email: 'rohit@example.com',
    my_features: {
      'Advanced Search': 'Full-text search across note title and content using MongoDB text indexes.',
      'Tag Filtering': 'Filter notes by tags for better organization.',
      'Pagination': 'Paginate notes with page and limit query parameters.',
      'Pinned Notes': 'Pin important notes so they are easy to find.',
      'Archived Notes': 'Archive notes to keep workspace clean without deleting them.',
      'Share Notes': 'Share notes with other users by email.',
    },
  });
});

app.get('/openapi.json', (req, res) => {
  res.status(200).json({
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'A multi-user notes management REST API',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
    paths: {
      '/register': {
        post: {
          summary: 'Register a new user',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Bad request' },
          },
        },
      },
      '/login': {
        post: {
          summary: 'Login user',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Invalid email or password' },
          },
        },
      },
      '/notes': {
        get: {
          summary: 'Get all notes',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Notes retrieved successfully' },
            401: { description: 'Unauthorized' },
          },
        },
        post: {
          summary: 'Create a new note',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Note created successfully' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/notes/{id}': {
        get: {
          summary: 'Get note by ID',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Note retrieved successfully' },
            404: { description: 'Note not found' },
          },
        },
        put: {
          summary: 'Update a note',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Note updated successfully' },
            404: { description: 'Note not found' },
          },
        },
        delete: {
          summary: 'Delete a note',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            204: { description: 'Note deleted successfully' },
            404: { description: 'Note not found' },
          },
        },
      },
      '/notes/{id}/share': {
        post: {
          summary: 'Share a note with another user',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    share_with_email: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Note shared successfully' },
            404: { description: 'User not found' },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
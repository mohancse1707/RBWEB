import './swagger.css';
import React from 'react';

export const DocsPage = () => (
  <div>
    <iframe src='../swagger-ui/index.html' width='100%' height='800' title='Swagger UI' seamless style={{ border: 'none' }} />
  </div>
);

export default DocsPage;

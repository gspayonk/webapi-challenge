import React from 'react';

import ImportAction from './components/importActions';
import ImportProject from './components/importProjects'

export default () => (
  <>
    <h1>Projects:</h1>
    <ImportProject />
    <h1>Actions:</h1>
    <ImportAction />
    
  </>
);
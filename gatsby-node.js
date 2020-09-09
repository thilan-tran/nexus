const path = require('path');
const projectData = require('./src/data/projects.json');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  projectData.forEach(({ id }) => {
    createPage({
      path: `/${id}`,
      component: path.resolve('./src/pages/index.js'),
      context: {
        project: id
      }
    });
  });
};

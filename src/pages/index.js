import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import App from '../components/App';
import projectData from '../data/projects.json';

const author = 'Thilan Tran';
const title = 'Thilan Tran | Home and Portfolio';
const descr = 'The home and portfolio of software engineer Thilan Tran.';
const defaultImg =
  'https://user-images.githubusercontent.com/44995807/92079786-5ddde080-ed75-11ea-8575-8227312adf80.PNG';

const IndexPage = ({ pageContext, data }) => {
  const imgLink = pageContext.project
    ? projectData.find((proj) => proj.id === pageContext.project)
        .imagePreview || defaultImg
    : defaultImg;
  return (
    <>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title={title}
        meta={[
          {
            name: 'description',
            content: descr
          },
          {
            property: 'og:title',
            content: title
          },
          {
            property: 'og:image',
            content: imgLink
          },
          {
            property: 'og:description',
            content: descr
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:creator',
            content: author
          },
          {
            name: 'twitter:title',
            content: title
          },
          {
            name: 'twitter:description',
            content: descr
          },
          {
            name: 'twitter:image',
            content: imgLink
          }
        ]}
      />
      <App data={data} project={pageContext.project} />
    </>
  );
};

export const imageQuery = graphql`
  query {
    fbCover: file(relativePath: { eq: "facebook-ai-cover.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    wmlCover: file(relativePath: { eq: "wml-timeline.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    twainCover: file(relativePath: { eq: "twain.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    terreformCover: file(relativePath: { eq: "terreform-farm.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    restockCover: file(relativePath: { eq: "restock-portfolio.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    weatherCover: file(relativePath: { eq: "weather.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    coverPhoto: file(relativePath: { eq: "percussion-photo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fbModal: file(relativePath: { eq: "facebook-ai-diagram.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    wmlModal: file(relativePath: { eq: "wml-statetimeline.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    twainModal: file(relativePath: { eq: "twain-datetime.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    terreformModal: file(relativePath: { eq: "terreform-forest.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    restockModal: file(relativePath: { eq: "restock-stockview.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    weatherModal: file(relativePath: { eq: "weather-hover.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 2300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default IndexPage;

import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Content,
  ContentCard,
  FeatureImage,
  Pagination,
  Seo,
  Header,
  LandingSection,
} from "../components"
import { H1 } from "../elements"

const allPosts = ({ pageContext, data }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/#blog-section" : `/${currentPage - 1}/#blog-section`
  const nextPage = `/${currentPage + 1}/#blog-section`

  const posts = data.allMdx.edges

  return (
    <Container>
      <Seo />
      <FeatureImage />
      <Header>
          <H1>
              LIFE BEYOND OUR PLANET
          </H1>
      </Header>
      <LandingSection />
      <Content id="blog-section">
        {posts.map(post => (
          <ContentCard
            key={post.node.frontmatter.slug}
            date={post.node.frontmatter.date}
            title={post.node.frontmatter.title}
            excerpt={post.node.frontmatter.excerpt}
            slug={post.node.frontmatter.slug}
          />
        ))}
      </Content>

      <Pagination 
          isFirst={isFirst}
          isLast={isLast}
          prevPage={prevPage}
          nextPage={nextPage}
        />

    </Container>
  )
}

export default allPosts

export const pageQuery = graphql`
  query AllPostsQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            excerpt
          }
        }
      }
    }
  }
`

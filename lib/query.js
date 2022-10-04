export const PRODUCT_QUERY = `
query {
    products{
      data{
        attributes{
          name
          description
          price
          slug
          image{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`

export const PRODUCT_DETAILS_QUERY = `
query getProduct($slug: String!){
  products(filters : {slug : {eq: $slug}}){
    data{
      attributes{
        name
        description
        price
        slug
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}
`
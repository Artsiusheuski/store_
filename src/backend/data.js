import { gql } from "@apollo/client";

export const CATEGORY_NAMES = gql`
  {
    categories {
      name
    }
  }
`;

export const CURRENCY_DETIALS = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCT_ID = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          id
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          name
          type
          items {
            value
            id
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

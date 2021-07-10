const { gql, GraphQLClient } = require("graphql-request");

//ToDo: this endpoint has to be set in environment variable
const endpoint = "https://axieinfinity.com/graphql-server-v2/graphql";

const makeRequest = async () => {
  const graphQLClient = new GraphQLClient(endpoint);


  const query = gql`
 
    query GetRecentlyAxiesSold($from: Int, $size: Int) {
        settledAuctions {
          axies(from: $from, size: $size) {
            total
            results {
              ...AxieSettledBrief
              transferHistory {
                ...TransferHistoryInSettledAuction
              }
            }
          }
        }
      }
      fragment AxieSettledBrief on Axie {
        id
        name
        image
        class
        breedCount
      }
      fragment TransferHistoryInSettledAuction on TransferRecords {
        total
        results {
          ...TransferRecordInSettledAuction
        }
      }
      fragment TransferRecordInSettledAuction on TransferRecord {
        from
        to
        txHash
        timestamp
        withPrice
        withPriceUsd
        fromProfile {
          name
        }
        toProfile {
          name
        }
      }
        
 
`;

  const variables = {
    from: 1,
    size: 10,
  };

  const data = await graphQLClient.request(query, variables);
  console.log(JSON.stringify(data, undefined, 4));
};

makeRequest();

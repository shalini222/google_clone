import Head from "next/head";
import Header from "../components/Header";
// import { API_KEY, CONTEXT_KEY } from "../next.config";
import Response from "../Response";
import { useRouter } from "next/router";
import SearchResults from "../components/SearchResults";
function Search({ results }) {
  const router = useRouter();
  console.log(results);
  return (
    <div>
      <Head>
        <title>
          {router.query.term} - Google Search
          <link rel="icon" href="/favicon.ico" />
        </title>
      </Head>
      {/* header */}
      <Header />
      {/* search results */}
      <SearchResults results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || "0";
  const API_KEY = process.env.API_KEY;
  const CONTEXT_KEY = process.env.CONTEXT_KEY;
  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then((response) => response.json());

  return {
    props: {
      results: data,
    },
  };
}

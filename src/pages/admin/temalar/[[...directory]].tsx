export default function ActivityFinderPage() {
  return <h1>[[...directory]]</h1>;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

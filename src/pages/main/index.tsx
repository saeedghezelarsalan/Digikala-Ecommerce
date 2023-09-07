const index = () => {
  return <></>;
};

export default index;

export async function getServerSideProps({ params }) {
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
}

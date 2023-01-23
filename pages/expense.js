import HomeMain from "../components/home/HomeMain";

import { getSession } from "next-auth/react";

export default function Home({ username }) {
  return <HomeMain username={username} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { username: session.username },
  };
}

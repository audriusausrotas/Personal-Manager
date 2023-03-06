import PasswordMain from "../components/passswords/PasswordMain";

import { getSession } from "next-auth/react";

export default function Password({ username }) {
  return <PasswordMain username={username} />;
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

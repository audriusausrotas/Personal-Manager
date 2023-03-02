import NotesMain from "../components/notes/NotesMain";

import { getSession } from "next-auth/react";

export default function Notes({ username }) {
  return <NotesMain username={username} />;
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

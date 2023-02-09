import TodoMain from "../components/todo/TodoMain";
import { getSession } from "next-auth/react";

export default function Todo({ username }) {
  return <TodoMain username={username} />;
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

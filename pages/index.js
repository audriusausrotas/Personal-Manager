import LoginMain from "../components/login/LoginMain";
import { getSession } from "next-auth/react";

export default function Login() {
  return <LoginMain />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/expense",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

import { gql, useQuery } from "@apollo/client";
import { getAccessToken, getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"

interface HomeProps {
    token: any;
}

const PRODUCTS_QUERY = gql`
    query GetProducts {
        products {
            id
            title
        }
    }

`;

export default function Home({ token }: HomeProps) {
    const { user } = useUser()
    const {data, error} = useQuery(PRODUCTS_QUERY);

    return (
    <div>
        <h1>Hello World</h1>
        <pre>{JSON.stringify(data , null, 2)}</pre>
        <pre>
            {JSON.stringify(user, null, 2)}
        </pre>
        <pre>
            Token: {JSON.stringify(token.accessToken, null, 2)}
        </pre>
        <a href="/api/auth/logout">Logout</a>
    </div>


    )
}

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ req, res }) => {
        const token = await getAccessToken(req, res)
        return {
            props: {
                token
            }
        }
    }
});
// export const getServerSideProps: GetServerSideProps = async ({req, res }) => {
//     const session = getSession(req, res);
//     console.log(session);
//     if(!session) {
//         return {
//             redirect: {
//                 destination: '/api/auth/login',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {}
//     }

// }
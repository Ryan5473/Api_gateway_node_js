import { VERIFY_TOKEN_API } from '../config'

export default async function verifyToken(token) {
  const response = await fetch(VERIFY_TOKEN_API, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json())

  if (!response.success) {
    return { error: response }
  }

  return { user: response.data }
}

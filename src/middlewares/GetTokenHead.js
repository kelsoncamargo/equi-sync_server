const GET_TOKEN_HEAD = async (REQ) => {
  const AUTH_HEADER = await REQ.headers["authorization"]
  const TOKEN = AUTH_HEADER && AUTH_HEADER.split(" ")[1]
  
  return TOKEN
}

module.exports = GET_TOKEN_HEAD
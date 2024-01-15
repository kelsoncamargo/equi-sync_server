  /**
   * Extracts the @TOKEN from the request header
   * Uses a ternary operator to check wheter the information exists
   * Use the @split method and select the second element of this functions return, which is the @TOKEN itself
   * @param {Object} REQ - The request object.
   */
const GET_TOKEN_HEAD = async (REQ) => {
  const AUTH_HEADER = await REQ.headers["authorization"]
  const TOKEN = AUTH_HEADER && AUTH_HEADER.split(" ")[1]
  
  return TOKEN
}

module.exports = GET_TOKEN_HEAD
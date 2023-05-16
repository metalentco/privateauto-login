import type { NextApiRequest, NextApiResponse } from "next";
import { CognitoIdentityServiceProvider } from "aws-sdk";
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  region: "us-east-1",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method != "POST") {
      return res
        .status(400)
        .json({ success: false, error: "It should be POST method." });
    }
    const token = req.body.accessToken;
    try {
      const response = await cognitoIdentityServiceProvider
        .getUser({ AccessToken: token })
        .promise();
      res
        .status(200)
        .json({ success: true, data: response?.UserAttributes[4]?.Value });
    } catch (error: any) {
      console.error("Access token validation failed:", error);
      res.status(401).json({ success: false, data: error.message });
    }
  } catch (e: any) {
    res.status(400).json({ success: false, error: e.message });
  }
}

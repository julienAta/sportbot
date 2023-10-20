import { NextApiRequest, NextApiResponse } from "next";

function generateAnswer(sport: string): string {
  const randomFactor = Math.random() * 20;
  return `${sport} ${randomFactor.toFixed(2)}`;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sport } = req.query;

  if (typeof sport !== "string") {
    res.status(400).send("Invalid sport parameter");
    return;
  }

  const answer = generateAnswer(sport);
  res.status(200).json({ answer });
};

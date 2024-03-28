import { NextResponse } from "next/server";
import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

export async function GET(
  request: Request,
  { params }: { params: { checkoutId: string } }
) {
  const { checkoutId } = params;
  if (!checkoutId) {
    return new NextResponse("Checkout ID Not Provided", {
      status: 400,
      statusText: "Checkout ID Not Provided",
    });
  }

  const ddbParams = {
    TableName: "orbita-checkout-data",
    Key: {
      checkoutId: checkoutId,
    },
  };

  try {
    const { Item } = await dynamoDB.get(ddbParams).promise();
    if (Item) {
      return NextResponse.json(Item);
    } else {
      return new NextResponse("Checkout Data Not Found", {
        status: 404,
        statusText: "Checkout Data Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving checkout data", {
      status: 500,
      statusText: "Error retrieving checkout data",
    });
  }
}

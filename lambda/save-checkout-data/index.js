import AWS from "aws-sdk";
const { DynamoDB } = AWS;

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  const requestBody = JSON.parse(event.body);
  const { paymentId, checkoutId, items, currency } = requestBody;

  console.log("Request body: ", requestBody);

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: null,
    };
  }

  // Validation checks
  if (!paymentId || typeof paymentId !== "number") {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify({
        message: "paymentId is required and must be a number.",
      }),
    };
  }

  if (!checkoutId || typeof checkoutId !== "string") {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify({
        message: "checkoutId is required and must be a string.",
      }),
    };
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify({
        message: "items is required and must be a non-empty array.",
      }),
    };
  }

  if (
    !currency ||
    typeof currency !== "string" ||
    !(
      currency.trim().toUpperCase() === "USD" ||
      currency.trim().toUpperCase() === "CAD" ||
      currency.trim().toUpperCase() === "BTC"
    )
  ) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify({
        message: "currency is required and must be a string.",
      }),
    };
  }

  const isValidItems = items.every(
    (item) =>
      typeof item.itemName === "string" &&
      item.itemName.trim() !== "" &&
      typeof item.itemPriceAmount === "string" &&
      item.itemPriceAmount.trim() !== "" &&
      typeof item.itemPriceCurrency === "string" &&
      item.itemPriceCurrency.trim() !== "" &&
      typeof item.itemQuantity === "number"
  );

  if (!isValidItems) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify({
        message:
          "Each item in items array must have a valid itemName, itemPriceAmount, itemPriceCurrency, and itemQuantity.",
      }),
    };
  }
  try {
    const totalAmount = items
      .reduce((total, item) => {
        return total + parseFloat(item.itemPriceAmount) * item.itemQuantity;
      }, 0)
      .toString();

    const params = {
      TableName: "orbita-checkout-data",
      Item: {
        checkoutId: checkoutId,
        paymentId: paymentId,
        items: items,
        totalAmountCurrency: currency,
        totalAmount: totalAmount,
      },
    };

    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify({ checkoutId: checkoutId }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify({ message: "Failed to save data" }),
    };
  }
}
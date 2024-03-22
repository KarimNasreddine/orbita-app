import AWS from "aws-sdk";
const { DynamoDB } = AWS;

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(event) {
  const requestBody = JSON.parse(event.body);
  const { paymentId, checkoutId, items, currency } = requestBody;

  console.log("Request body: ", requestBody);

  // Validation checks
  if (!paymentId || typeof paymentId !== "number") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "paymentId is required and must be a number.",
      }),
    };
  }

  if (!checkoutId || typeof checkoutId !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "checkoutId is required and must be a string.",
      }),
    };
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return {
      statusCode: 400,
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
      body: JSON.stringify({ message: "Data saved successfully!" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to save data" }),
    };
  }
}

//Example:

// const data = {
//     paymentId: 123,
//     checkoutId: 456,
//     items: [
//       {
//         itemName: "Item 1",
//         itemPriceAmount: "10.00",
//         itemPriceCurrency: "USD",
//         itemQuantity: 1
//       },
//       {
//         itemName: "Item 2",
//         itemPriceAmount: "15.00",
//         itemPriceCurrency: "USD",
//         itemQuantity: 2
//       }
//     ]
//   };

//   fetch('https://your-api-endpoint.com/checkout', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   .then(response => response.json())
//   .then(data => console.log('Success:', data))
//   .catch((error) => console.error('Error:', error));
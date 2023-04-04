import BookType from "@/types/types";

export const sendEmailOnRegister = async (email: string) => {
  const params = {
    recipientEmail: email,
  };

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/sendemailregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email. Server responded with ${response.status}.`);
    }

    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailOnPayment = async (email: string, books: BookType[]) => {
  let total = 0;
  books.map((book) => (total += book.price));

  const namesArray = books.map(obj => obj.name);

  const params = {
    recipientEmail: email,
    bookNames: namesArray,
    totalPrice: total,
  };

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/sendemailpayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email. Server responded with ${response.status}.`);
    }

    return response.status;
  } catch (error) {
    console.log(error);
  }
};


export const sendEmailOnForgotPassword = async (email: string) => {
  const params = {
    recipientEmail: email,
  };

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email. Server responded with ${response.status}.`);
    }

    return response.status;
  } catch (error) {
    console.log(error);
  }
};
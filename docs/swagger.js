import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SeekConnect APIs",
      version: "1.0.0",
      description: "SeekConnect",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          name: "authorization",
          in: "header",
          description:
            "JWT authorization token. To obtain a token, use the /auth/login endpoint.",
        },
      },
      schemas: {
        UserSignup: {
          type: "object",
          properties: {
            fullName: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
            confirmPassword: {
              type: "string",
            },
          },
          required: [
            "fullName",
            "email",
            "username",
            "password",
            "confirmPassword",
          ],
        },
        UserLogin: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
          },
          required: ["email", "password"],
        },
      },
    },
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

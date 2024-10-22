const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

exports.getSignUp = async (req, res) => {
  console.log(`getSignUp controller function called`);
  res.render("./views/pages/signUp", { title: "Sign Up" });
};

exports.postSignUp = async (req, res) => {
  console.log(`postSignUp controller function called`);

  const prismaOperation = async () => {
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        is_admin: false,
      },
    });
  };

  prismaOperation()
    .catch((e) => {
      console.error(e.message);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  // 1. Need password encryption
  // 2. Need error handling if passwords don't match

  res.redirect("/");
};

exports.getLogIn = async (req, res) => {
  console.log(`getLogIn controller function called`);
  res.render("./views/pages/logIn", { title: "Log In" });
};